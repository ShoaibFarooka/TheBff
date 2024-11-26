import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const { trainerId, userId, subscriptionId, sessionNumber, nextDay, date, currentSessionNumber } = await req.json();

    // Validate required parameters
    if (!trainerId || !userId || !subscriptionId || !sessionNumber || !nextDay || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "All parameters (trainerId, userId, subscriptionId, sessionNumber, nextDay, date) are required",
        },
        { status: 400 }
      );
    }

    // Ensure the parameters are treated as ObjectId
    const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const subscriptionObjectId = new mongoose.Types.ObjectId(subscriptionId);

    // Find the session using trainerId, userId, and subscriptionId
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

    const existingSessions = session.sessions;

    // Ensure that the session exists before proceeding
    if (!Array.isArray(existingSessions)) {
      return NextResponse.json(
        { success: false, message: "Invalid session data structure" },
        { status: 500 }
      );
    }

    // Find the index of the current session
    const currentSessionIndex = existingSessions.findIndex(
      (s: any) => s.sessionNumber === currentSessionNumber
    );

    if (currentSessionIndex === -1) {
      return NextResponse.json(
        { success: false, message: `Session with sessionNumber ${currentSessionNumber} not found` },
        { status: 404 }
      );
    }

    // Update the current session's status to "cancelled"
    existingSessions[currentSessionIndex].status = "cancelled";

    if (existingSessions[currentSessionIndex].can_be_completed === true) {
      // Make the current session's `can_be_completed` false
      existingSessions[currentSessionIndex].can_be_completed = false;

      // Find the index of the next session
      const nextSessionIndex = existingSessions.findIndex(
        (s: any) => s.sessionNumber === currentSessionNumber + 1
      );

      if (nextSessionIndex !== -1) {
        // Make the next session's `can_be_completed` true
        existingSessions[nextSessionIndex].can_be_completed = true;
      }
    }

    // Create the new session object
    const newSession = {
      sessionNumber,
      day: nextDay,
      date: date,
      timeSlot: session.timeSlot, // Use the timeSlot from the existing session
      can_be_completed: false,
      status: "pending",
    };

    // Append the new session object to the `sessions` array
    existingSessions.push(newSession);

    // Mark the `sessions` array as modified
    session.markModified("sessions");

    // Save the updated session document
    await session.save();

    // Respond with a success message and the updated sessions array
    return NextResponse.json({
      success: true,
      message: "Session added successfully!",
      data: session.sessions,
    });

  } catch (error: any) {
    console.error("Error in addSession API:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Something went wrong while adding the session",
      },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
