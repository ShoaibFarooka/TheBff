import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dayjs from "dayjs"; // Ensure you have dayjs installed
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);


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

    // Use `.set()` to ensure Mongoose detects changes
    session.set("sessions", session.sessions);

    // Update the current session's status to "cancelled"
    currentSession.status = "cancelled";

    if (currentSession.can_be_completed === true) {
      // Make the current session's `can_be_completed` false
      currentSession.can_be_completed = false;

      // Find the next session whose status is not "cancelled"
      const nextValidSession = session.sessions.find(
        (s: any) => s.status !== "cancelled" && s.sessionNumber > currentSessionNumber
      );

      if (nextValidSession) {
        // Set `can_be_completed` for the next valid session
        nextValidSession.can_be_completed = true;
      }
    }

    // Calculate the endDate as the date of the last session in ISO format
    const lastSession = session.sessions[session.sessions.length - 1];
    
    if (lastSession && lastSession.date) {
      // Parse the last session date (DD-MM-YYYY) in UTC to avoid timezone issues
      const parsedDate = dayjs(lastSession.date, "DD-MM-YYYY").utc().startOf('day').add(1, "day");
      
      if (parsedDate.isValid()) {
        const endDate = parsedDate.toDate();
        session.endDate = endDate;
      } 
    }

    // Save the updated session document
    await session.save();

    // Respond with a success message and the updated sessions array
    return NextResponse.json({
      success: true,
      message: "Session added successfully and endDate updated!",
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
