import { NextResponse } from 'next/server';
import multer from 'multer';
import AWS from 'aws-sdk';

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a middleware function for handling file uploads
const uploadMiddleware = upload.fields([
  { name: 'aadharFile', maxCount: 1 },
  { name: 'agreementFile', maxCount: 1 },
  { name: 'certificationFile', maxCount: 1 },
  { name: 'profilePhotoFile', maxCount: 1 },
]);
// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const POST = async (req: Request) => {
  return new Promise((resolve) => {
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
    };

    // Call the upload middleware
    uploadMiddleware(req as any, res as any, async (error) => {
      if (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ error: `File upload failed: ${error.message}` });
      }

      // Access the file from req.file
      const file = (req as any).file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Upload the file to S3
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `${Date.now()}_${file.originalname}`, // Unique file name
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      try {
        const s3Response = await s3.upload(params).promise();
        res.json({ message: 'File uploaded successfully!', s3Response });
      } catch (s3Error) {
        console.error("S3 Upload Error:", s3Error as Error);
        res.status(500).json({ error: `S3 upload failed: ${(s3Error as Error).message}` });
      }
    });
  });
};

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
