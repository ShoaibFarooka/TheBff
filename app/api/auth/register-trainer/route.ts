import Trainer from "@/models/trainer";
import AWS from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve) => {
    const res = {
      json: (data: any) => {
        resolve(NextResponse.json(data, { status: 200 }));
      },
      status: (statusCode: any) => {
        return {
          json: (data: any) => {
            resolve(NextResponse.json(data, { status: statusCode }));
          },
        };
      },
    }

    const formData = await (req as any).formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const mobileNumber = formData.get('mobileNumber');
    const currentAddress = formData.get('currentAddress');
    const parsedCurrentAddress = JSON.parse(currentAddress);
    const permanentAddress = formData.get('permanentAddress');
    const parsedPermanentAddress = JSON.parse(permanentAddress);
    const availableTimeSlots = formData.get('availableTimeSlots');
    const parsedAvailableTimeSlots = JSON.parse(availableTimeSlots);
    const aadharFile = formData.get('aadharFile');
    const agreementFile = formData.get('agreementFile');
    const certificationFiles = formData.getAll('certificationFiles');
    const profilePhotoFile = formData.get('profilePhotoFile');
    const verificationFile = formData.get('verificationFile') || null;

    console.log('Name: ', name, typeof name);
    console.log('Email: ', email, typeof email);
    console.log('Password: ', password, typeof password);
    console.log('Mobile Number: ', mobileNumber, typeof mobileNumber);
    console.log('Current Address: ', currentAddress, typeof currentAddress);
    console.log('Permanent Address: ', permanentAddress, typeof permanentAddress);
    console.log('Available Time Slots: ', availableTimeSlots, typeof availableTimeSlots);
    console.log('Parsed Available Time Slots: ', parsedAvailableTimeSlots, typeof parsedAvailableTimeSlots);
    console.log('Aadhar File: ', aadharFile, typeof aadharFile);
    console.log('Agreement File: ', agreementFile, typeof agreementFile);
    console.log('Certification Files: ', certificationFiles, typeof certificationFiles);
    console.log('Profile Photo File: ', profilePhotoFile, typeof profilePhotoFile);
    console.log('Verification File: ', verificationFile, typeof verificationFile);

    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      res.status(403).json({ error: `Trainer already exist with this email!` });
      return;
    }

    const folderName = `${name}-${email}`;

    let aadharBuffer = Buffer.from(await aadharFile.arrayBuffer());
    let agreementBuffer = Buffer.from(await agreementFile.arrayBuffer());
    let profilePhotoBuffer = Buffer.from(await profilePhotoFile.arrayBuffer());
    let verificationBuffer = verificationFile ? Buffer.from(await verificationFile.arrayBuffer()) : null;

    const aadharParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `${folderName}/${Date.now()}_${aadharFile.name}`, // Unique file name
      Body: aadharBuffer,
      ContentType: aadharFile.type || 'application/octet-stream',
    };
    const agreementParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `${folderName}/${Date.now()}_${agreementFile.name}`, // Unique file name
      Body: agreementBuffer,
      ContentType: agreementFile.type || 'application/octet-stream',
    };
    const profilePhotoParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `${folderName}/${Date.now()}_${profilePhotoFile.name}`, // Unique file name
      Body: profilePhotoBuffer,
      ContentType: profilePhotoFile.type || 'application/octet-stream',
    };

    let verificationParams;
    if (verificationFile) {
      verificationParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `${folderName}/${Date.now()}_${verificationFile.name}`, // Unique file name
        Body: verificationBuffer,
        ContentType: verificationFile.type || 'application/octet-stream',
      };
    }

    try {
      console.log('Started Uploading...');
      const startTime = performance.now();
      const uploadPromises = [
        (await s3.upload(aadharParams).promise()).Location,
        (await s3.upload(agreementParams).promise()).Location,
        (await s3.upload(profilePhotoParams).promise()).Location,
      ];

      const certificationUploadPromises = certificationFiles.map(async (file: File) => {
        const certificationParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME as string,
          Key: `${folderName}/${Date.now()}_${file.name}`,
          Body: Buffer.from(await file.arrayBuffer()),
          ContentType: file.type || 'application/octet-stream',
        };
        const uploadResult = (await s3.upload(certificationParams).promise());
        return uploadResult.Location;
      });

      uploadPromises.push(...certificationUploadPromises);

      if (verificationFile) {
        uploadPromises.push((await s3.upload(verificationParams as any).promise()).Location);
      }

      const results = await Promise.all(uploadPromises);
      const [aadharFileURL, agreementFileURL, profilePhotoFileURL] = results;

      let verificationFileURL = null;
      let certificationFileURLs = [];

      certificationFileURLs = results.slice(3, results.length - (verificationFile ? 1 : 0));

      if (verificationFile) {
        verificationFileURL = await uploadPromises[uploadPromises.length - 1];
      }
      const endTime = performance.now();
      console.log('Performance Time For Upload(s): ', (endTime - startTime) / 1000);
      console.log(aadharFileURL);
      console.log(agreementFileURL);
      console.log(profilePhotoFileURL);
      console.log(verificationFileURL);
      console.log(certificationFileURLs);

      const trainer = await Trainer.create({
        name,
        email,
        password,
        mobileNumber,
        permanentAddress: parsedPermanentAddress,
        currentAddress: parsedCurrentAddress,
        availableTimeSlots: parsedAvailableTimeSlots,
        aadharFileUrl: aadharFileURL,
        agreementFileUrl: agreementFileURL,
        certificationFileUrls: certificationFileURLs,
        profilePhotoFileUrl: profilePhotoFileURL,
        verificationFileUrl: verificationFileURL
      })

      res.json({ message: 'Trainer registered successfully!' });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).json({ error: `Unable to register trainer!` });
    }
  });
};

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
