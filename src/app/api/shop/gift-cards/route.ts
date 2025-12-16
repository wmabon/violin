import { NextRequest, NextResponse } from "next/server";
import {
  GIFT_CARD_OPTIONS,
  GIFT_CARD_AMOUNTS,
  generateGiftCardCode,
} from "@/lib/subscriptions";

// GET /api/shop/gift-cards - Get gift card options
export async function GET() {
  return NextResponse.json({
    success: true,
    options: GIFT_CARD_OPTIONS,
    amounts: GIFT_CARD_AMOUNTS,
    customRange: { min: 25, max: 5000 },
    features: [
      "Instant digital delivery",
      "Physical card option (+$15)",
      "No expiration date",
      "Transferable to anyone",
      "Redeemable for any service",
    ],
  });
}

// POST /api/shop/gift-cards - Purchase a gift card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      purchaserEmail,
      purchaserName,
      recipientEmail,
      recipientName,
      personalMessage,
      deliveryType,
      deliveryDate,
    } = body;

    // Validate required fields
    if (!amount || !purchaserEmail || !purchaserName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount < 25 || amount > 5000) {
      return NextResponse.json(
        { success: false, error: "Amount must be between $25 and $5,000" },
        { status: 400 }
      );
    }

    // Calculate total (add $15 for physical delivery)
    const isPhysical = deliveryType === "physical";
    const deliveryFee = isPhysical ? 15 : 0;
    const totalPrice = amount + deliveryFee;

    // Generate gift card code
    const code = generateGiftCardCode();

    // Create gift card
    const giftCard = {
      id: `gc_${Date.now()}`,
      code,
      amount,
      purchaserEmail,
      purchaserName,
      recipientEmail,
      recipientName,
      personalMessage,
      deliveryType: isPhysical ? "physical" : "digital",
      deliveryDate: deliveryDate || new Date().toISOString(),
      deliveryFee,
      totalPrice,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      giftCard,
      checkoutUrl: `/checkout/gift-card?id=${giftCard.id}`,
    });
  } catch (error) {
    console.error("Gift card purchase error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create gift card" },
      { status: 500 }
    );
  }
}

// POST /api/shop/gift-cards/redeem - Redeem a gift card
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, email, amount, orderType, orderId } = body;

    // Validate required fields
    if (!code || !email || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real implementation, this would:
    // 1. Look up the gift card by code
    // 2. Verify it has sufficient balance
    // 3. Deduct the amount
    // 4. Create a redemption record

    // Mock response
    const redemption = {
      id: `gcr_${Date.now()}`,
      giftCardCode: code,
      amount,
      orderType,
      orderId,
      redeemedBy: email,
      remainingBalance: 0, // Would be calculated from actual balance
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      redemption,
      message: `Successfully redeemed $${amount}`,
    });
  } catch (error) {
    console.error("Gift card redemption error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to redeem gift card" },
      { status: 500 }
    );
  }
}
