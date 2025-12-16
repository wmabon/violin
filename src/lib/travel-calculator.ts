// Intelligent Travel Cost Calculator
// Handles flight, hotel, and ground transportation cost estimation

import {
  HOME_BASES,
  DEFAULT_PREFERENCES,
  determineTravelMethod,
  getCityPricingTier,
  calculateMileageCost,
  getSeasonalMultiplier,
  getLastMinutePremium,
  type HomeBase,
  type TravelMethodResult,
} from "./travel-config";

export interface VenueLocation {
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TravelCostBreakdown {
  // Summary
  totalTravelCost: number;
  recommendedOrigin: HomeBase;
  alternativeOrigin?: HomeBase;
  alternativeOriginSavings?: number;

  // Flight costs
  flightRequired: boolean;
  flightCost: number;
  flightDetails?: {
    origin: string;
    destination: string;
    estimatedPrice: number;
    priceRange: { min: number; max: number };
    nonStopAvailable: boolean;
    alternativeOriginPrice?: number;
  };

  // Hotel costs
  hotelRequired: boolean;
  hotelCost: number;
  hotelDetails?: {
    nights: number;
    avgNightlyRate: number;
    checkIn: string;
    checkOut: string;
    pricingTier: string;
  };

  // Ground transportation
  groundTransportCost: number;
  groundDetails?: {
    type: "mileage" | "rideshare" | "rental";
    distanceMiles: number;
    mileageCost?: number;
    airportTransferCost?: number;
    parkingCost?: number;
  };

  // Per diem
  perDiemCost: number;
  perDiemDetails?: {
    days: number;
    dailyRate: number;
  };

  // Adjustments
  seasonalMultiplier: number;
  lastMinutePremium: number;
  bufferAmount: number;

  // Travel logistics
  travelMethod: TravelMethodResult;
  departureDate: Date;
  returnDate: Date;
  preEventBuffer: number; // hours
  postEventBuffer: number; // hours
}

export interface TravelQuoteRequest {
  venueLocation: VenueLocation;
  eventDate: Date;
  eventStartTime: string; // HH:MM format
  eventEndTime: string;
  eventDuration: number; // minutes
  currentHomeBase?: string; // Override predicted home base
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimate coordinates from city/state (simplified - in production use geocoding API)
function estimateCoordinates(city: string, state: string): { lat: number; lng: number } {
  // Major city coordinates lookup (simplified)
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    // Tier 1 cities
    "new york_ny": { lat: 40.7128, lng: -74.006 },
    "los angeles_ca": { lat: 34.0522, lng: -118.2437 },
    "chicago_il": { lat: 41.8781, lng: -87.6298 },
    "san francisco_ca": { lat: 37.7749, lng: -122.4194 },
    "boston_ma": { lat: 42.3601, lng: -71.0589 },
    "washington_dc": { lat: 38.9072, lng: -77.0369 },
    "seattle_wa": { lat: 47.6062, lng: -122.3321 },
    "miami_fl": { lat: 25.7617, lng: -80.1918 },
    // Tier 2 cities
    "denver_co": { lat: 39.7392, lng: -104.9903 },
    "atlanta_ga": { lat: 33.749, lng: -84.388 },
    "dallas_tx": { lat: 32.7767, lng: -96.797 },
    "houston_tx": { lat: 29.7604, lng: -95.3698 },
    "phoenix_az": { lat: 33.4484, lng: -112.074 },
    "philadelphia_pa": { lat: 39.9526, lng: -75.1652 },
    "austin_tx": { lat: 30.2672, lng: -97.7431 },
    "nashville_tn": { lat: 36.1627, lng: -86.7816 },
    "baltimore_md": { lat: 39.2904, lng: -76.6122 },
    "charlotte_nc": { lat: 35.2271, lng: -80.8431 },
    "minneapolis_mn": { lat: 44.9778, lng: -93.265 },
    "detroit_mi": { lat: 42.3314, lng: -83.0458 },
    "orlando_fl": { lat: 28.5383, lng: -81.3792 },
    "portland_or": { lat: 45.5152, lng: -122.6784 },
    // Additional cities
    "las vegas_nv": { lat: 36.1699, lng: -115.1398 },
    "new orleans_la": { lat: 29.9511, lng: -90.0715 },
    "san diego_ca": { lat: 32.7157, lng: -117.1611 },
    "indianapolis_in": { lat: 39.7684, lng: -86.1581 },
    "columbus_oh": { lat: 39.9612, lng: -82.9988 },
    "cleveland_oh": { lat: 41.4993, lng: -81.6944 },
    "pittsburgh_pa": { lat: 40.4406, lng: -79.9959 },
    "richmond_va": { lat: 37.5407, lng: -77.436 },
    "raleigh_nc": { lat: 35.7796, lng: -78.6382 },
    "memphis_tn": { lat: 35.1495, lng: -90.049 },
    "louisville_ky": { lat: 38.2527, lng: -85.7585 },
    "kansas city_mo": { lat: 39.0997, lng: -94.5786 },
    "st louis_mo": { lat: 38.627, lng: -90.1994 },
    "cincinnati_oh": { lat: 39.1031, lng: -84.512 },
  };

