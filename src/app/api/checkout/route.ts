import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { generateBookingNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventType,
      eventDate,
      packageName,
      amount,
      customerEmail,
      customerName,
    } = body;

    // Generate a booking ID
    const bookingId = generateBookingNumber();

    // Create event description
    const eventDescription = `${packageName} - ${eventType}`;

    // Create success and cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`;
    const cancelUrl = `${baseUrl}/booking?cancelled=true`;

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      bookingId,
      amount,
      customerEmail,
      eventDescription,
      eventDate,
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.url,
      bookingId,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
