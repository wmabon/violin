"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Music,
  Gift,
  CreditCard,
  GraduationCap,
  Heart,
  Building2,
  Video,
  Package,
  FileMusic,
  Sparkles,
  ArrowRight,
  Star,
  Check,
} from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const SHOP_CATEGORIES = [
  {
    id: "subscriptions",
    name: "Subscriptions",
    description: "Ongoing learning and exclusive content",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-700",
    featured: true,
  },
  {
    id: "gifts",
    name: "Gift Products",
    description: "Personalized musical gifts for any occasion",
    icon: Gift,
    color: "bg-rose-100 text-rose-700",
    featured: true,
  },
  {
    id: "sheet-music",
    name: "Sheet Music",
    description: "Professional violin arrangements",
    icon: FileMusic,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "gift-cards",
    name: "Gift Cards",
    description: "The perfect gift for music lovers",
    icon: CreditCard,
    color: "bg-green-100 text-green-700",
  },
];

const SUBSCRIPTION_HIGHLIGHTS = [
  {
    id: "learning",
    name: "Violin Mastery",
    subtitle: "Learning Subscription",
    description: "Video lessons, live Q&A, and personalized instruction",
    icon: GraduationCap,
    startingPrice: 29,
    features: ["100+ video lessons", "Practice guides", "Progress tracking"],
    href: "/shop/subscriptions/learning",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "recording",
    name: "Strings Attached",
    subtitle: "Monthly Recording Club",
    description: "Exclusive monthly recordings and behind-the-scenes content",
    icon: Music,
    startingPrice: 19,
    features: ["2 recordings/month", "Bonus content", "Early access"],
    href: "/shop/subscriptions/recording-club",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "anniversary",
    name: "Anniversary Program",
    subtitle: "For Wedding Clients",
    description: "Keep your wedding music alive with annual touchpoints",
    icon: Heart,
    startingPrice: 99,
    annual: true,
    features: ["Annual recording", "Video greeting", "Rebooking discount"],
    href: "/shop/subscriptions/anniversary",
    color: "from-red-500 to-rose-600",
  },
  {
    id: "corporate",
    name: "Hold Music",
    subtitle: "For Businesses",
    description: "Licensed violin music for phone systems and lobbies",
    icon: Building2,
    startingPrice: 49,
    features: ["60+ minutes", "Quarterly updates", "Multiple formats"],
    href: "/shop/subscriptions/hold-music",
    color: "from-blue-500 to-cyan-600",
  },
];

