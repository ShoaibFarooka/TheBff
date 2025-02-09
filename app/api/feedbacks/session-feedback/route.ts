
import { Session, User } from "@/models";
import Feedback from "@/models/feedback";
import AWS from 'aws-sdk';
import mongoose from "mongoose";
import { NextRequest, NextResponse } from 'next/server';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getFileExtension = (fileName: string): string => {
  const extension = fileName.split('.').pop();
  return extension || "";
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const formData = await (req as any).formData();

    const session = formData.get("session")
    const feedbackText = formData.get("feedback");
    const rating = formData.get("stars");
    const userId = formData.get("userId");
    const attachmentFile = formData.get("file") || null;

    let attachmentFileUrl = null;

    if (attachmentFile) {
      const attachmentBuffer = Buffer.from(await attachmentFile.arrayBuffer());
      const folderName = `feedback-attachments/${userId}`;
      const attachmentParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `${folderName}/${Date.now()}_Attachment.${getFileExtension(attachmentFile.name)}`,
        Body: attachmentBuffer,
        ContentType: attachmentFile.type || 'application/octet-stream',
      };

      console.log("Started Uploading Attachment...");
      const uploadResult = await s3.upload(attachmentParams).promise();
      attachmentFileUrl = uploadResult.Location;
      console.log("Attachment Uploaded to: ", attachmentFileUrl);
    }

    const sessionDoc = await Session.findById(session).populate({
      path: "userId",
      model: User,
      select: "name _id", // Select only the required fields
    });

    sessionDoc.feedback_submitted = true;
    await sessionDoc.save()

    const { name: userName, _id: _userId } = sessionDoc.userId;

    const userIdObj = new mongoose.Types.ObjectId(_userId as string);
    const feedback = await Feedback.create({
      sessionId: sessionDoc?.id,
      userId: userIdObj,
      name: userName,
      text: feedbackText,
      stars: rating,
      image: attachmentFileUrl,
      status: false
    });

    return new Response(JSON.stringify({ message: "Feedback submitted successfully!", feedback }), { status: 200 });
  } catch (error) {
    console.error("Feedback Submission Error: ", error);
    return new Response(JSON.stringify({ error: "Unable to submit feedback!" }), { status: 500 });
  }
};

