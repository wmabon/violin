"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockTestimonials } from "@/lib/db";

export function Testimonials() {
  const featuredTestimonials = mockTestimonials.filter((t) => t.isFeatured);

  return (
    <section className="py-24 bg-white">
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
              What Clients Say
            </h2>
            <p className="text-lg text-stone-600">
              Don&apos;t just take my word for it. Here&apos;s what couples and event
              planners have to say about their experience.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="bordered" className="h-full">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-amber-200 mb-4" />

                  {/* Stars */}
                  <div className="flex space-x-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-stone-700 leading-relaxed mb-6">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author */}
                  <div className="border-t border-stone-100 pt-4">
                    <div className="font-semibold text-stone-900">
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-stone-500">
                      {testimonial.eventType}
                      {testimonial.venue && ` at ${testimonial.venue}`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-stone-900 rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-stone-400">Events Performed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">4.9</div>
              <div className="text-stone-400">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">98%</div>
              <div className="text-stone-400">Would Recommend</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">150+</div>
              <div className="text-stone-400">5-Star Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
