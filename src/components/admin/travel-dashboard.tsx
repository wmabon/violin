"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Plane,
  Hotel,
  Car,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Navigation,
  Home,
  RefreshCw,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { HOME_BASES } from "@/lib/travel-config";
import { cn } from "@/lib/utils";

// Mock travel data
const upcomingTrips = [
  {
    id: "trip-1",
    eventTitle: "Thompson Wedding",
    eventDate: new Date("2024-09-15"),
    venue: "The Grand Ballroom",
    city: "Atlanta",
    state: "GA",
    origin: "Nashville",
    travelMethod: "flight",
    departure: new Date("2024-09-15T08:00:00"),
    return: new Date("2024-09-16T10:00:00"),
    flightDetails: {
      outbound: { flight: "WN 1234", time: "8:00 AM", airport: "BNA → ATL" },
      return: { flight: "WN 5678", time: "10:00 AM", airport: "ATL → BNA" },
    },
    hotelDetails: {
      name: "Marriott Atlanta Downtown",
      checkIn: "2024-09-15",
      checkOut: "2024-09-16",
      confirmation: "MR12345678",
    },
    estimatedCost: 650,
    actualCost: null,
    status: "upcoming",
  },
  {
    id: "trip-2",
    eventTitle: "Corporate Gala",
    eventDate: new Date("2024-09-22"),
    venue: "Tech Conference Center",
    city: "Charlotte",
    state: "NC",
    origin: "Nashville",
    travelMethod: "ground",
    departure: new Date("2024-09-22T10:00:00"),
    return: new Date("2024-09-22T23:00:00"),
    groundDetails: {
      distance: 340,
      driveTime: "5h 15m",
    },
    estimatedCost: 280,
    actualCost: null,
    status: "upcoming",
  },
];

const clusteringOpportunities = [
  {
    id: "cluster-1",
    events: [
      { title: "Private Event", date: "Sep 20", city: "Atlanta" },
      { title: "Anniversary Party", date: "Sep 22", city: "Atlanta" },
    ],
    potentialSavings: 450,
    recommendation: "Stay in Atlanta between events instead of returning home",
  },
];

const travelStats = {
  monthlyTravelSpend: 2450,
  avgTravelPerEvent: 380,
  flightBookings: 5,
  hotelNights: 8,
  totalMiles: 12500,
  costVsEstimate: -120, // Under budget
};

export function TravelDashboard() {
  const [currentBase, setCurrentBase] = useState("nashville");
  const [viewMode, setViewMode] = useState<"upcoming" | "history" | "analytics">("upcoming");

  return (
    <div className="space-y-6">
      {/* Header with Home Base Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Travel Management
          </h2>
          <p className="text-stone-600">
            Manage travel logistics, track costs, and optimize routes
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
            {HOME_BASES.map((base) => (
              <button
                key={base.id}
                onClick={() => setCurrentBase(base.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                  currentBase === base.id
                    ? "bg-white shadow text-amber-700"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                <Home className="h-4 w-4" />
                {base.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Monthly Travel Spend</p>
                <p className="text-2xl font-bold text-stone-900">
                  {formatCurrency(travelStats.monthlyTravelSpend)}
                </p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {formatCurrency(Math.abs(travelStats.costVsEstimate))} under budget
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Flight Bookings</p>
                <p className="text-2xl font-bold text-stone-900">
                  {travelStats.flightBookings}
                </p>
                <p className="text-xs text-stone-500 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Hotel Nights</p>
                <p className="text-2xl font-bold text-stone-900">
                  {travelStats.hotelNights}
                </p>
                <p className="text-xs text-stone-500 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Hotel className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Total Miles</p>
                <p className="text-2xl font-bold text-stone-900">
                  {travelStats.totalMiles.toLocaleString()}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Avg {formatCurrency(travelStats.avgTravelPerEvent)}/event
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Navigation className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2">
          <Card variant="bordered">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                Upcoming Trips
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sync Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="border border-stone-200 rounded-lg p-4 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-stone-900">
                        {trip.eventTitle}
                      </h4>
                      <p className="text-sm text-stone-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {trip.venue}, {trip.city}, {trip.state}
                      </p>
                    </div>
                    <Badge
                      variant={trip.travelMethod === "flight" ? "info" : "default"}
                    >
                      {trip.travelMethod === "flight" ? (
                        <Plane className="h-3 w-3 mr-1" />
                      ) : (
                        <Car className="h-3 w-3 mr-1" />
                      )}
                      {trip.travelMethod}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-stone-500">Event Date</p>
                      <p className="font-medium">{formatDate(trip.eventDate)}</p>
                    </div>
                    <div>
                      <p className="text-stone-500">Origin</p>
                      <p className="font-medium">{trip.origin}</p>
                    </div>
                    <div>
                      <p className="text-stone-500">Departure</p>
                      <p className="font-medium">
                        {trip.departure.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-stone-500">Est. Cost</p>
                      <p className="font-medium text-amber-700">
                        {formatCurrency(trip.estimatedCost)}
                      </p>
                    </div>
                  </div>

                  {/* Flight Details */}
                  {trip.flightDetails && (
                    <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-stone-500">Outbound</p>
                          <p className="font-mono text-xs">
                            {trip.flightDetails.outbound.flight} •{" "}
                            {trip.flightDetails.outbound.airport}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-blue-500 rotate-180" />
                        <div>
                          <p className="text-stone-500">Return</p>
                          <p className="font-mono text-xs">
                            {trip.flightDetails.return.flight} •{" "}
                            {trip.flightDetails.return.airport}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hotel Details */}
                  {trip.hotelDetails && (
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-4 text-sm">
                      <Hotel className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="font-medium">{trip.hotelDetails.name}</p>
                        <p className="text-stone-500 text-xs">
                          Check-in: {trip.hotelDetails.checkIn} • Confirmation:{" "}
                          {trip.hotelDetails.confirmation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Ground Details */}
                  {trip.groundDetails && (
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-4 text-sm">
                      <Car className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">
                          {trip.groundDetails.distance} miles •{" "}
                          {trip.groundDetails.driveTime} drive
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Export Itinerary
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Clustering Opportunities */}
          <Card variant="bordered" className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                Optimization Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clusteringOpportunities.map((opp) => (
                <div key={opp.id} className="space-y-3">
                  <div className="space-y-2">
                    {opp.events.map((event, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="font-medium">{event.title}</span>
                        <span className="text-stone-500">
                          {event.date} • {event.city}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-stone-700">{opp.recommendation}</p>
                    <p className="text-lg font-bold text-green-600 mt-2">
                      Save {formatCurrency(opp.potentialSavings)}
                    </p>
                  </div>

                  <Button className="w-full" size="sm">
                    Apply Suggestion
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plane className="h-4 w-4 mr-2" />
                Search Flights
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Hotel className="h-4 w-4 mr-2" />
                Book Hotel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Car className="h-4 w-4 mr-2" />
                Reserve Rental Car
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Log Expense
              </Button>
            </CardContent>
          </Card>

          {/* Cost Tracking */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Cost Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600">This Month</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">5% under estimate</span>
                  </div>
                </div>
                <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "95%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Estimated: $2,570</span>
                  <span>Actual: $2,450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
