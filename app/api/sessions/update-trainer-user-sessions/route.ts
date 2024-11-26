import { Plan, User } from "@/models";
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get("trainerId");
    const userId = searchParams.get("userId");
    const subscriptionId = searchParams.get("subscriptionId");

    // Validate required parameters
    if (!trainerId || !userId || !subscriptionId) {
      return NextResponse.json(
        { success: false, message: "All parameters (trainerId, userId, subscriptionId) are required" },
        { status: 400 }
      );
    }

    // Ensure the parameters are treated as ObjectId
    const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const subscriptionObjectId = new mongoose.Types.ObjectId(subscriptionId);

    // Fetch the single session document
    const session = await Session.findOne({
      trainerId: trainerObjectId,
      userId: userObjectId,
      subscriptionId: subscriptionObjectId,
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 404 }
      );
    }

    // Iterate through the sessions array and perform the updates
    const sessionsArray = session.sessions; // Assuming `sessions` is the array within the document
    let updated = false;

    for (let i = 0; i < sessionsArray.length; i++) {
      if (sessionsArray[i].can_be_completed) {
        // Update the current session
        sessionsArray[i].can_be_completed = false;
        sessionsArray[i].status = "completed";
        updated = true;

        // If there's a next session, update its `can_be_completed`
        if (i + 1 < sessionsArray.length) {
          sessionsArray[i + 1].can_be_completed = true;
        } else {
          // If this is the last session, update the document's status
          session.status = "completed";
        }
        break;
      }
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "No session found with can_be_completed set to true" },
        { status: 400 }
      );
    }

    if (updated) {
      session.sessions = sessionsArray; // Assign the updated array back to the session
      session.markModified("sessions"); // Explicitly mark the field as modified

      console.log(session)
      
      try {
        await session.save(); // Save the changes to the database
        console.log("Session updated and saved successfully.");
      } catch (error) {
        console.error("Error saving session:", error);
        return NextResponse.json(
          { success: false, message: "Failed to save session updates" },
          { status: 500 }
        );
      }
    }
      

    // Save the updated document
    await session.save();

    return NextResponse.json({ success: true, message: "Session updated successfully", data: sessionsArray });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Something went wrong",
      },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
