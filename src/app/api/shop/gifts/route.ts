import { NextRequest, NextResponse } from "next/server";
import {
  CUSTOM_ARRANGEMENT_PRODUCTS,
  DEDICATION_VIDEO_PRODUCTS,
  VIRTUAL_SERENADE_PRODUCTS,
  CONCERT_BOX_PRODUCTS,
  generateOrderNumber,
  getDueDate,
  GiftProduct,
} from "@/lib/subscriptions";

// GET /api/shop/gifts - Get all gift products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let products: GiftProduct[];
  switch (type) {
    case "custom_arrangement":
      products = CUSTOM_ARRANGEMENT_PRODUCTS;
      break;
    case "dedication_video":
      products = DEDICATION_VIDEO_PRODUCTS;
      break;
    case "virtual_serenade":
      products = VIRTUAL_SERENADE_PRODUCTS;
      break;
    case "concert_box":
      products = CONCERT_BOX_PRODUCTS;
      break;
    default:
      products = [
        ...CUSTOM_ARRANGEMENT_PRODUCTS,
        ...DEDICATION_VIDEO_PRODUCTS,
        ...VIRTUAL_SERENADE_PRODUCTS,
        ...CONCERT_BOX_PRODUCTS,
      ];
  }

  return NextResponse.json({
    success: true,
    products,
    categories: [
      {
        id: "custom_arrangement",
        name: "Custom Arrangements",
        description: "Personalized arrangements of any song",
        products: CUSTOM_ARRANGEMENT_PRODUCTS,
      },
      {
        id: "dedication_video",
        name: "Dedication Videos",
        description: "Short personalized video performances",
        products: DEDICATION_VIDEO_PRODUCTS,
      },
      {
        id: "virtual_serenade",
        name: "Virtual Serenades",
        description: "Live private performances via video call",
        products: VIRTUAL_SERENADE_PRODUCTS,
      },
      {
        id: "concert_box",
        name: "Concert in a Box",
        description: "At-home concert experience packages",
        products: CONCERT_BOX_PRODUCTS,
      },
    ],
  });
}

// POST /api/shop/gifts - Create a new gift order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      customerEmail,
      customerName,
      customerPhone,
      recipientName,
      recipientEmail,
      recipientPhone,
      occasion,
      dedicationMessage,
      songRequest,
      songArtist,
      additionalNotes,
      scheduledDate,
      scheduledTime,
      timezone,
      isRush,
    } = body;

    // Validate required fields
    if (!productId || !customerEmail || !customerName || !recipientName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the product
    const allProducts = [
      ...CUSTOM_ARRANGEMENT_PRODUCTS,
      ...DEDICATION_VIDEO_PRODUCTS,
      ...VIRTUAL_SERENADE_PRODUCTS,
      ...CONCERT_BOX_PRODUCTS,
    ];
    const product = allProducts.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Calculate pricing
    const basePrice = product.price;
    const rushFee = isRush && product.rushPrice ? product.rushPrice : 0;
    const totalPrice = basePrice + rushFee;

    // Calculate due date
    const dueDate = getDueDate(
      product.deliveryDays,
      isRush,
      product.rushDeliveryDays
    );

    // Create order
    const order = {
      id: `order_${Date.now()}`,
      orderNumber: generateOrderNumber(),
      productId,
      productName: product.name,
      productType: product.type,
      customerEmail,
      customerName,
      customerPhone,
      recipientName,
      recipientEmail,
      recipientPhone,
      occasion,
      dedicationMessage,
      songRequest,
      songArtist,
      additionalNotes,
      scheduledDate,
      scheduledTime,
      timezone,
      basePrice,
      rushFee,
      totalPrice,
      isRush,
      dueDate: dueDate.toISOString(),
      status: "pending_payment",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order,
      checkoutUrl: `/checkout/gift?orderId=${order.id}`,
    });
  } catch (error) {
    console.error("Gift order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
