import { NextResponse } from "next/server";
import { calculateTravelCosts, generateTravelQuote } from "@/lib/travel-calculator";
import { HOME_BASES } from "@/lib/travel-config";
import { calculatePricing } from "@/lib/pricing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      venueAddress,
      venueCity,
      venueState,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventType,
      duration,
      currentHomeBase,
      addOns = [],
    } = body;

    // Validate required fields
    if (!venueCity || !venueState || !eventDate || !eventStartTime || !eventType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate travel costs
    const travelCosts = calculateTravelCosts({
      venueLocation: {
        address: venueAddress || "",
        city: venueCity,
        state: venueState,
      },
      eventDate: new Date(eventDate),
      eventStartTime,
      eventEndTime: eventEndTime || calculateEndTime(eventStartTime, duration || 120),
      eventDuration: duration || 120,
      currentHomeBase,
    });

    // Calculate base performance pricing
    const performancePricing = calculatePricing({
      eventType,
      duration: duration || 120,
      date: new Date(eventDate),
      addOns,
    });

    // Generate combined quote
    const quote = generateTravelQuote(performancePricing.total, travelCosts);

    // Return comprehensive quote data
    return NextResponse.json({
      success: true,
      quote: {
        performanceFee: quote.performanceFee,
        travelAccommodation: quote.travelAccommodation,
        total: quote.total,
        breakdown: quote.breakdown,
        deposit: Math.round(quote.total * 0.5), // 50% deposit
      },
      travel: {
        recommendedOrigin: {
          id: travelCosts.recommendedOrigin.id,
          name: travelCosts.recommendedOrigin.name,
          airport: travelCosts.recommendedOrigin.airport,
        },
        alternativeOrigin: travelCosts.alternativeOrigin
          ? {
              id: travelCosts.alternativeOrigin.id,
              name: travelCosts.alternativeOrigin.name,
              airport: travelCosts.alternativeOrigin.airport,
              savings: travelCosts.alternativeOriginSavings,
            }
          : null,
        method: travelCosts.travelMethod.method,
        distanceMiles: Math.round(travelCosts.travelMethod.distanceMiles),
        flightRequired: travelCosts.flightRequired,
        hotelRequired: travelCosts.hotelRequired,
        flightDetails: travelCosts.flightDetails,
        hotelDetails: travelCosts.hotelDetails,
        groundDetails: travelCosts.groundDetails,
        travelWindow: {
          departure: travelCosts.departureDate.toISOString(),
          return: travelCosts.returnDate.toISOString(),
          preEventBuffer: travelCosts.preEventBuffer,
          postEventBuffer: travelCosts.postEventBuffer,
        },
      },
      pricing: {
        seasonalMultiplier: travelCosts.seasonalMultiplier,
        lastMinutePremium: travelCosts.lastMinutePremium,
        bufferAmount: travelCosts.bufferAmount,
      },
    });
  } catch (error) {
    console.error("Travel quote error:", error);
    return NextResponse.json(
      { error: "Failed to calculate travel quote" },
      { status: 500 }
    );
  }
}

// Helper to calculate end time
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
}

// GET endpoint for quick estimates
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  if (!city || !state) {
    return NextResponse.json(
      { error: "City and state are required" },
      { status: 400 }
    );
  }

  // Quick distance estimate from both home bases
  const quickEstimate = calculateTravelCosts({
    venueLocation: {
      address: "",
      city,
      state,
    },
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days out
    eventStartTime: "16:00",
    eventEndTime: "19:00",
    eventDuration: 180,
  });

  return NextResponse.json({
    success: true,
    estimate: {
      method: quickEstimate.travelMethod.method,
      distanceMiles: Math.round(quickEstimate.travelMethod.distanceMiles),
      flightRequired: quickEstimate.flightRequired,
      estimatedTravelCost: quickEstimate.totalTravelCost,
      recommendedOrigin: quickEstimate.recommendedOrigin.name,
    },
  });
}
