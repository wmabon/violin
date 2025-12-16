"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-amber-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              Ready to Make Your Event Unforgettable?
            </h2>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-10">
              Let&apos;s discuss how live violin music can elevate your special
              occasion. Book a free consultation to explore your options.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/booking">
                <Button
                  size="lg"
                  className="bg-white text-amber-700 hover:bg-amber-50"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Check Availability
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule a Call
                </Button>
              </Link>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-amber-100">
              <a
                href="mailto:hello@victoriastrings.com"
                className="flex items-center hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                hello@victoriastrings.com
              </a>
              <span className="hidden sm:block">|</span>
              <a
                href="tel:+15551234567"
                className="flex items-center hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
