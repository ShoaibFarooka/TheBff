import { Plan, Subscription, User } from "@/models";
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { SubscriptionStatus } from "@/types/subscription";

export const GET = async (req: NextRequest) => {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get("trainerId");
    const userId = searchParams.get("userId");
    const _subscriptionId = searchParams.get("subscriptionId");

    // Validate required parameters
    if (!trainerId || !userId || !_subscriptionId) {
      return NextResponse.json(
        { success: false, message: "All parameters (trainerId, userId, subscriptionId) are required" },
        { status: 400 }
      );
    }

    // Ensure the parameters are treated as ObjectId
    const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const subscriptionObjectId = new mongoose.Types.ObjectId(_subscriptionId);

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

    // Check if all sessions are marked as completed
    const allCompleted = sessionsArray.every((s: any) => s.status === "completed");

    if (allCompleted) {
      session.status = "completed"; // Set status to "completed"
    }

    // Retrieve subscriptionId from the session
    const { subscriptionId } = session;

    if (!subscriptionId) {
      return NextResponse.json(
        { success: false, message: "Session does not have a subscriptionId" },
        { status: 400 }
      );
    }

    // Find the subscription using the subscriptionId
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return NextResponse.json(
        { success: false, message: "Subscription not found" },
        { status: 404 }
      );
    }

    // Update the subscription's status to "active"
    subscription.status = SubscriptionStatus.expired;
    await subscription.save();

    // Mark modified fields
    session.sessions = sessionsArray; // Assign the updated array back to the session
    session.markModified("sessions");
    session.markModified("status");

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
