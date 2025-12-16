"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Building2, PartyPopper, Video, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const services = [
  {
    icon: Heart,
    title: "Weddings",
    description:
      "From the processional to your first dance, create magical moments with elegant live violin music.",
    startingPrice: 1500,
    features: ["Ceremony music", "Cocktail hour", "Custom arrangements"],
    href: "/booking?type=wedding",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description:
      "Sophisticated entertainment that elevates your galas, product launches, and executive dinners.",
    startingPrice: 1200,
    features: ["Background music", "Featured performances", "Brand alignment"],
    href: "/booking?type=corporate",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: PartyPopper,
    title: "Private Events",
    description:
      "Make birthdays, anniversaries, and intimate gatherings unforgettable with personalized performances.",
    startingPrice: 800,
    features: ["Personalized setlist", "Special requests", "Flexible timing"],
    href: "/booking?type=private",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Video,
    title: "Virtual Performances",
    description:
      "Live-streamed concerts and dedications, perfect for remote celebrations and virtual events.",
    startingPrice: 300,
    features: ["HD streaming", "Interactive requests", "Recording included"],
    href: "/booking?type=virtual",
    color: "bg-purple-50 text-purple-600",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
              Services for Every Occasion
            </h2>
            <p className="text-lg text-stone-600">
              Whether you&apos;re planning a grand celebration or an intimate
              gathering, I offer tailored musical experiences to match your vision.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="bordered" className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-sm text-stone-500">Starting at</span>
                    <div className="text-2xl font-bold text-amber-700">
                      {formatCurrency(service.startingPrice)}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-stone-600 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg">
              View All Services & Packages
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
