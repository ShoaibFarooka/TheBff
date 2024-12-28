// pages/api/sessions/reschedule.ts

import { Plan, Trainer, User } from "@/models"; // Import relevant models
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const { trainerId, userId, subscriptionId, sessionNumber, newTimeSlot } = await req.json();

    // Validate required parameters
    if (!trainerId || !userId || !subscriptionId || !sessionNumber || !newTimeSlot) {
      return NextResponse.json(
        { success: false, message: "All parameters (trainerId, userId, subscriptionId, sessionNumber, newTimeSlot) are required" },
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

    // Traverse the sessions array and find the session with the matching sessionNumber
    const sessionToUpdate = session.sessions.find((s: any) => s.sessionNumber === sessionNumber);

    if (!sessionToUpdate) {
      return NextResponse.json(
        { success: false, message: `Session with sessionNumber ${sessionNumber} not found` },
        { status: 404 }
      );
    }

    // Ensure that the timeSlot is a valid string and is being set
    if (!newTimeSlot || typeof newTimeSlot !== 'string') {
      return NextResponse.json(
        { success: false, message: "Invalid timeSlot value provided" },
        { status: 400 }
      );
    }

    // Update the timeSlot of the found session
    sessionToUpdate.timeSlot = newTimeSlot;
    session.markModified("sessions")

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
