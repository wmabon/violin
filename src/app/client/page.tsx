"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogIn,
  Calendar,
  CreditCard,
  MessageSquare,
  Music,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

// Mock booking data for demo
const mockBooking = {
  id: "VB-ABC123-XYZ",
  eventType: "Wedding",
  packageName: "Ceremony + Cocktail Hour",
  eventDate: new Date("2024-09-15"),
  startTime: "4:00 PM",
  venueName: "The Grand Ballroom",
  venueAddress: "123 Elegant Way, New York, NY 10001",
  status: "confirmed",
  totalPrice: 2500,
  depositPaid: true,
  depositAmount: 1250,
  balanceDue: 1250,
  balanceDueDate: new Date("2024-09-01"),
};

const mockMessages = [
  {
    id: 1,
    content: "Looking forward to your event! Please let me know if you have any song requests.",
    isAdmin: true,
    createdAt: new Date("2024-06-15T10:00:00"),
  },
  {
    id: 2,
    content: "We'd love to have Canon in D for the processional!",
    isAdmin: false,
    createdAt: new Date("2024-06-15T14:30:00"),
  },
];

export default function ClientPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - in production, this would authenticate
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-16 bg-stone-50 min-h-screen">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="bordered">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="h-8 w-8 text-amber-700" />
                </div>
                <CardTitle className="text-2xl font-serif">Client Portal</CardTitle>
                <p className="text-stone-600 mt-2">
                  Access your booking details, manage song requests, and
                  communicate directly with Victoria.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <p className="text-stone-600">
                    First time here?{" "}
                    <Link href="/client/register" className="text-amber-700 hover:underline">
                      Create an account
                    </Link>
                  </p>
                  <p className="mt-2">
                    <Link href="/client/forgot-password" className="text-stone-500 hover:underline">
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Logged in view
  return (
    <>
      <Header />
      <main className="pt-28 pb-16 bg-stone-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-stone-600">
              Manage your upcoming event with Victoria Strings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Overview */}
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-amber-600" />
                      Your Booking
                    </CardTitle>
                    <Badge variant="success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {mockBooking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-stone-500 mb-1">
                        Booking Reference
                      </div>
                      <div className="font-mono font-semibold">
                        {mockBooking.id}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-500 mb-1">Event Type</div>
                      <div className="font-semibold">{mockBooking.eventType}</div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-500 mb-1">Package</div>
                      <div className="font-semibold">{mockBooking.packageName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-500 mb-1">Event Date</div>
                      <div className="font-semibold">
                        {formatDate(mockBooking.eventDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-500 mb-1">Start Time</div>
                      <div className="font-semibold">{mockBooking.startTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-stone-500 mb-1">Venue</div>
                      <div className="font-semibold">{mockBooking.venueName}</div>
                      <div className="text-sm text-stone-500">
                        {mockBooking.venueAddress}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Song Requests */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-amber-600" />
                    Song Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 mb-4">
                    Add songs you&apos;d like performed at your event. Browse our{" "}
                    <Link href="/repertoire" className="text-amber-700 hover:underline">
                      full repertoire
                    </Link>{" "}
                    for inspiration.
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                      <div>
                        <div className="font-medium">Canon in D</div>
                        <div className="text-sm text-stone-500">
                          Pachelbel • Processional
                        </div>
                      </div>
                      <Badge variant="success">Confirmed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                      <div>
                        <div className="font-medium">A Thousand Years</div>
                        <div className="text-sm text-stone-500">
                          Christina Perri • First Dance
                        </div>
                      </div>
                      <Badge variant="info">Pending</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Song Request
                  </Button>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg ${
                          message.isAdmin
                            ? "bg-amber-50 ml-0 mr-8"
                            : "bg-stone-100 ml-8 mr-0"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {message.isAdmin ? "Victoria" : "You"}
                          </span>
                          <span className="text-xs text-stone-500">
                            {message.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-stone-700">{message.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Total</span>
                      <span className="font-semibold">
                        {formatCurrency(mockBooking.totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Deposit Paid</span>
                      <span>-{formatCurrency(mockBooking.depositAmount)}</span>
                    </div>
                    <div className="border-t border-stone-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Balance Due</span>
                        <span className="text-amber-700">
                          {formatCurrency(mockBooking.balanceDue)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-stone-500 mt-1">
                        <Clock className="h-4 w-4" />
                        Due by {formatDate(mockBooking.balanceDueDate)}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Pay Balance</Button>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-600" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 p-2 rounded hover:bg-stone-50 text-stone-700 hover:text-amber-700"
                      >
                        <FileText className="h-4 w-4" />
                        Booking Contract
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 p-2 rounded hover:bg-stone-50 text-stone-700 hover:text-amber-700"
                      >
                        <FileText className="h-4 w-4" />
                        Deposit Receipt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 p-2 rounded hover:bg-stone-50 text-stone-700 hover:text-amber-700"
                      >
                        <FileText className="h-4 w-4" />
                        Event Timeline
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card variant="bordered" className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-stone-900">Need Help?</h4>
                      <p className="text-sm text-stone-600 mt-1">
                        Have questions about your booking? Send a message above
                        or call (555) 123-4567.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