  const key = `${city.toLowerCase()}_${state.toLowerCase()}`;
  if (cityCoords[key]) {
    return cityCoords[key];
  }

  // State center coordinates as fallback
  const stateCoords: Record<string, { lat: number; lng: number }> = {
    al: { lat: 32.806671, lng: -86.79113 },
    az: { lat: 33.729759, lng: -111.431221 },
    ar: { lat: 34.969704, lng: -92.373123 },
    ca: { lat: 36.116203, lng: -119.681564 },
    co: { lat: 39.059811, lng: -105.311104 },
    ct: { lat: 41.597782, lng: -72.755371 },
    de: { lat: 39.318523, lng: -75.507141 },
    fl: { lat: 27.766279, lng: -81.686783 },
    ga: { lat: 33.040619, lng: -83.643074 },
    hi: { lat: 21.094318, lng: -157.498337 },
    id: { lat: 44.240459, lng: -114.478828 },
    il: { lat: 40.349457, lng: -88.986137 },
    in: { lat: 39.849426, lng: -86.258278 },
    ia: { lat: 42.011539, lng: -93.210526 },
    ks: { lat: 38.5266, lng: -96.726486 },
    ky: { lat: 37.66814, lng: -84.670067 },
    la: { lat: 31.169546, lng: -91.867805 },
    me: { lat: 44.693947, lng: -69.381927 },
    md: { lat: 39.063946, lng: -76.802101 },
    ma: { lat: 42.230171, lng: -71.530106 },
    mi: { lat: 43.326618, lng: -84.536095 },
    mn: { lat: 45.694454, lng: -93.900192 },
    ms: { lat: 32.741646, lng: -89.678696 },
    mo: { lat: 38.456085, lng: -92.288368 },
    mt: { lat: 46.921925, lng: -110.454353 },
    ne: { lat: 41.12537, lng: -98.268082 },
    nv: { lat: 38.313515, lng: -117.055374 },
    nh: { lat: 43.452492, lng: -71.563896 },
    nj: { lat: 40.298904, lng: -74.521011 },
    nm: { lat: 34.840515, lng: -106.248482 },
    ny: { lat: 42.165726, lng: -74.948051 },
    nc: { lat: 35.630066, lng: -79.806419 },
    nd: { lat: 47.528912, lng: -99.784012 },
    oh: { lat: 40.388783, lng: -82.764915 },
    ok: { lat: 35.565342, lng: -96.928917 },
    or: { lat: 44.572021, lng: -122.070938 },
    pa: { lat: 40.590752, lng: -77.209755 },
    ri: { lat: 41.680893, lng: -71.51178 },
    sc: { lat: 33.856892, lng: -80.945007 },
    sd: { lat: 44.299782, lng: -99.438828 },
    tn: { lat: 35.747845, lng: -86.692345 },
    tx: { lat: 31.054487, lng: -97.563461 },
    ut: { lat: 40.150032, lng: -111.862434 },
    vt: { lat: 44.045876, lng: -72.710686 },
    va: { lat: 37.769337, lng: -78.169968 },
    wa: { lat: 47.400902, lng: -121.490494 },
    wv: { lat: 38.491226, lng: -80.954453 },
    wi: { lat: 44.268543, lng: -89.616508 },
    wy: { lat: 42.755966, lng: -107.30249 },
    dc: { lat: 38.9072, lng: -77.0369 },
  };

