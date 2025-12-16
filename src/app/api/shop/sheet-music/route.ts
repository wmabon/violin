import { NextRequest, NextResponse } from "next/server";
import {
  SAMPLE_SHEET_MUSIC,
  SHEET_MUSIC_BUNDLES,
  SHEET_MUSIC_CATEGORIES,
} from "@/lib/subscriptions";

// GET /api/shop/sheet-music - Get sheet music catalog
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";

  let items = SAMPLE_SHEET_MUSIC;

  if (category) {
    items = items.filter((item) => item.category === category);
  }

  if (featured) {
    items = items.filter((item) => item.featured);
  }

  return NextResponse.json({
    success: true,
    items,
    bundles: SHEET_MUSIC_BUNDLES,
    categories: SHEET_MUSIC_CATEGORIES,
    stats: {
      totalItems: SAMPLE_SHEET_MUSIC.length,
      totalBundles: SHEET_MUSIC_BUNDLES.length,
    },
  });
}

// POST /api/shop/sheet-music - Purchase sheet music
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, bundleId, customerEmail, customerName } = body;

    // Validate required fields
    if (!customerEmail) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!items?.length && !bundleId) {
      return NextResponse.json(
        { success: false, error: "No items selected" },
        { status: 400 }
      );
    }

    let totalPrice = 0;
    const purchaseItems: Array<{ id: string; title: string; price: number }> = [];

    // Handle bundle purchase
    if (bundleId) {
      const bundle = SHEET_MUSIC_BUNDLES.find((b) => b.id === bundleId);
      if (!bundle) {
        return NextResponse.json(
          { success: false, error: "Bundle not found" },
          { status: 404 }
        );
      }
      totalPrice = bundle.price;
      purchaseItems.push({
        id: bundle.id,
        title: bundle.name,
        price: bundle.price,
      });
    }

    // Handle individual items
    if (items?.length) {
      for (const itemId of items) {
        const item = SAMPLE_SHEET_MUSIC.find((sm) => sm.id === itemId);
        if (item) {
          totalPrice += item.price;
          purchaseItems.push({
            id: item.id,
            title: item.title,
            price: item.price,
          });
        }
      }
    }

    // Create purchase record
    const purchase = {
      id: `smp_${Date.now()}`,
      customerEmail,
      customerName,
      items: purchaseItems,
      totalPrice,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      purchase,
      checkoutUrl: `/checkout/sheet-music?purchaseId=${purchase.id}`,
    });
  } catch (error) {
    console.error("Sheet music purchase error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}
