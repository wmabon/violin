"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Music,
  Heart,
  Building2,
  ArrowLeft,
  Check,
  Star,
} from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscriptionCard } from "@/components/shop/subscription-card";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  LEARNING_PLANS,
  RECORDING_CLUB_PLANS,
  ANNIVERSARY_PLANS,
  HOLD_MUSIC_PLANS,
} from "@/lib/subscriptions";

const SUBSCRIPTION_TYPES = [
  {
    id: "learning",
    name: "Violin Mastery",
    subtitle: "Learning Subscription",
    description: "Master the violin with 100+ video lessons, live Q&A sessions, and personalized instruction from a professional performer.",
    icon: GraduationCap,
    color: "from-purple-500 to-indigo-600",
    plans: LEARNING_PLANS,
    features: [
      "Self-paced video lessons for all skill levels",
      "Monthly live Q&A sessions with instructor",
      "Downloadable practice guides and sheet music",
      "Progress tracking and achievements",
      "Private lessons available in Elite tier",
    ],
  },
  {
    id: "recording",
    name: "Strings Attached",
    subtitle: "Monthly Recording Club",
    description: "Receive exclusive monthly recordings, behind-the-scenes content, and early access to new releases.",
    icon: Music,
    color: "from-rose-500 to-pink-600",
    plans: RECORDING_CLUB_PLANS,
    features: [
      "2 exclusive recordings delivered monthly",
      "High-quality audio (MP3 + WAV formats)",
      "Behind-the-scenes content and stories",
      "Annual members get bonus holiday album",
      "Subscriber-only live streaming events",
    ],
  },
  {
    id: "anniversary",
    name: "Anniversary Program",
    subtitle: "For Wedding Clients",
    description: "Keep your wedding day music alive with annual recordings, personalized greetings, and exclusive rebooking discounts.",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    plans: ANNIVERSARY_PLANS,
    annual: true,
    features: [
      'Annual recording of "your song"',
      "Personalized video greeting each year",
      "Automatic anniversary reminders",
      "Exclusive rebooking discounts (10-20%)",
      "Priority booking for anniversary events",
    ],
  },
  {
    id: "hold-music",
    name: "Hold Music",
    subtitle: "For Businesses",
    description: "Licensed original violin recordings for your business phone system and lobby, creating a premium customer experience.",
    icon: Building2,
    color: "from-blue-500 to-cyan-600",
    plans: HOLD_MUSIC_PLANS,
    features: [
      "60+ minutes of professional recordings",
      "Quarterly new track additions",
      "Multiple audio formats included",
      "Commercial use license",
      "Live performance discounts for subscribers",
    ],
  },
];

export default function SubscriptionsPage() {
  const [selectedType, setSelectedType] = useState("learning");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const currentType = SUBSCRIPTION_TYPES.find((t) => t.id === selectedType)!;
  const isAnnualOnly = currentType.annual;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/shop"
              className="inline-flex items-center text-purple-200 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                Recurring Memberships
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Subscription Plans
              </h1>
              <p className="text-xl text-purple-100">
                Join our community with ongoing access to exclusive content,
                lessons, and personalized musical experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Type Selection */}
        <section className="py-8 bg-white border-b border-stone-200 sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {SUBSCRIPTION_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all",
                    selectedType === type.id
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-stone-200 hover:border-purple-300"
                  )}
                >
                  <type.icon className="h-5 w-5" />
                  <span className="font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Subscription Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Type Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6",
                  "bg-gradient-to-br",
                  currentType.color
                )}
              >
                <currentType.icon className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                {currentType.name}
              </h2>
              <p className="text-lg text-stone-500 mb-4">{currentType.subtitle}</p>
              <p className="text-stone-600">{currentType.description}</p>
            </div>

            {/* Billing Toggle (if not annual only) */}
            {!isAnnualOnly && (
              <div className="flex justify-center mb-8">
                <div className="bg-stone-100 rounded-full p-1 flex">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium transition-all",
                      billingCycle === "monthly"
                        ? "bg-white shadow text-stone-900"
                        : "text-stone-600 hover:text-stone-900"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("annual")}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium transition-all",
                      billingCycle === "annual"
                        ? "bg-white shadow text-stone-900"
                        : "text-stone-600 hover:text-stone-900"
                    )}
                  >
                    Annual
                    <Badge className="ml-2 bg-green-100 text-green-700">Save 15%</Badge>
                  </button>
                </div>
              </div>
            )}

            {/* Plans Grid */}
            <div
              className={cn(
                "grid gap-6 max-w-5xl mx-auto",
                currentType.plans.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-3"
              )}
            >
              {currentType.plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SubscriptionCard
                    plan={plan}
                    billingCycle={isAnnualOnly ? "annual" : billingCycle}
                  />
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl border border-stone-200">
              <h3 className="font-semibold text-stone-900 mb-4">
                All {currentType.name} subscribers get:
              </h3>
              <ul className="space-y-3">
                {currentType.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "Can I cancel anytime?",
                    a: "Yes! All subscriptions can be cancelled at any time. You'll continue to have access until the end of your current billing period.",
                  },
                  {
                    q: "Can I switch plans?",
                    a: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at your next billing date.",
                  },
                  {
                    q: "Is there a free trial?",
                    a: "We offer a 7-day free trial for the Violin Mastery learning subscription. Try it risk-free!",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards (Visa, Mastercard, Amex) and can also process payments via PayPal.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-stone-900 mb-2">{faq.q}</h4>
                      <p className="text-stone-600">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
