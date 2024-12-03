import { Trainer, User } from "@/models";
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import Plan from "@/models/plan"; // Ensure you import Plan if needed
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Extract the trainer ID from the URL
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get("id");

    if (!trainerId) {
      return NextResponse.json(
        { success: false, message: "Trainer ID is required" },
        { status: 400 }
      );
    }

    // Fetch the trainer from the Trainer model
    const trainer = await Trainer.findById(trainerId).lean();
    if (!trainer) {
      return NextResponse.json(
        { success: false, message: "Trainer not found" },
        { status: 404 }
      );
    }

    // Get the trainer's address and available time slots
    let trainerAddressPincode: string | number = "";
    if (trainer.currentAddress && typeof trainer.currentAddress === "object") {
      const { pincode } = trainer.currentAddress as { pincode: string | number };
      trainerAddressPincode = pincode; // Store the pincode in the variable
    } else {
      console.error("Invalid or missing currentAddress.");
    }

    if (!trainerAddressPincode) {
      return NextResponse.json(
        { success: false, message: "Trainer address is missing" },
        { status: 400 }
      );
    }

    if (!Array.isArray(trainer.availableTimeSlots) || !trainer.availableTimeSlots.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Trainer has no available time slots.",
        },
        { status: 400 }
      );
    }

    // Fetch all sessions
    const sessions = await Session.find({}).populate({
      path: "planId",
      model: Plan,
      select: "name programId startDate endDate amount",
    })
      .populate({
        path: "userId",
        model: User,
        select: "name email address", // Ensure address is populated for comparison
      })
      .lean();

    // Filter sessions based on the following conditions:
    const filteredSessions = sessions.filter((session) => {
      const isTrainerAssigned = session.trainerAssigned;
      const sessionPincode = session.userId?.address?.pincode;
      const sessionTimeSlot = session.timeSlot; // Extract the time slot from the session

      // New condition: Check if trainerId is not in ignoredBy (if it exists)
      const isIgnoredByTrainer = Array.isArray(session.ignoredBy) && session.ignoredBy.includes(trainerId);

      if (sessionPincode !== trainerAddressPincode || isTrainerAssigned === true || isIgnoredByTrainer) {
        return false;
      }

      return trainer.availableTimeSlots.includes(sessionTimeSlot);
    });

    const scheduledSessions = sessions.filter(
      (session) => session.trainerAssigned === true && session.trainerId === trainerId
    );

    const nonOverlappingSessions = filteredSessions.filter(
      (filteredSession) =>
        !scheduledSessions.some(
          (scheduledSession) => scheduledSession.timeSlot === filteredSession.timeSlot
        )
    );

    // Respond with the filtered sessions
    return NextResponse.json({ success: true, data: nonOverlappingSessions });
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