  return stateCoords[state.toLowerCase()] || { lat: 39.8283, lng: -98.5795 }; // US center
}

// Find nearest airport to coordinates
function findNearestAirport(lat: number, lng: number): string {
  const airports: Record<string, { lat: number; lng: number; code: string }> = {
    // Major airports
    atlanta: { lat: 33.6407, lng: -84.4277, code: "ATL" },
    losangeles: { lat: 33.9425, lng: -118.408, code: "LAX" },
    chicago: { lat: 41.9742, lng: -87.9073, code: "ORD" },
    dallas: { lat: 32.8998, lng: -97.0403, code: "DFW" },
    denver: { lat: 39.8561, lng: -104.6737, code: "DEN" },
    newyork_jfk: { lat: 40.6413, lng: -73.7781, code: "JFK" },
    newyork_ewr: { lat: 40.6895, lng: -74.1745, code: "EWR" },
    sanfrancisco: { lat: 37.6213, lng: -122.379, code: "SFO" },
    seattle: { lat: 47.4502, lng: -122.3088, code: "SEA" },
    boston: { lat: 42.3656, lng: -71.0096, code: "BOS" },
    miami: { lat: 25.7959, lng: -80.287, code: "MIA" },
    phoenix: { lat: 33.4373, lng: -112.0078, code: "PHX" },
    houston: { lat: 29.9902, lng: -95.3368, code: "IAH" },
    nashville: { lat: 36.1263, lng: -86.6774, code: "BNA" },
    baltimore: { lat: 39.1774, lng: -76.6684, code: "BWI" },
    philadelphia: { lat: 39.8744, lng: -75.2424, code: "PHL" },
    charlotte: { lat: 35.214, lng: -80.9431, code: "CLT" },
    orlando: { lat: 28.4312, lng: -81.308, code: "MCO" },
    lasvegas: { lat: 36.086, lng: -115.1537, code: "LAS" },
    minneapolis: { lat: 44.8848, lng: -93.2223, code: "MSP" },
    detroit: { lat: 42.2162, lng: -83.3554, code: "DTW" },
  };

  let nearestAirport = "ATL";
  let minDistance = Infinity;

  for (const [, airport] of Object.entries(airports)) {
    const distance = calculateDistance(lat, lng, airport.lat, airport.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestAirport = airport.code;
    }
  }

  return nearestAirport;
}

// Estimate flight cost based on route and timing
function estimateFlightCost(
  origin: string,
  destination: string,
  eventDate: Date,
  isNonStop: boolean = true
): { estimatedPrice: number; priceRange: { min: number; max: number } } {
  // Base prices by route distance (simplified model)
  const baseRoutes: Record<string, number> = {
    // Short haul (< 500 miles)
    short: 250,
    // Medium haul (500-1000 miles)
    medium: 350,
    // Long haul (1000-2000 miles)
    long: 450,
    // Cross-country (2000+ miles)
    crosscountry: 550,
  };

  // Rough distance categories (in production, use actual route data)
  const routeDistances: Record<string, string> = {
    "BNA-ATL": "short",
    "BNA-CLT": "short",
    "BNA-DTW": "medium",
    "BNA-ORD": "medium",
    "BNA-DFW": "medium",
    "BNA-DEN": "medium",
    "BNA-JFK": "medium",
    "BNA-EWR": "medium",
    "BNA-BOS": "long",
    "BNA-MIA": "medium",
    "BNA-LAX": "long",
    "BNA-SFO": "crosscountry",
    "BNA-SEA": "crosscountry",
    "BWI-ATL": "short",
    "BWI-CLT": "short",
    "BWI-DTW": "medium",
    "BWI-ORD": "medium",
    "BWI-DFW": "long",
    "BWI-DEN": "long",
    "BWI-JFK": "short",
    "BWI-BOS": "short",
    "BWI-MIA": "medium",
    "BWI-LAX": "crosscountry",
    "BWI-SFO": "crosscountry",
    "BWI-SEA": "crosscountry",
  };

  const routeKey = `${origin}-${destination}`;
  const reverseKey = `${destination}-${origin}`;
  const category = routeDistances[routeKey] || routeDistances[reverseKey] || "long";

  let basePrice = baseRoutes[category];

  // Apply seasonal multiplier
  const seasonalMultiplier = getSeasonalMultiplier(eventDate);
  basePrice *= seasonalMultiplier;

  // Apply booking window adjustment
  const daysUntil = Math.ceil(
    (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil < 7) basePrice *= 1.5; // Very last minute
  else if (daysUntil < 14) basePrice *= 1.3; // Last minute
  else if (daysUntil < 21) basePrice *= 1.15; // Short notice
  else if (daysUntil >= 21 && daysUntil <= 56) basePrice *= 1.0; // Sweet spot
  else if (daysUntil > 90) basePrice *= 1.1; // Too far out

  // Non-stop premium
  if (isNonStop) {
    basePrice *= 1.15;
  }

  const estimatedPrice = Math.round(basePrice);

  return {
    estimatedPrice,
    priceRange: {
      min: Math.round(estimatedPrice * 0.8),
      max: Math.round(estimatedPrice * 1.25),
    },
  };
}

// Estimate hotel cost
function estimateHotelCost(
  city: string,
  nights: number,
  eventDate: Date
): { totalCost: number; avgNightlyRate: number; pricingTier: string } {
  const tier = getCityPricingTier(city);
  const avgRate = (tier.avgHotelRate.min + tier.avgHotelRate.max) / 2;

  // Apply seasonal adjustment
  const seasonalMultiplier = getSeasonalMultiplier(eventDate);
  const adjustedRate = avgRate * seasonalMultiplier;

  // Add taxes and fees (estimated 18%)
  const rateWithTaxes = adjustedRate * 1.18;

  return {
    totalCost: Math.round(rateWithTaxes * nights),
    avgNightlyRate: Math.round(rateWithTaxes),
    pricingTier: tier.name,
  };
}

// Determine number of hotel nights needed
function calculateHotelNights(
  eventDate: Date,
  eventStartTime: string,
  eventEndTime: string,
  requiresFlight: boolean
): { nights: number; checkIn: string; checkOut: string } {
  const [startHour] = eventStartTime.split(":").map(Number);
  const [endHour] = eventEndTime.split(":").map(Number);

  let nights = 0;
  const checkInDate = new Date(eventDate);
  const checkOutDate = new Date(eventDate);

  if (requiresFlight) {
    // Early events (before 2pm) require arrival night before
    if (startHour < 14) {
      nights += 1;
      checkInDate.setDate(checkInDate.getDate() - 1);
    }

    // Night of event
    nights += 1;
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    // Late events (ending after 9pm) - might need morning after
    if (endHour >= 21) {
      // Already accounted for in night of event
    }
  }

  return {
    nights,
    checkIn: checkInDate.toISOString().split("T")[0],
    checkOut: checkOutDate.toISOString().split("T")[0],
  };
}

// Main function: Calculate complete travel costs
export function calculateTravelCosts(request: TravelQuoteRequest): TravelCostBreakdown {
  const { venueLocation, eventDate, eventStartTime, eventEndTime } = request;

  // Get venue coordinates
  const venueCoords = venueLocation.coordinates ||
    estimateCoordinates(venueLocation.city, venueLocation.state);

  // Calculate distances from both home bases
  const distanceFromNashville = calculateDistance(
    HOME_BASES[0].coordinates.lat,
    HOME_BASES[0].coordinates.lng,
    venueCoords.lat,
    venueCoords.lng
  );

  const distanceFromBaltimore = calculateDistance(
    HOME_BASES[1].coordinates.lat,
    HOME_BASES[1].coordinates.lng,
    venueCoords.lat,
    venueCoords.lng
  );

  // Determine travel method from each base
  const nashvilleTravelMethod = determineTravelMethod(distanceFromNashville);
  const baltimoreTravelMethod = determineTravelMethod(distanceFromBaltimore);

  // Find nearest airport to venue
  const destinationAirport = findNearestAirport(venueCoords.lat, venueCoords.lng);

  // Calculate costs from Nashville
  let nashvilleTotalCost = 0;
  let nashvilleFlightCost = 0;

  if (nashvilleTravelMethod.method === "flight_required" ||
      (nashvilleTravelMethod.method === "ground_or_flight" && distanceFromNashville > 150)) {
    const flightEstimate = estimateFlightCost("BNA", destinationAirport, eventDate);
    nashvilleFlightCost = flightEstimate.estimatedPrice;
    nashvilleTotalCost += nashvilleFlightCost;
  } else {
    nashvilleTotalCost += calculateMileageCost(distanceFromNashville * 2); // Round trip
  }

  // Calculate costs from Baltimore
  let baltimoreTotalCost = 0;
  let baltimoreFlightCost = 0;

  if (baltimoreTravelMethod.method === "flight_required" ||
      (baltimoreTravelMethod.method === "ground_or_flight" && distanceFromBaltimore > 150)) {
    const flightEstimate = estimateFlightCost("BWI", destinationAirport, eventDate);
    baltimoreFlightCost = flightEstimate.estimatedPrice;
    baltimoreTotalCost += baltimoreFlightCost;
  } else {
    baltimoreTotalCost += calculateMileageCost(distanceFromBaltimore * 2); // Round trip
  }

  // Determine optimal origin
  const useNashville = request.currentHomeBase === "nashville" ||
    (request.currentHomeBase !== "baltimore" && nashvilleTotalCost <= baltimoreTotalCost);

  const recommendedOrigin = useNashville ? HOME_BASES[0] : HOME_BASES[1];
  const alternativeOrigin = useNashville ? HOME_BASES[1] : HOME_BASES[0];
  const selectedDistance = useNashville ? distanceFromNashville : distanceFromBaltimore;
  const travelMethod = useNashville ? nashvilleTravelMethod : baltimoreTravelMethod;

  const flightRequired = travelMethod.method === "flight_required" ||
    (travelMethod.method === "ground_or_flight" && selectedDistance > 150);

  // Calculate flight details
  let flightCost = 0;
  let flightDetails;

  if (flightRequired) {
    const flightEstimate = estimateFlightCost(
      recommendedOrigin.airport,
      destinationAirport,
      eventDate
    );
    flightCost = flightEstimate.estimatedPrice;

    const altFlightEstimate = estimateFlightCost(
      alternativeOrigin.airport,
      destinationAirport,
      eventDate
    );

    flightDetails = {
      origin: recommendedOrigin.airport,
      destination: destinationAirport,
      estimatedPrice: flightEstimate.estimatedPrice,
      priceRange: flightEstimate.priceRange,
      nonStopAvailable: true, // Simplified - would check API
      alternativeOriginPrice: altFlightEstimate.estimatedPrice,
    };
  }

  // Calculate hotel costs
  const hotelNights = calculateHotelNights(
    eventDate,
    eventStartTime,
    eventEndTime,
    flightRequired
  );

  let hotelCost = 0;
  let hotelDetails;

  if (hotelNights.nights > 0) {
    const hotelEstimate = estimateHotelCost(
      venueLocation.city,
      hotelNights.nights,
      eventDate
    );
    hotelCost = hotelEstimate.totalCost;
    hotelDetails = {
      nights: hotelNights.nights,
      avgNightlyRate: hotelEstimate.avgNightlyRate,
      checkIn: hotelNights.checkIn,
      checkOut: hotelNights.checkOut,
      pricingTier: hotelEstimate.pricingTier,
    };
  }

  // Calculate ground transportation
  let groundTransportCost = 0;
  const pricingTier = getCityPricingTier(venueLocation.city);

  const groundDetails: TravelCostBreakdown["groundDetails"] = {
    type: flightRequired ? "rideshare" : "mileage",
    distanceMiles: selectedDistance,
  };

  if (flightRequired) {
    // Airport transfers (estimated $50 each way in ride share)
    groundDetails.airportTransferCost = 100;
    groundDetails.parkingCost = 0;
    groundTransportCost = 100;
  } else {
    // Mileage for driving
    groundDetails.mileageCost = calculateMileageCost(selectedDistance * 2);
    groundDetails.parkingCost = pricingTier.parkingEstimate;
    groundTransportCost = groundDetails.mileageCost + groundDetails.parkingCost;
  }

  // Calculate per diem (meals)
  let perDiemCost = 0;
  let perDiemDetails;

  if (hotelNights.nights > 0) {
    const perDiemRate = 75; // $75/day for meals
    const days = hotelNights.nights + 1; // Travel days
    perDiemCost = perDiemRate * days;
    perDiemDetails = {
      days,
      dailyRate: perDiemRate,
    };
  }

  // Calculate multipliers
  const seasonalMultiplier = getSeasonalMultiplier(eventDate);
  const lastMinutePremium = getLastMinutePremium(eventDate);

  // Calculate subtotal and buffer
  const subtotal = flightCost + hotelCost + groundTransportCost + perDiemCost;
  const bufferAmount = Math.round(subtotal * DEFAULT_PREFERENCES.bufferPercentage);

  // Total travel cost
  const totalTravelCost = subtotal + bufferAmount;

  // Calculate travel time buffers
  let preEventBuffer = 2; // Default 2 hours
  let postEventBuffer = 2;

  if (flightRequired) {
    preEventBuffer = selectedDistance > 500 ? 24 : 5; // Full day for cross-country, 5 hours for regional
    postEventBuffer = 12; // Morning after for return
  } else if (selectedDistance > 50) {
    preEventBuffer = Math.ceil(selectedDistance / 40) + 1; // Drive time + 1 hour buffer
    postEventBuffer = preEventBuffer;
  }

  // Departure and return dates
  const departureDate = new Date(eventDate);
  if (preEventBuffer >= 24) {
    departureDate.setDate(departureDate.getDate() - 1);
  }

  const returnDate = new Date(eventDate);
  if (postEventBuffer >= 12) {
    returnDate.setDate(returnDate.getDate() + 1);
  }

  return {
    totalTravelCost,
    recommendedOrigin,
    alternativeOrigin,
    alternativeOriginSavings: Math.abs(nashvilleTotalCost - baltimoreTotalCost),
    flightRequired,
    flightCost,
    flightDetails,
    hotelRequired: hotelNights.nights > 0,
    hotelCost,
    hotelDetails,
    groundTransportCost,
    groundDetails,
    perDiemCost,
    perDiemDetails,
    seasonalMultiplier,
    lastMinutePremium,
    bufferAmount,
    travelMethod,
    departureDate,
    returnDate,
    preEventBuffer,
    postEventBuffer,
  };
}

// Generate client-facing quote with travel costs
export function generateTravelQuote(
  basePerformanceFee: number,
  travelCosts: TravelCostBreakdown
): {
  performanceFee: number;
  travelAccommodation: number;
  total: number;
  breakdown: {
    label: string;
    amount: number;
  }[];
} {
  const breakdown = [
    { label: "Performance Fee", amount: basePerformanceFee },
  ];

  if (travelCosts.flightCost > 0) {
    breakdown.push({ label: "Airfare", amount: travelCosts.flightCost });
  }

  if (travelCosts.hotelCost > 0) {
    breakdown.push({
      label: `Accommodation (${travelCosts.hotelDetails?.nights} night${travelCosts.hotelDetails?.nights !== 1 ? "s" : ""})`,
      amount: travelCosts.hotelCost,
    });
  }

  if (travelCosts.groundTransportCost > 0) {
    breakdown.push({ label: "Ground Transportation", amount: travelCosts.groundTransportCost });
  }

  if (travelCosts.perDiemCost > 0) {
    breakdown.push({ label: "Travel Per Diem", amount: travelCosts.perDiemCost });
  }

  if (travelCosts.bufferAmount > 0) {
    breakdown.push({ label: "Travel Contingency", amount: travelCosts.bufferAmount });
  }

  return {
    performanceFee: basePerformanceFee,
    travelAccommodation: travelCosts.totalTravelCost,
    total: basePerformanceFee + travelCosts.totalTravelCost,
    breakdown,
  };
}
