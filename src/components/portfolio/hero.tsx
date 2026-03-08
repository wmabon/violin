"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="text-amber-200 text-sm font-medium">
                Award-Winning Violinist
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Elevate Your Event with{" "}
              <span className="text-amber-400">Exquisite</span> Live Violin
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-stone-300 leading-relaxed mb-8">
              Creating unforgettable moments through the timeless elegance of
              live violin performance. From intimate weddings to grand galas, I
              bring artistry and emotion to every occasion.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-stone-400">Events Performed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">12+</div>
                <div className="text-stone-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-stone-400">Average Rating</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="shadow-lg shadow-amber-900/30">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your Date
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Performance
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
