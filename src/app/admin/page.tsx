"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronRight,
  Mail,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock data for dashboard
const stats = [
  {
    title: "Monthly Revenue",
    value: "$42,500",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "Next 30 days",
    trend: "neutral",
    icon: Calendar,
  },
  {
    title: "Active Inquiries",
    value: "12",
    change: "5 new this week",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "34%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentBookings = [
  {
    id: "VB-ABC123",
    client: "Sarah Thompson",
    eventType: "Wedding",
    date: new Date("2024-09-15"),
    status: "confirmed",
    total: 2500,
  },
  {
    id: "VB-DEF456",
    client: "TechCorp Inc.",
    eventType: "Corporate",
    date: new Date("2024-08-22"),
    status: "deposit_paid",
    total: 1800,
  },
  {
    id: "VB-GHI789",
    client: "Michael Chen",
    eventType: "Private",
    date: new Date("2024-08-10"),
    status: "inquiry",
    total: 1200,
  },
  {
    id: "VB-JKL012",
    client: "Emily Rodriguez",
    eventType: "Wedding",
    date: new Date("2024-10-05"),
    status: "confirmed",
    total: 4000,
  },
];

const pendingTasks = [
  { id: 1, task: "Send contract to Sarah Thompson", due: "Today", urgent: true },
  { id: 2, task: "Follow up with TechCorp inquiry", due: "Tomorrow", urgent: false },
  { id: 3, task: "Confirm song list for Chen wedding", due: "Aug 5", urgent: false },
  { id: 4, task: "Process balance payment - Rodriguez", due: "Aug 15", urgent: false },
];

const statusColors = {
  inquiry: { bg: "bg-blue-100", text: "text-blue-700" },
  deposit_paid: { bg: "bg-amber-100", text: "text-amber-700" },
  confirmed: { bg: "bg-green-100", text: "text-green-700" },
  completed: { bg: "bg-stone-100", text: "text-stone-700" },
  cancelled: { bg: "bg-red-100", text: "text-red-700" },
};

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <Card variant="bordered" className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="h-8 w-8 text-amber-700" />
            </div>
            <CardTitle className="text-2xl font-serif">Admin Dashboard</CardTitle>
            <p className="text-stone-600 mt-2">
              Sign in to manage your bookings and business.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top Navigation */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6 text-amber-600" />
              <span className="font-serif font-bold text-xl">Victoria Strings</span>
            </Link>
            <Badge variant="info">Admin</Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                placeholder="Search bookings..."
                className="pl-9 w-64"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-stone-100">
              <Bell className="h-5 w-5 text-stone-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-stone-100">
              <Settings className="h-5 w-5 text-stone-600" />
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="p-2 rounded-lg hover:bg-stone-100"
            >
              <LogOut className="h-5 w-5 text-stone-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 border-t border-stone-100">
          {["overview", "bookings", "calendar", "clients", "finances", "settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-3 text-sm font-medium capitalize transition-colors",
                  activeTab === tab
                    ? "text-amber-700 border-b-2 border-amber-600"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-stone-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-stone-900">{stat.value}</p>
                    <p
                      className={cn(
                        "text-sm mt-1",
                        stat.trend === "up" && "text-green-600",
                        stat.trend === "down" && "text-red-600",
                        stat.trend === "neutral" && "text-stone-500"
                      )}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card variant="bordered">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Bookings</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                          Booking
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                          Client
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                          Event
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-stone-500">
                          Total
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-stone-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-stone-100 hover:bg-stone-50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-mono text-sm">{booking.id}</div>
                            <div className="text-xs text-stone-500">
                              {formatDate(booking.date)}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {booking.client}
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            {booking.eventType}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={cn(
                                statusColors[
                                  booking.status as keyof typeof statusColors
                                ]?.bg,
                                statusColors[
                                  booking.status as keyof typeof statusColors
                                ]?.text
                              )}
                            >
                              {booking.status.replace("_", " ")}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {formatCurrency(booking.total)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button className="p-1.5 rounded hover:bg-stone-100">
                                <Eye className="h-4 w-4 text-stone-500" />
                              </button>
                              <button className="p-1.5 rounded hover:bg-stone-100">
                                <Mail className="h-4 w-4 text-stone-500" />
                              </button>
                              <button className="p-1.5 rounded hover:bg-stone-100">
                                <MoreHorizontal className="h-4 w-4 text-stone-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pendingTasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-start gap-3 p-2 rounded hover:bg-stone-50"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-stone-800">{task.task}</p>
                        <p
                          className={cn(
                            "text-xs",
                            task.urgent ? "text-red-600" : "text-stone-500"
                          )}
                        >
                          {task.urgent && (
                            <AlertCircle className="inline h-3 w-3 mr-1" />
                          )}
                          Due: {task.due}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Booking
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card variant="bordered" className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Next Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-700 mb-1">15</div>
                  <div className="text-amber-600 mb-3">September 2024</div>
                  <div className="text-stone-800 font-medium">
                    Thompson Wedding
                  </div>
                  <div className="text-sm text-stone-600">
                    The Grand Ballroom • 4:00 PM
                  </div>
                  <Button className="mt-4" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
