"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Hotel,
  Car,
  MapPin,
  ChevronDown,
  ChevronUp,
  Info,
  Loader2,
  Home,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TravelQuoteProps {
  venueCity: string;
  venueState: string;
  eventDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  eventType: string;
  duration: number;
  onQuoteCalculated?: (quote: TravelQuoteData) => void;
}

interface TravelQuoteData {
  performanceFee: number;
  travelAccommodation: number;
  total: number;
  deposit: number;
  breakdown: { label: string; amount: number }[];
  travel: {
    recommendedOrigin: { id: string; name: string; airport: string };
    alternativeOrigin?: { id: string; name: string; airport: string; savings: number };
    method: string;
    distanceMiles: number;
    flightRequired: boolean;
    hotelRequired: boolean;
    flightDetails?: {
      origin: string;
      destination: string;
      estimatedPrice: number;
      priceRange: { min: number; max: number };
    };
    hotelDetails?: {
      nights: number;
      avgNightlyRate: number;
      pricingTier: string;
    };
  };
}

export function TravelQuote({
  venueCity,
  venueState,
  eventDate,
  eventStartTime,
  eventEndTime,
  eventType,
  duration,
  onQuoteCalculated,
}: TravelQuoteProps) {
  const [quote, setQuote] = useState<TravelQuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    if (venueCity && venueState && eventDate && eventStartTime) {
      fetchQuote();
    }
  }, [venueCity, venueState, eventDate, eventStartTime, eventType, duration]);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/travel/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueCity,
          venueState,
          eventDate: eventDate.toISOString(),
          eventStartTime,
          eventEndTime,
          eventType,
          duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate quote");
      }

      const data = await response.json();

      if (data.success) {
        setQuote(data.quote);
        onQuoteCalculated?.(data.quote);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get quote");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card variant="bordered">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-amber-600 mr-2" />
          <span className="text-stone-600">Calculating travel costs...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="bordered" className="border-red-200">
        <CardContent className="p-6">
          <p className="text-red-600">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchQuote} className="mt-2">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!quote) {
    return null;
  }

  const { travel } = quote;

  return (
    <Card variant="bordered">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Your Quote</CardTitle>
          <Badge variant={travel.flightRequired ? "info" : "default"}>
            {travel.flightRequired ? (
              <>
                <Plane className="h-3 w-3 mr-1" />
                Flight Required
              </>
            ) : (
              <>
                <Car className="h-3 w-3 mr-1" />
                Local Event
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Origin Info */}
        <div className="bg-stone-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-amber-600" />
            <span className="text-stone-600">Traveling from</span>
            <span className="font-medium">{travel.recommendedOrigin.name}</span>
            <span className="text-stone-400">({travel.recommendedOrigin.airport})</span>
          </div>
          {travel.alternativeOrigin && travel.alternativeOrigin.savings > 50 && (
            <p className="text-xs text-green-600 mt-1 ml-6">
              Save {formatCurrency(travel.alternativeOrigin.savings)} from{" "}
              {travel.alternativeOrigin.name}
            </p>
          )}
        </div>

        {/* Distance Info */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-stone-400" />
          <span className="text-stone-600">
            {travel.distanceMiles} miles to {venueCity}, {venueState}
          </span>
        </div>

        {/* Main Pricing */}
        <div className="border-t border-b border-stone-200 py-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-stone-600">Performance Fee</span>
            <span className="font-semibold">{formatCurrency(quote.performanceFee)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-600">Travel & Accommodation</span>
            <span className="font-semibold">
              {formatCurrency(quote.travelAccommodation)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold text-stone-900">Total Investment</span>
          <span className="font-bold text-amber-700">
            {formatCurrency(quote.total)}
          </span>
        </div>

        {/* Deposit */}
        <div className="bg-amber-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-amber-800 font-medium">Deposit Due Today</span>
            <span className="text-xl font-bold text-amber-700">
              {formatCurrency(quote.deposit)}
            </span>
          </div>
          <p className="text-xs text-amber-600 mt-1">50% secures your date</p>
        </div>

        {/* Expandable Breakdown */}
        <div>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-800"
          >
            {showBreakdown ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {showBreakdown ? "Hide" : "Show"} detailed breakdown
          </button>

          {showBreakdown && (
            <div className="mt-3 space-y-3 text-sm">
              {quote.breakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-1 border-b border-stone-100 last:border-0"
                >
                  <span className="text-stone-600">{item.label}</span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
              ))}

              {/* Travel Details */}
              {travel.flightDetails && (
                <div className="bg-blue-50 rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Plane className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Flight Estimate</span>
                  </div>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>
                      Route: {travel.flightDetails.origin} →{" "}
                      {travel.flightDetails.destination}
                    </p>
                    <p>
                      Estimated: {formatCurrency(travel.flightDetails.estimatedPrice)}
                    </p>
                    <p>
                      Range: {formatCurrency(travel.flightDetails.priceRange.min)} -{" "}
                      {formatCurrency(travel.flightDetails.priceRange.max)}
                    </p>
                  </div>
                </div>
              )}

              {travel.hotelDetails && (
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Hotel className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800">
                      Hotel Estimate
                    </span>
                  </div>
                  <div className="text-xs text-purple-700 space-y-1">
                    <p>{travel.hotelDetails.nights} night(s)</p>
                    <p>
                      ~{formatCurrency(travel.hotelDetails.avgNightlyRate)}/night
                    </p>
                    <p>Market: {travel.hotelDetails.pricingTier}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 text-xs text-stone-500">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            Travel costs are estimates based on current market rates. Actual costs
            may vary. A 15% contingency buffer is included for price protection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
