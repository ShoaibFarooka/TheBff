"use server";

import { Coach, Session } from "@/models";
import { CoachType } from "@/models/coach";
import { authenticate } from "../auth";
import connectDB from "../dbConnection";

export const saveEventInDB = async (uri: string, coachEmail: string) => {
  try {
    const { user } = await authenticate();
    if (!user) {
      return { error: "User not found." };
    }

    await connectDB();
    const coach = (await Coach.findOne(
      { email: coachEmail },
      "-_id email calendlyToken"
    ).lean()) as CoachType;

    if (!coach) {
      return { error: "Coach not found." };
    }

    if (!coach.calendlyToken) {
      return { error: "The calendar token is missing." };
    }

    const response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${coach.calendlyToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.errors) {
      return { error: "Failed to fetch meeting details." };
    }

    const event = data.resource;

    await Session.create({
      userEmail: user.email,
      coachEmail: coach.email,
      startTime: event.start_time,
      endTime: event.end_time,
      meetLink: event.location.join_url,
    });

    return { event };
  } catch (error) {
    console.log(error);
    return { error: "Failed to save meeting details." };
  }
};