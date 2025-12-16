"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  GraduationCap,
  Music,
  Heart,
  Building2,
  MoreHorizontal,
  Mail,
  Gift,
  FileMusic,
  CreditCard,
  Package,
  Eye,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock subscription data
const subscriptionStats = {
  totalMRR: 8750,
  mrrChange: 12.5,
  activeSubscribers: 156,
  subscriberChange: 8,
  churnRate: 4.2,
  avgRevPerUser: 56.09,
  byType: {
    learning: { count: 85, mrr: 4250 },
    recording_club: { count: 45, mrr: 855 },
    anniversary: { count: 18, mrr: 2295 },
    hold_music: { count: 8, mrr: 1350 },
  },
};

const recentSubscriptions = [
  {
    id: "sub-1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    plan: "Violin Mastery - Professional",
    type: "learning",
    price: 79,
    status: "active",
    startDate: new Date("2024-08-01"),
  },
  {
    id: "sub-2",
    name: "TechCorp Inc.",
    email: "admin@techcorp.com",
    plan: "Hold Music - Professional",
    type: "hold_music",
    price: 99,
    status: "active",
    startDate: new Date("2024-07-15"),
  },
  {
    id: "sub-3",
    name: "Mike & Lisa Chen",
    email: "chen.mike@email.com",
    plan: "Anniversary - Milestone",
    type: "anniversary",
    price: 199,
    status: "active",
    startDate: new Date("2024-06-20"),
  },
  {
    id: "sub-4",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    plan: "Strings Attached - Annual",
    type: "recording_club",
    price: 180,
    status: "active",
    startDate: new Date("2024-08-10"),
  },
];

const giftOrderStats = {
  totalRevenue: 4250,
  pendingOrders: 8,
  completedOrders: 42,
  avgOrderValue: 185,
};

const recentGiftOrders = [
  {
    id: "go-1",
    orderNumber: "GO-240815-ABC12",
    product: "Custom Arrangement - Keepsake",
    customer: "John Smith",
    recipient: "Jane Smith",
    total: 295,
    status: "in_progress",
    dueDate: new Date("2024-08-25"),
  },
  {
    id: "go-2",
    orderNumber: "GO-240814-DEF34",
    product: "Dedication Video - Premium",
    customer: "Maria Garcia",
    recipient: "Carlos Garcia",
    total: 150,
    status: "ready",
    dueDate: new Date("2024-08-16"),
  },
  {
    id: "go-3",
    orderNumber: "GO-240812-GHI56",
    product: "Virtual Serenade - 20 Min",
    customer: "Robert Lee",
    recipient: "Susan Lee",
    total: 349,
    status: "pending",
    dueDate: new Date("2024-08-20"),
  },
];

const typeIcons = {
  learning: GraduationCap,
  recording_club: Music,
  anniversary: Heart,
  hold_music: Building2,
};

const typeColors = {
  learning: "bg-purple-100 text-purple-700",
  recording_club: "bg-rose-100 text-rose-700",
  anniversary: "bg-red-100 text-red-700",
  hold_music: "bg-blue-100 text-blue-700",
};

const statusColors = {
  active: "bg-green-100 text-green-700",
  paused: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  past_due: "bg-orange-100 text-orange-700",
  pending: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  ready: "bg-green-100 text-green-700",
  delivered: "bg-stone-100 text-stone-700",
};

