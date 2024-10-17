import { NextResponse } from 'next/server';
import multer from 'multer';

// Configure multer to use memory storage
const storage = multer.memoryStorage();
console.log("storage", storage)
const upload = multer({ storage });
console.log("upload", upload)

// Create a middleware function for handling file uploads
const uploadMiddleware = upload.single('profilePicture'); // 'profilePicture' matches the name in the form data

export const POST = async (req: Request) => {
  // Access the file from req.file
  const formData = await req.formData()
  const file = formData.get("profilePicture"); // Get the file

  console.log("file", file)

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
    uploadMiddleware(req as any, res as any, (error) => {
      if (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ error: `File upload failed: ${error.message}` });
      }
      // For example, you can send it to a cloud storage service.

      res.json({ message: 'File uploaded successfully!' });
    });
  });
};

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
