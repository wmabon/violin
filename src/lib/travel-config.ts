// Travel configuration and home base management for dual-city operations

export interface HomeBase {
  id: string;
  name: string;
  city: string;
  state: string;
  airport: string;
  airportName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TravelConfig {
  homeBases: HomeBase[];
  currentBaseId: string;
  preferences: TravelPreferences;
  pricingTiers: PricingTier[];
}

export interface TravelPreferences {
  preferredAirlines: string[];
  preferredHotelChains: string[];
  minHotelRating: number; // 1-5 stars or 1-10 score
  maxHotelDistance: number; // miles from venue
  mileageRate: number; // IRS rate per mile
  bufferPercentage: number; // Price buffer for volatility
  requireNonStop: boolean;
  seatPreference: "window" | "aisle" | "no_preference";
}

export interface PricingTier {
  tier: 1 | 2 | 3;
  name: string;
  cities: string[];
  avgHotelRate: { min: number; max: number };
  parkingEstimate: number;
}

// Default home bases configuration
export const HOME_BASES: HomeBase[] = [
  {
    id: "nashville",
    name: "Nashville",
    city: "Nashville",
    state: "TN",
    airport: "BNA",
    airportName: "Nashville International Airport",
    coordinates: { lat: 36.1627, lng: -86.7816 },
  },
  {
    id: "baltimore",
    name: "Baltimore",
    city: "Baltimore",
    state: "MD",
    airport: "BWI",
    airportName: "Baltimore/Washington International",
    coordinates: { lat: 39.2904, lng: -76.6122 },
  },
];

// Default travel preferences
export const DEFAULT_PREFERENCES: TravelPreferences = {
  preferredAirlines: [],
  preferredHotelChains: [],
  minHotelRating: 3, // 3-star minimum
  maxHotelDistance: 5, // 5 miles from venue
  mileageRate: 0.67, // 2024 IRS rate
  bufferPercentage: 0.15, // 15% buffer on estimates
  requireNonStop: true,
  seatPreference: "aisle",
};

// City pricing tiers for hotel estimates
export const PRICING_TIERS: PricingTier[] = [
  {
    tier: 1,
    name: "Major Metro",
    cities: [
      "New York",
      "San Francisco",
      "Los Angeles",
      "Boston",
      "Washington",
      "Chicago",
      "Seattle",
      "Miami",
    ],
    avgHotelRate: { min: 250, max: 350 },
    parkingEstimate: 50,
  },
  {
    tier: 2,
    name: "Secondary Market",
    cities: [
      "Denver",
      "Atlanta",
      "Dallas",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Diego",
      "Austin",
      "Portland",
      "Nashville",
      "Baltimore",
      "Charlotte",
      "Minneapolis",
      "Detroit",
      "Orlando",
    ],
    avgHotelRate: { min: 150, max: 220 },
    parkingEstimate: 35,
  },
  {
    tier: 3,
    name: "Smaller Market",
    cities: [], // Default for all other cities
    avgHotelRate: { min: 110, max: 160 },
    parkingEstimate: 25,
  },
];

// Travel method determination based on distance
export type TravelMethod = "ground" | "ground_or_flight" | "flight_required";

export interface TravelMethodResult {
  method: TravelMethod;
  distanceMiles: number;
  estimatedDriveTime: number; // minutes
  requiresOvernight: boolean;
  recommendedDepartureTime?: string;
}

export function determineTravelMethod(distanceMiles: number): TravelMethodResult {
  if (distanceMiles <= 75) {
    return {
      method: "ground",
      distanceMiles,
      estimatedDriveTime: Math.round(distanceMiles * 1.5), // ~40mph average
      requiresOvernight: false,
    };
  } else if (distanceMiles <= 200) {
    return {
      method: "ground_or_flight",
      distanceMiles,
      estimatedDriveTime: Math.round(distanceMiles * 1.3), // ~46mph average
      requiresOvernight: distanceMiles > 150,
    };
  } else {
    return {
      method: "flight_required",
      distanceMiles,
      estimatedDriveTime: Math.round(distanceMiles * 1.2),
      requiresOvernight: true,
    };
  }
}

// Get pricing tier for a city
export function getCityPricingTier(city: string): PricingTier {
  for (const tier of PRICING_TIERS) {
    if (tier.cities.some((c) => city.toLowerCase().includes(c.toLowerCase()))) {
      return tier;
    }
  }
  // Default to tier 3 for unknown cities
  return PRICING_TIERS[2];
}

// Calculate mileage cost
export function calculateMileageCost(
  distanceMiles: number,
  mileageRate: number = DEFAULT_PREFERENCES.mileageRate
): number {
  return Math.round(distanceMiles * mileageRate * 100) / 100;
}

// Seasonal multipliers
export function getSeasonalMultiplier(date: Date): number {
  const month = date.getMonth();
  const day = date.getDate();

  // Holiday periods
  // New Year's (Dec 28 - Jan 2)
  if ((month === 11 && day >= 28) || (month === 0 && day <= 2)) return 1.5;
  // Valentine's Day (Feb 12-15)
  if (month === 1 && day >= 12 && day <= 15) return 1.25;
  // Memorial Day weekend (late May)
  if (month === 4 && day >= 25) return 1.25;
  // July 4th (July 1-5)
  if (month === 6 && day >= 1 && day <= 5) return 1.3;
  // Labor Day weekend (early September)
  if (month === 8 && day <= 7) return 1.25;
  // Thanksgiving (Nov 20-30)
  if (month === 10 && day >= 20) return 1.4;
  // Christmas (Dec 15-27)
  if (month === 11 && day >= 15 && day <= 27) return 1.5;

  // Peak wedding season (May-October)
  if (month >= 4 && month <= 9) return 1.1;

  return 1.0;
}

// Check if booking is last-minute (< 2 weeks)
export function isLastMinuteBooking(eventDate: Date): boolean {
  const today = new Date();
  const daysUntilEvent = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilEvent < 14;
}

// Get last-minute premium multiplier
export function getLastMinutePremium(eventDate: Date): number {
  const today = new Date();
  const daysUntilEvent = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilEvent < 7) return 1.3; // 30% premium for < 1 week
  if (daysUntilEvent < 14) return 1.2; // 20% premium for < 2 weeks
  return 1.0;
}