export function SubscriptionDashboard() {
  const [view, setView] = useState<"subscriptions" | "gifts" | "sheet_music">(
    "subscriptions"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Revenue Streams
          </h2>
          <p className="text-stone-600">
            Manage subscriptions, gift orders, and digital products
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
          <button
            onClick={() => setView("subscriptions")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              view === "subscriptions"
                ? "bg-white shadow text-amber-700"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            <Users className="h-4 w-4" />
            Subscriptions
          </button>
          <button
            onClick={() => setView("gifts")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              view === "gifts"
                ? "bg-white shadow text-amber-700"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            <Gift className="h-4 w-4" />
            Gift Orders
          </button>
          <button
            onClick={() => setView("sheet_music")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              view === "sheet_music"
                ? "bg-white shadow text-amber-700"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            <FileMusic className="h-4 w-4" />
            Sheet Music
          </button>
        </div>
      </div>

      {/* Subscriptions View */}
      {view === "subscriptions" && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="bordered">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-500">Monthly Recurring</p>
                    <p className="text-2xl font-bold text-stone-900">
                      {formatCurrency(subscriptionStats.totalMRR)}
                    </p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />+{subscriptionStats.mrrChange}% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-500">Active Subscribers</p>
                    <p className="text-2xl font-bold text-stone-900">
                      {subscriptionStats.activeSubscribers}
                    </p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />+{subscriptionStats.subscriberChange} this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-500">Churn Rate</p>
                    <p className="text-2xl font-bold text-stone-900">
                      {subscriptionStats.churnRate}%
                    </p>
                    <p className="text-xs text-stone-500 mt-1">Monthly average</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-500">Avg Revenue/User</p>
                    <p className="text-2xl font-bold text-stone-900">
                      {formatCurrency(subscriptionStats.avgRevPerUser)}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">Per month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* By Type Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(subscriptionStats.byType).map(([type, data]) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              const colorClass = typeColors[type as keyof typeof typeColors];
              return (
                <Card key={type} variant="bordered">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", colorClass)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {type.replace("_", " ")}
                        </p>
                        <p className="text-lg font-bold">{data.count} subs</p>
                        <p className="text-xs text-stone-500">
                          {formatCurrency(data.mrr)}/mo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Subscriptions */}
          <Card variant="bordered">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Subscriptions</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input placeholder="Search..." className="pl-9 w-48" />
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sync
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                        Subscriber
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                        Plan
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stone-500">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-stone-500">
                        Revenue
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-stone-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubscriptions.map((sub) => {
                      const Icon = typeIcons[sub.type as keyof typeof typeIcons];
                      return (
                        <tr
                          key={sub.id}
                          className="border-b border-stone-100 hover:bg-stone-50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium">{sub.name}</div>
                            <div className="text-sm text-stone-500">{sub.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-stone-400" />
                              <span>{sub.plan}</span>
                            </div>
                            <div className="text-xs text-stone-500">
                              Since {formatDate(sub.startDate)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={statusColors[sub.status as keyof typeof statusColors]}>
                              {sub.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {formatCurrency(sub.price)}/mo
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Gift Orders View */}
      {view === "gifts" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="bordered">
              <CardContent className="p-4">
                <p className="text-sm text-stone-500">This Month Revenue</p>
                <p className="text-2xl font-bold text-stone-900">
                  {formatCurrency(giftOrderStats.totalRevenue)}
                </p>
              </CardContent>
            </Card>
            <Card variant="bordered" className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <p className="text-sm text-amber-700">Pending Orders</p>
                <p className="text-2xl font-bold text-amber-800">
                  {giftOrderStats.pendingOrders}
                </p>
              </CardContent>
            </Card>
            <Card variant="bordered">
              <CardContent className="p-4">
                <p className="text-sm text-stone-500">Completed</p>
                <p className="text-2xl font-bold text-stone-900">
                  {giftOrderStats.completedOrders}
                </p>
              </CardContent>
            </Card>
            <Card variant="bordered">
              <CardContent className="p-4">
                <p className="text-sm text-stone-500">Avg Order Value</p>
                <p className="text-2xl font-bold text-stone-900">
                  {formatCurrency(giftOrderStats.avgOrderValue)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-amber-600" />
                Active Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGiftOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-stone-200 rounded-lg p-4 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-stone-500">
                            {order.orderNumber}
                          </span>
                          <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                            {order.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-stone-900 mt-1">
                          {order.product}
                        </h4>
                      </div>
                      <span className="font-bold text-amber-700">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-stone-500">Purchaser</p>
                        <p className="font-medium">{order.customer}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">Recipient</p>
                        <p className="font-medium">{order.recipient}</p>
                      </div>
                      <div>
                        <p className="text-stone-500">Due Date</p>
                        <p className="font-medium">{formatDate(order.dueDate)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "pending" && (
                        <Button size="sm">Start Production</Button>
                      )}
                      {order.status === "ready" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Sheet Music View */}
      {view === "sheet_music" && (
        <Card variant="bordered">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileMusic className="h-5 w-5 text-amber-600" />
              Sheet Music Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-stone-500">
              <FileMusic className="h-12 w-12 mx-auto mb-4 text-stone-300" />
              <p>Sheet music sales analytics coming soon</p>
              <p className="text-sm">Track downloads, popular arrangements, and revenue</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
