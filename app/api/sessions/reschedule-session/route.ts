import { Plan, Trainer, User } from "@/models"; // Import relevant models
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const { trainerId, userId, subscriptionId, sessionNumber, newTimeSlot, newDate } = await req.json();

    // Validate required parameters
    if (!trainerId || !userId || !subscriptionId || !sessionNumber || !newTimeSlot || !newDate) {
      return NextResponse.json(
        { success: false, message: "All parameters (trainerId, userId, subscriptionId, sessionNumber, newTimeSlot, newDate) are required" },
        { status: 400 }
      );
    }

    // Ensure the parameters are treated as ObjectId
    const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const subscriptionObjectId = new mongoose.Types.ObjectId(subscriptionId);

    // Find the session to update
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

    // Check if newDate is before session.endDate
    if (session.endDate && new Date(newDate) > new Date(session.endDate)) {
      return NextResponse.json(
        { success: false, message: "New date cannot be after the session's end date" },
        { status: 400 }
      );
    }

    // Traverse the sessions array and find the session with the matching sessionNumber
    const sessionIndex = session.sessions.findIndex((s: any) => s.sessionNumber === sessionNumber);

    if (sessionIndex === -1) {
      return NextResponse.json(
        { success: false, message: `Session with sessionNumber ${sessionNumber} not found` },
        { status: 404 }
      );
    }

    // Update the old session's status to "rescheduled"
    session.sessions[sessionIndex].can_be_completed = false;
    session.sessions[sessionIndex].status = "rescheduled";

    if(sessionIndex + 1 < session?.sessions?.length){
      session.sessions[sessionIndex + 1].can_be_completed = true;
    }

    // Create new session entry with updated details
    const newSession = {
      ...session.sessions[sessionIndex],
      can_be_completed: false,
      timeSlot: newTimeSlot,
      date: `${new Date(newDate)}` ,
      status: "pending", // Set the status of the new session
    };

    // Push the new session into the array
    session.sessions.push(newSession);

    // Sort the sessions based on date and time
    session.sessions.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;
    
      // Extract start time from timeSlot
      const extractTime = (timeSlot: string) => {
        const [startTime] = timeSlot.split("-"); // Get only the start time
        const [hours, minutes] = startTime.split(":").map(Number);
        return hours * 60 + minutes; // Convert to total minutes for easier comparison
      };
    
      return extractTime(a.timeSlot) - extractTime(b.timeSlot);
    });

    session.markModified("sessions");

    // Save the updated session document (parent session)
    await session.save();

    const trainer = await Trainer.findById(trainerId).select(
      "name email contactNumber currentAddress"
    ); // Specify fields you want to include
    if (trainer) {
      session.set("trainerDetails", trainer); // Add trainer details to the session
    }

    const plan = await Plan.findById(session?.planId).select(
      "name programId"
    );

    // Respond with a success message
    return NextResponse.json({ success: true, message: "Session rescheduled successfully!", data: session?.sessions, session: session, trainerDetails: trainer, plan });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Something went wrong while rescheduling the session",
      },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";