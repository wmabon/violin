import Stripe from "stripe";

// Initialize Stripe with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

// Create a checkout session for booking deposits
export async function createCheckoutSession({
  bookingId,
  amount,
  customerEmail,
  eventDescription,
  eventDate,
  successUrl,
  cancelUrl,
}: {
  bookingId: string;
  amount: number;
  customerEmail: string;
  eventDescription: string;
  eventDate: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Booking Deposit",
            description: `${eventDescription} - ${eventDate}`,
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId,
      paymentType: "deposit",
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

// Create a payment intent for balance payments
export async function createPaymentIntent({
  amount,
  bookingId,
  customerEmail,
}: {
  amount: number;
  bookingId: string;
  customerEmail: string;
}) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: "usd",
    receipt_email: customerEmail,
    metadata: {
      bookingId,
      paymentType: "balance",
    },
  });

  return paymentIntent;
}

// Retrieve a checkout session
export async function retrieveCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });
  return session;
}

// Construct webhook event
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET || ""
  );
}

// Format amount for display
export function formatStripeAmount(amount: number): string {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
