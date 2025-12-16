import { NextResponse } from "next/server";
import {
  detectTravelClustering,
  type CalendarEvent,
} from "@/lib/calendar-intelligence";

// Mock upcoming events (in production, fetch from database)
const mockUpcomingEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Corporate Gala",
    startDate: new Date("2024-09-20T18:00:00"),
    endDate: new Date("2024-09-20T22:00:00"),
    allDay: false,
    category: "professional_booking",
    blockType: "hard",
    venueLocation: {
      address: "100 Peachtree St",
      city: "Atlanta",
      state: "GA",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "event-2",
    title: "Private Party",
    startDate: new Date("2024-09-22T14:00:00"),
    endDate: new Date("2024-09-22T17:00:00"),
    allDay: false,
    category: "professional_booking",
    blockType: "hard",
    venueLocation: {
      address: "250 Marietta St",
      city: "Atlanta",
      state: "GA",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "event-3",
    title: "Wedding Ceremony",
    startDate: new Date("2024-10-05T15:00:00"),
    endDate: new Date("2024-10-05T20:00:00"),
    allDay: false,
    category: "professional_booking",
    blockType: "hard",
    venueLocation: {
      address: "500 5th Ave",
      city: "New York",
      state: "NY",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET() {
  try {
    const opportunities = detectTravelClustering(mockUpcomingEvents);

    return NextResponse.json({
      success: true,
      opportunities: opportunities.map((opp) => ({
        events: opp.events.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.startDate.toISOString(),
          location: e.venueLocation
            ? `${e.venueLocation.city}, ${e.venueLocation.state}`
            : "Unknown",
        })),
        region: opp.region,
        dateRange: {
          start: opp.dateRange.start.toISOString(),
          end: opp.dateRange.end.toISOString(),
        },
        potentialSavings: opp.potentialSavings,
        recommendation: opp.recommendation,
      })),
    });
  } catch (error) {
    console.error("Clustering detection error:", error);
    return NextResponse.json(
      { error: "Failed to detect clustering opportunities" },
      { status: 500 }
    );
  }
}
