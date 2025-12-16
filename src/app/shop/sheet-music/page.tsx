"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileMusic,
  Search,
  Filter,
  ShoppingCart,
  Download,
  ArrowLeft,
  Star,
  Package,
  Check,
} from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  SAMPLE_SHEET_MUSIC,
  SHEET_MUSIC_BUNDLES,
  SHEET_MUSIC_CATEGORIES,
} from "@/lib/subscriptions";

export default function SheetMusicPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  const filteredMusic = SAMPLE_SHEET_MUSIC.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artist?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCartItem = (id: string) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((total, id) => {
    const item = SAMPLE_SHEET_MUSIC.find((sm) => sm.id === id);
    return total + (item?.price || 0);
  }, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/shop"
              className="inline-flex items-center text-amber-200 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                Digital Downloads
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Sheet Music Store
              </h1>
              <p className="text-xl text-amber-100">
                Professional violin arrangements for weddings, events, and personal
                enjoyment. Instant PDF download after purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Bundles Section */}
        <section className="py-12 bg-white border-b border-stone-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 text-center">
              <Package className="inline h-6 w-6 mr-2 text-amber-600" />
              Value Bundles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SHEET_MUSIC_BUNDLES.map((bundle) => (
                <Card key={bundle.id} className="border-amber-200 bg-amber-50">
                  <CardContent className="p-6">
                    <Badge className="bg-amber-600 mb-3">
                      Save {Math.round((1 - bundle.price / bundle.originalValue) * 100)}%
                    </Badge>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                      {bundle.name}
                    </h3>
                    <p className="text-stone-600 text-sm mb-4">{bundle.description}</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-amber-700">
                        {formatCurrency(bundle.price)}
                      </span>
                      <span className="text-stone-400 line-through">
                        {formatCurrency(bundle.originalValue)}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 mb-4">
                      {bundle.itemCount} arrangements included
                    </p>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <Input
                      placeholder="Search music..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-3 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Categories
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg transition-colors",
                          !selectedCategory
                            ? "bg-amber-100 text-amber-800"
                            : "hover:bg-stone-100"
                        )}
                      >
                        All Categories
                      </button>
                      {SHEET_MUSIC_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center",
                            selectedCategory === cat.id
                              ? "bg-amber-100 text-amber-800"
                              : "hover:bg-stone-100"
                          )}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-stone-400">{cat.priceRange}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cart Summary */}
                  {cart.length > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Cart ({cart.length})
                        </h3>
                        <div className="text-2xl font-bold text-amber-700 mb-3">
                          {formatCurrency(cartTotal)}
                        </div>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700">
                          Checkout
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-stone-600">
                    {filteredMusic.length} arrangements found
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMusic.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={cn(
                          "h-full transition-all hover:shadow-md",
                          cart.includes(item.id) && "ring-2 ring-amber-500"
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-stone-900 line-clamp-1">
                                {item.title}
                              </h4>
                              {item.artist && (
                                <p className="text-sm text-stone-500">{item.artist}</p>
                              )}
                            </div>
                            {item.featured && (
                              <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {item.category}
                            </Badge>
                            {item.difficulty && (
                              <Badge variant="outline" className="text-xs">
                                {item.difficulty}
                              </Badge>
                            )}
                            {item.duration && (
                              <span className="text-xs text-stone-400">
                                {item.duration}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-stone-900">
                              {formatCurrency(item.price)}
                            </span>
                            <Button
                              size="sm"
                              variant={cart.includes(item.id) ? "primary" : "outline"}
                              onClick={() => toggleCartItem(item.id)}
                              className={cn(
                                cart.includes(item.id) &&
                                  "bg-green-600 hover:bg-green-700"
                              )}
                            >
                              {cart.includes(item.id) ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Add
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredMusic.length === 0 && (
                  <div className="text-center py-12">
                    <FileMusic className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">No arrangements found</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Download className="h-10 w-10 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-stone-900 mb-2">
                    Instant Download
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Get your PDF immediately after purchase
                  </p>
                </div>
                <div>
                  <FileMusic className="h-10 w-10 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-stone-900 mb-2">
                    Professional Quality
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Arrangements by a professional performer
                  </p>
                </div>
                <div>
                  <Star className="h-10 w-10 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-stone-900 mb-2">
                    Performance Ready
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Tested and refined for live events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
