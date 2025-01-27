import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session"; // Ensure this is the correct path to your model
import { Subscription } from "@/models"; // Adjust the import for your Subscription model
import { SubscriptionStatus } from "@/types/subscription";

export const POST = async (req: NextRequest) => {
  try {
    // Extract the data from the body of the request
    const { record, trainerId } = await req.json();

    // Validate if necessary fields are present
    if (!record || !trainerId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the session document based on the session ID (or another unique identifier from the record)
    const session = await Session.findById(record._id);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 404 }
      );
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
    subscription.status = SubscriptionStatus.active;
    await subscription.save();

    // Update the session by setting trainerAssigned to true and adding trainerId
    session.trainerAssigned = true;
    session.trainerId = trainerId;

    // Save the updated session document
    await session.save();

    // Respond with success and the updated session data
    return NextResponse.json({
      success: true,
      message: "Session updated successfully",
      data: session,
    });
  } catch (error: any) {
    // Handle errors and respond with an error message
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
