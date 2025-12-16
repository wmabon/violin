// Dynamic pricing engine for violin booking platform

export interface PricingParams {
  eventType: string;
  duration: number; // in minutes
  date: Date;
  guestCount?: number;
  travelDistance?: number;
  addOns?: string[];
}

export interface PricingBreakdown {
  basePrice: number;
  durationMultiplier: number;
  durationPrice: number;
  peakDateSurcharge: number;
  travelFee: number;
  addOnsTotal: number;
  addOnDetails: { name: string; price: number }[];
  subtotal: number;
  depositAmount: number;
  depositPercent: number;
  total: number;
}

// Base prices by event type
const BASE_PRICES: Record<string, number> = {
  wedding: 2000,
  corporate: 1200,
  private: 800,
  virtual: 400,
};

// Price per additional hour beyond base duration
const HOURLY_RATES: Record<string, number> = {
  wedding: 500,
  corporate: 350,
  private: 250,
  virtual: 150,
};

// Base duration included in price (minutes)
const BASE_DURATIONS: Record<string, number> = {
  wedding: 120, // 2 hours
  corporate: 120, // 2 hours
  private: 60, // 1 hour
  virtual: 30, // 30 minutes
};

// Deposit percentages by event type
const DEPOSIT_PERCENTS: Record<string, number> = {
  wedding: 0.5, // 50%
  corporate: 0.5, // 50%
  private: 0.5, // 50%
  virtual: 1.0, // 100% upfront
};

// Available add-ons with prices
export const ADD_ONS: Record<string, { name: string; price: number; description: string }> = {
  custom_arrangement: {
    name: "Custom Song Arrangement",
    price: 150,
    description: "A special song arranged specifically for your event",
  },
  second_musician: {
    name: "Second Musician (Duo)",
    price: 800,
    description: "Add a cellist or pianist for a fuller sound",
  },
  string_quartet: {
    name: "Upgrade to String Quartet",
    price: 2500,
    description: "Full string quartet for maximum impact",
  },
  extended_cocktail: {
    name: "Extended Cocktail Hour",
    price: 300,
    description: "Additional hour of cocktail hour music",
  },
  ceremony_rehearsal: {
    name: "Ceremony Rehearsal Attendance",
    price: 200,
    description: "Attend rehearsal to ensure perfect timing",
  },
  wireless_amplification: {
    name: "Wireless Amplification",
    price: 150,
    description: "Professional wireless sound system for larger venues",
  },
  song_learning: {
    name: "Learn Special Request Song",
    price: 100,
    description: "Learn a specific song not in standard repertoire",
  },
  processional_recessional: {
    name: "Processional & Recessional Music",
    price: 250,
    description: "Special music for ceremony entrances and exits",
  },
};

// Peak dates get surcharges
function getPeakDateSurcharge(date: Date): number {
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  // Wedding peak season (May-October) - 15% surcharge
  if (month >= 4 && month <= 9) {
    // Saturday in peak season - additional 10%
    if (dayOfWeek === 6) return 0.25;
    return 0.15;
  }

  // Holiday surcharges
  // New Year's Eve/Day
  if ((month === 11 && day === 31) || (month === 0 && day === 1)) return 0.5;
  // Valentine's Day
  if (month === 1 && day === 14) return 0.25;
  // Christmas Eve/Christmas
  if (month === 11 && (day === 24 || day === 25)) return 0.5;

  // Weekend surcharge (Saturdays)
  if (dayOfWeek === 6) return 0.1;

  return 0;
}

function calculateTravelFee(distance?: number): number {
  if (!distance || distance <= 30) return 0;
  // $1.50 per mile over 30 miles
  return Math.round((distance - 30) * 1.5);
}

export function calculatePricing(params: PricingParams): PricingBreakdown {
  const { eventType, duration, date, travelDistance, addOns = [] } = params;

  // Base price
  const basePrice = BASE_PRICES[eventType] || BASE_PRICES.private;
  const baseDuration = BASE_DURATIONS[eventType] || 60;
  const hourlyRate = HOURLY_RATES[eventType] || 250;
  const depositPercent = DEPOSIT_PERCENTS[eventType] || 0.5;

  // Duration pricing
  let durationMultiplier = 1;
  let durationPrice = 0;

  if (duration > baseDuration) {
    const extraMinutes = duration - baseDuration;
    const extraHours = extraMinutes / 60;
    durationPrice = Math.round(extraHours * hourlyRate);
    durationMultiplier = duration / baseDuration;
  }

  // Peak date surcharge
  const peakMultiplier = getPeakDateSurcharge(date);
  const peakDateSurcharge = Math.round((basePrice + durationPrice) * peakMultiplier);

  // Travel fee
  const travelFee = calculateTravelFee(travelDistance);

  // Add-ons
  const addOnDetails: { name: string; price: number }[] = [];
  let addOnsTotal = 0;
  for (const addOnKey of addOns) {
    const addOn = ADD_ONS[addOnKey];
    if (addOn) {
      addOnDetails.push({ name: addOn.name, price: addOn.price });
      addOnsTotal += addOn.price;
    }
  }

  // Calculate totals
  const subtotal = basePrice + durationPrice + peakDateSurcharge + travelFee + addOnsTotal;
  const total = subtotal;
  const depositAmount = Math.round(total * depositPercent);

  return {
    basePrice,
    durationMultiplier,
    durationPrice,
    peakDateSurcharge,
    travelFee,
    addOnsTotal,
    addOnDetails,
    subtotal,
    depositAmount,
    depositPercent,
    total,
  };
}

// Generate instant quote for quick estimates
export function getInstantQuote(eventType: string): { min: number; max: number } {
  const base = BASE_PRICES[eventType] || BASE_PRICES.private;
  return {
    min: base,
    max: Math.round(base * 2.5), // Approximate max with add-ons and longer duration
  };
}
