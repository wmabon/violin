import { NextRequest, NextResponse } from "next/server";
import {
  LEARNING_PLANS,
  RECORDING_CLUB_PLANS,
  ANNIVERSARY_PLANS,
  HOLD_MUSIC_PLANS,
} from "@/lib/subscriptions";

// GET /api/shop/subscriptions - Get all subscription plans
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let plans;
  switch (type) {
    case "learning":
      plans = LEARNING_PLANS;
      break;
    case "recording_club":
      plans = RECORDING_CLUB_PLANS;
      break;
    case "anniversary":
      plans = ANNIVERSARY_PLANS;
      break;
    case "hold_music":
      plans = HOLD_MUSIC_PLANS;
      break;
    default:
      plans = {
        learning: LEARNING_PLANS,
        recording_club: RECORDING_CLUB_PLANS,
        anniversary: ANNIVERSARY_PLANS,
        hold_music: HOLD_MUSIC_PLANS,
      };
  }

  return NextResponse.json({ success: true, plans });
}

// POST /api/shop/subscriptions - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      planId,
      email,
      name,
      phone,
      billingCycle,
      companyName,
      weddingDate,
      partnerName,
      songTitle,
    } = body;

    // Validate required fields
    if (!planId || !email || !name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the plan
    const allPlans = [
      ...LEARNING_PLANS,
      ...RECORDING_CLUB_PLANS,
      ...ANNIVERSARY_PLANS,
      ...HOLD_MUSIC_PLANS,
    ];
    const plan = allPlans.find((p) => p.id === planId);

    if (!plan) {
      return NextResponse.json(
        { success: false, error: "Plan not found" },
        { status: 404 }
      );
    }

    // Calculate price based on billing cycle
    const isAnnual = billingCycle === "annual";
    const price = isAnnual && plan.annualPrice ? plan.annualPrice : plan.price;

    // In a real implementation, this would:
    // 1. Create a Stripe customer
    // 2. Create a Stripe subscription
    // 3. Save to database
    // For now, we'll return a mock response

    const subscription = {
      id: `sub_${Date.now()}`,
      planId,
      planName: plan.name,
      planType: plan.type,
      email,
      name,
      phone,
      companyName,
      billingCycle: isAnnual ? "annual" : "monthly",
      price,
      status: "pending_payment",
      // Anniversary-specific fields
      weddingDate,
      partnerName,
      songTitle,
      createdAt: new Date().toISOString(),
    };

    // Return checkout URL for Stripe
    return NextResponse.json({
      success: true,
      subscription,
      checkoutUrl: `/checkout/subscription?id=${subscription.id}`,
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