const GIFT_HIGHLIGHTS = [
  {
    id: "arrangement",
    name: "Custom Arrangements",
    description: "Personalized arrangements of any song, professionally recorded",
    price: 175,
    priceLabel: "from",
    image: "/images/arrangement.jpg",
    popular: true,
    href: "/shop/gifts/custom-arrangement",
  },
  {
    id: "dedication",
    name: "Dedication Videos",
    description: "Short personalized video performances for any occasion",
    price: 85,
    priceLabel: "from",
    image: "/images/dedication.jpg",
    href: "/shop/gifts/dedication-video",
  },
  {
    id: "serenade",
    name: "Virtual Serenades",
    description: "Live private performances via video call",
    price: 199,
    priceLabel: "from",
    image: "/images/serenade.jpg",
    popular: true,
    href: "/shop/gifts/virtual-serenade",
  },
  {
    id: "concert-box",
    name: "Concert in a Box",
    description: "At-home concert experience package",
    price: 129,
    priceLabel: "from",
    image: "/images/concert-box.jpg",
    href: "/shop/gifts/concert-box",
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
                Shop & Subscriptions
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Music Beyond the Performance
              </h1>
              <p className="text-xl text-stone-300 mb-8">
                Explore subscriptions, personalized gifts, sheet music, and more.
                Perfect for music lovers, students, and special occasions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  Browse All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Gift className="mr-2 h-5 w-5" />
                  Gift Ideas
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 border-b border-stone-200 bg-white sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {SHOP_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/${category.id}`}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all",
                    "hover:border-amber-500 hover:bg-amber-50",
                    activeCategory === category.id
                      ? "border-amber-600 bg-amber-50"
                      : "border-stone-200"
                  )}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <category.icon className={cn("h-5 w-5", category.color.split(" ")[1])} />
                  <span className="font-medium">{category.name}</span>
                  {category.featured && (
                    <Badge variant="info" className="text-xs">Popular</Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Subscriptions Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-purple-100 text-purple-700 mb-4">
                Recurring Revenue
              </Badge>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                Subscription Plans
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Join our community with ongoing access to exclusive content,
                lessons, and personalized experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SUBSCRIPTION_HIGHLIGHTS.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={sub.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className={cn(
                        "h-2 rounded-t-lg bg-gradient-to-r",
                        sub.color
                      )} />
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center",
                            "bg-gradient-to-br",
                            sub.color
                          )}>
                            <sub.icon className="h-6 w-6 text-white" />
                          </div>
                          {sub.annual && (
                            <Badge variant="outline">Annual</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg mt-4">{sub.name}</CardTitle>
                        <p className="text-sm text-stone-500">{sub.subtitle}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-stone-600 text-sm mb-4">{sub.description}</p>
                        <ul className="space-y-2 mb-6">
                          {sub.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-stone-900">
                            {formatCurrency(sub.startingPrice)}
                          </span>
                          <span className="text-stone-500">
                            /{sub.annual ? "year" : "month"}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center text-amber-700 font-medium group-hover:text-amber-800">
                          View Plans
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Products Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-rose-100 text-rose-700 mb-4">
                One-Time Purchases
              </Badge>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                Gift Products
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Personalized musical gifts perfect for birthdays, anniversaries,
                holidays, and any special occasion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {GIFT_HIGHLIGHTS.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={gift.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
                      <div className="h-40 bg-gradient-to-br from-stone-200 to-stone-300 relative">
                        {gift.popular && (
                          <Badge className="absolute top-3 right-3 bg-amber-500">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Gift className="h-16 w-16 text-stone-400" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg text-stone-900 mb-2">
                          {gift.name}
                        </h3>
                        <p className="text-stone-600 text-sm mb-4">
                          {gift.description}
                        </p>
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-sm text-stone-500">{gift.priceLabel}</span>
                          <span className="text-2xl font-bold text-stone-900">
                            {formatCurrency(gift.price)}
                          </span>
                        </div>
                        <div className="flex items-center text-amber-700 font-medium group-hover:text-amber-800">
                          Shop Now
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/shop/gifts">
                <Button variant="outline" size="lg">
                  View All Gift Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sheet Music & Gift Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sheet Music */}
              <Link href="/shop/sheet-music">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileMusic className="h-8 w-8 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                          Sheet Music Store
                        </h3>
                        <p className="text-stone-600 mb-4">
                          Professional violin arrangements for wedding standards,
                          pop hits, film themes, and more. Instant PDF download.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">Wedding $15-25</Badge>
                          <Badge variant="outline">Pop $20-35</Badge>
                          <Badge variant="outline">Film $25-40</Badge>
                        </div>
                        <div className="flex items-center text-amber-700 font-medium group-hover:text-amber-800">
                          Browse Catalog
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Gift Cards */}
              <Link href="/shop/gift-cards">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-8 w-8 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                          Gift Cards
                        </h3>
                        <p className="text-stone-600 mb-4">
                          The perfect gift for music lovers. Redeemable for any
                          service including live bookings, lessons, and products.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className="bg-green-100 text-green-700">$50</Badge>
                          <Badge className="bg-green-100 text-green-700">$100</Badge>
                          <Badge className="bg-green-100 text-green-700">$250</Badge>
                          <Badge className="bg-green-100 text-green-700">$500+</Badge>
                        </div>
                        <div className="flex items-center text-green-700 font-medium group-hover:text-green-800">
                          Purchase Gift Card
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-sell Banner */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Looking for a Live Performance?
              </h2>
              <p className="text-xl text-amber-100 mb-8">
                Book a live performance for your wedding, corporate event,
                or private celebration.
              </p>
              <Link href="/booking">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                  Book a Performance
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
