import { NextRequest, NextResponse } from 'next/server';

const { google } = require('googleapis');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

const KEY_PATH = path.join(__dirname, '../meet.json');

const calendar = google.calendar('v3');

const authenticateWithServiceAccount = async () => {
    const auth = new GoogleAuth({
        keyFile: KEY_PATH, // Path to the service account JSON file
        scopes: ['https://www.googleapis.com/auth/calendar'], // Scopes for Calendar API
    });

    // Authorize and get the OAuth2 client
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    return authClient;
};

const createCalendarEvent = async (sessionTime: any, userEmail: any, trainerEmail: any) => {
    try {
        const authClient = await authenticateWithServiceAccount();

        const event = {
            summary: 'Training Session',
            location: 'Online',
            description: 'Training session with trainer',
            start: {
                dateTime: sessionTime.toISOString(),
                timeZone: 'UTC',
            },
            end: {
                dateTime: new Date(sessionTime.getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: 'UTC',
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 10 },
                ],
            },
            conferenceData: {
                createRequest: {
                    requestId: `session-${Date.now()}`,
                },
            },
        };

        const calendarResponse = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all',
            conferenceDataVersion: 1,
        });

        const calendarEventId = calendarResponse.data.id;
        const meetLink = calendarResponse.data.conferenceData?.entryPoints?.find(
            (entry: any) => entry.entryPointType === 'video'
        )?.uri;

        return { eventId: calendarEventId, meetLink };
    } catch (error) {
        console.error('Error creating Google Calendar event:', error);
        return null;
    }
};

export const POST = async (req: NextRequest) => {
  try {
      const body = await req.json();
      const { numberOfSessions, sessions, userEmail, trainerEmail, isOnline } = body;

      if (!numberOfSessions || !sessions || !userEmail || !trainerEmail) {
          return NextResponse.json(
              { success: false, message: 'Missing required fields.' },
              { status: 400 }
          );
      }

      const events: { eventId: string; meetLink: string | null }[] = [];

      for (const session of sessions) {
          // Parse session date and time
          const sessionDate = new Date(session.date); // Parse the ISO 8601 date string
          if (isNaN(sessionDate.getTime())) {
              return NextResponse.json(
                  { success: false, message: 'Invalid date format in session.' },
                  { status: 400 }
              );
          }

          // Parse timeSlot
          const [startHour, startMinute] = session.timeSlot.split('-')[0].split(':').map(Number);
          const [endHour, endMinute] = session.timeSlot.split('-')[1].split(':').map(Number);

          const sessionStart = new Date(sessionDate);
          sessionStart.setHours(startHour, startMinute, 0, 0); // Set start time

          const sessionEnd = new Date(sessionDate);
          sessionEnd.setHours(endHour, endMinute, 0, 0); // Set end time

          // Validate the times
          if (isNaN(sessionStart.getTime()) || isNaN(sessionEnd.getTime())) {
              return NextResponse.json(
                  { success: false, message: 'Invalid time format in session.' },
                  { status: 400 }
              );
          }

          // Create event for the session
          const result = await createCalendarEvent(sessionStart, userEmail, trainerEmail);
          if (result) {
              events.push({
                  eventId: result.eventId,
                  meetLink: isOnline ? result.meetLink : null, // Include meetLink only if isOnline is true
              });
          }
      }

      return NextResponse.json({
          success: true,
          message: 'Events created successfully',
          data: events,
      });
  } catch (error: any) {
      console.error('Error creating calendar events:', error.message);
      return NextResponse.json(
          { success: false, message: 'Internal server error', error: error.message },
          { status: 500 }
      );
  }
};
;

