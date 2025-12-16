"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Gift,
  Mail,
  Package,
  Check,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { GIFT_CARD_OPTIONS } from "@/lib/subscriptions";

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [deliveryType, setDeliveryType] = useState<"digital" | "physical">("digital");
  const [formData, setFormData] = useState({
    purchaserName: "",
    purchaserEmail: "",
    recipientName: "",
    recipientEmail: "",
    personalMessage: "",
  });

  const amount = customAmount ? parseInt(customAmount) : selectedAmount;
  const isValidAmount = amount && amount >= 25 && amount <= 5000;
  const deliveryFee = deliveryType === "physical" ? 15 : 0;
  const totalPrice = (amount || 0) + deliveryFee;

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getAmountDescription = () => {
    const option = GIFT_CARD_OPTIONS.find((o) => o.amount === amount);
    return option?.description || "Perfect for any occasion";
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/shop"
              className="inline-flex items-center text-green-100 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                The Perfect Gift
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Gift Cards
              </h1>
              <p className="text-xl text-green-100">
                Give the gift of music. Redeemable for live performances,
                lessons, custom recordings, and all shop products.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Configuration */}
              <div className="lg:col-span-2 space-y-8">
                {/* Amount Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      Select Amount
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                      {PRESET_AMOUNTS.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleAmountSelect(value)}
                          className={cn(
                            "py-4 px-3 rounded-lg border-2 font-semibold transition-all",
                            selectedAmount === value && !customAmount
                              ? "border-green-600 bg-green-50 text-green-700"
                              : "border-stone-200 hover:border-green-300"
                          )}
                        >
                          {formatCurrency(value)}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-stone-600">or enter custom:</span>
                      <div className="relative flex-1 max-w-xs">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">
                          $
                        </span>
                        <Input
                          type="number"
                          min={25}
                          max={5000}
                          placeholder="25 - 5,000"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    {amount && (
                      <p className="mt-4 text-stone-600 text-sm">
                        <Sparkles className="inline h-4 w-4 mr-1 text-amber-500" />
                        {getAmountDescription()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Delivery Type */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-green-600" />
                      Delivery Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setDeliveryType("digital")}
                        className={cn(
                          "p-4 rounded-lg border-2 text-left transition-all",
                          deliveryType === "digital"
                            ? "border-green-600 bg-green-50"
                            : "border-stone-200 hover:border-green-300"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Mail className="h-6 w-6 text-green-600" />
                          <span className="font-semibold">Digital Delivery</span>
                          <Badge variant="outline" className="ml-auto">Free</Badge>
                        </div>
                        <p className="text-sm text-stone-600">
                          Instant email delivery with custom message
                        </p>
                      </button>

                      <button
                        onClick={() => setDeliveryType("physical")}
                        className={cn(
                          "p-4 rounded-lg border-2 text-left transition-all",
                          deliveryType === "physical"
                            ? "border-green-600 bg-green-50"
                            : "border-stone-200 hover:border-green-300"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Gift className="h-6 w-6 text-green-600" />
                          <span className="font-semibold">Physical Card</span>
                          <Badge variant="outline" className="ml-auto">+$15</Badge>
                        </div>
                        <p className="text-sm text-stone-600">
                          Premium printed card with gift packaging
                        </p>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recipient Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recipient Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        placeholder="Your full name"
                        value={formData.purchaserName}
                        onChange={(e) =>
                          setFormData({ ...formData, purchaserName: e.target.value })
                        }
                      />
                      <Input
                        label="Your Email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.purchaserEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, purchaserEmail: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Recipient Name"
                        placeholder="Who is this for?"
                        value={formData.recipientName}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientName: e.target.value })
                        }
                      />
                      <Input
                        label="Recipient Email"
                        type="email"
                        placeholder="recipient@email.com"
                        value={formData.recipientEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientEmail: e.target.value })
                        }
                      />
                    </div>

                    <Textarea
                      label="Personal Message (optional)"
                      placeholder="Add a personal message to include with the gift card..."
                      rows={3}
                      value={formData.personalMessage}
                      onChange={(e) =>
                        setFormData({ ...formData, personalMessage: e.target.value })
                      }
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right: Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Gift Card Preview */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between mb-8">
                        <span className="font-serif text-xl">Victoria Strings</span>
                        <CreditCard className="h-8 w-8 opacity-50" />
                      </div>
                      <div className="text-3xl font-bold mb-2">
                        {amount ? formatCurrency(amount) : "$--"}
                      </div>
                      <div className="text-green-200 text-sm">
                        Gift Card
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-4 border-t border-stone-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Card Value</span>
                        <span>{amount ? formatCurrency(amount) : "--"}</span>
                      </div>
                      {deliveryFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-600">Physical Delivery</span>
                          <span>{formatCurrency(deliveryFee)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-stone-200">
                        <span>Total</span>
                        <span className="text-green-700">
                          {isValidAmount ? formatCurrency(totalPrice) : "--"}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 pt-4 border-t border-stone-200">
                      {[
                        "No expiration date",
                        "Redeemable for any service",
                        "Transferable to anyone",
                        "Instant digital delivery",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                          <Check className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                      disabled={!isValidAmount}
                    >
                      Purchase Gift Card
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
