import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dayjs from "dayjs"; // Ensure you have dayjs installed
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import Trainer from "@/models/trainer"; // Import the Trainer model if available
import { Plan } from "@/models";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const {
      trainerId,
      userId,
      subscriptionId,
      sessionNumber,
      nextDay,
      date,
      currentSessionNumber,
    } = await req.json();

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

    // Ensure that the `sessions` array exists
    if (!Array.isArray(session.sessions)) {
      return NextResponse.json(
        { success: false, message: "Invalid session data structure" },
        { status: 500 }
      );
    }

    // Find the session to update by its sessionNumber
    const currentSession = session.sessions.find(
      (s: any) => s.sessionNumber === currentSessionNumber
    );

    if (!currentSession) {
      return NextResponse.json(
        { success: false, message: `Session with sessionNumber ${currentSessionNumber} not found` },
        { status: 404 }
      );
    }

    // Parse `date` (new session's date) and `endDate` for comparison
    // Parse `date` (new session's date) and `endDate` for comparison
    const newSessionDate = dayjs.utc(date).startOf("day");
    const sessionEndDate = session.endDate ? dayjs.utc(session.endDate).startOf("day") : null;

    // Update the current session's status to "cancelled"
    currentSession.status = "cancelled";

    if (currentSession.can_be_completed === true) {
      currentSession.can_be_completed = false;

      // Find the next session whose status is not "cancelled"
      const nextValidSession = session.sessions.find(
        (s: any) => s.status !== "cancelled" && s.sessionNumber > currentSessionNumber
      );

      if (nextValidSession) {
        nextValidSession.can_be_completed = true;
      }
    }

    // If new session date is **after** endDate, do NOT create a new session
    if (sessionEndDate && newSessionDate.isAfter(sessionEndDate)) {
      // session.set("sessions", session.sessions);
      session.markModified("sessions");
      await session.save(); // Save the cancellation of the current session

      return NextResponse.json(
        {
          success: true,
          message: "Current session cancelled. No new session created as the date exceeds endDate.",
          data: session.sessions,
          session: session,
        },
        { status: 200 }
      );
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

    // Add the new session
    session.sessions.push(newSession);
    session.set("sessions", session.sessions);

    // Fetch the trainer details and populate trainerId
    const trainer = await Trainer.findById(trainerId).select(
      "name email contactNumber currentAddress"
    ); // Specify fields you want to include
    if (trainer) {
      session.set("trainerDetails", trainer); // Add trainer details to the session
    }

    // Save the updated session document
    await session.save();

    const plan = await Plan.findById(session?.planId).select("name programId");

    // Respond with a success message and the updated sessions array
    return NextResponse.json({
      success: true,
      message: "Session added successfully and endDate remains unchanged.",
      data: session.sessions,
      session: session,
      trainerDetails: trainer, // Include trainer details in the response
      plan,
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
