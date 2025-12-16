import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { constructWebhookEvent } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { bookingId, paymentType } = session.metadata || {};

      console.log(`Payment completed for booking ${bookingId}, type: ${paymentType}`);

      // TODO: Update booking status in database
      // - Mark deposit as paid
      // - Send confirmation email
      // - Update calendar availability

      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { bookingId, paymentType } = paymentIntent.metadata || {};

      console.log(`Payment intent succeeded for booking ${bookingId}, type: ${paymentType}`);

      // TODO: Update payment record in database

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { bookingId } = paymentIntent.metadata || {};

      console.log(`Payment failed for booking ${bookingId}`);

      // TODO: Handle failed payment
      // - Send failure notification
      // - Update booking status

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
