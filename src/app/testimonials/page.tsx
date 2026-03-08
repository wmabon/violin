import type { Metadata } from "next";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { CTASection } from "@/components/portfolio/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Award, Heart, Building2, PartyPopper } from "lucide-react";
import { mockTestimonials } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what couples and event planners say about Harrison Strings. Over 150 five-star reviews from weddings, corporate events, and private celebrations.",
};

const stats = [
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "150+", label: "5-Star Reviews", icon: Award },
  { value: "98%", label: "Would Recommend", icon: Heart },
];

const eventTypeIcons = {
  Wedding: Heart,
  "Corporate Gala": Building2,
  "Corporate Event": Building2,
  "Anniversary Party": PartyPopper,
  "Private Event": PartyPopper,
};

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-0">
        {/* Hero Section */}
        <section className="bg-stone-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
                Client Testimonials
              </h1>
              <p className="text-xl text-stone-300">
                Don&apos;t just take my word for it. Here&apos;s what couples and
                event planners have to say about their experience.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 rounded-xl p-6 text-center"
                >
                  <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-stone-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="elevated" className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div
                    className="aspect-square md:aspect-auto bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800')",
                    }}
                  />
                  <div className="md:col-span-2 p-8">
                    <Quote className="h-10 w-10 text-amber-200 mb-4" />
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-amber-500 fill-amber-500"
                        />
                      ))}
                    </div>
                    <p className="text-xl text-stone-700 leading-relaxed mb-6 italic">
                      &quot;{mockTestimonials[0].content}&quot;
                    </p>
                    <div>
                      <div className="font-semibold text-stone-900">
                        {mockTestimonials[0].clientName}
                      </div>
                      <div className="text-stone-500">
                        {mockTestimonials[0].eventType} at{" "}
                        {mockTestimonials[0].venue}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">
              More Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTestimonials.map((testimonial) => {
                const EventIcon =
                  eventTypeIcons[
                    testimonial.eventType as keyof typeof eventTypeIcons
                  ] || Heart;

                return (
                  <Card key={testimonial.id} variant="bordered" className="h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <EventIcon className="h-5 w-5 text-amber-700" />
                          </div>
                          <div>
                            <div className="font-semibold text-stone-900 text-sm">
                              {testimonial.clientName}
                            </div>
                            <div className="text-stone-500 text-xs">
                              {testimonial.eventType}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-amber-500 fill-amber-500"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-stone-600 text-sm leading-relaxed flex-1">
                        &quot;{testimonial.content}&quot;
                      </p>

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500">
                        {testimonial.venue && (
                          <span>{testimonial.venue}</span>
                        )}
                        {testimonial.date && (
                          <span className="ml-2">
                            • {formatDate(testimonial.date)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Review Platforms */}
        <section className="py-16 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">
              Find Me On
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-700 mb-1">4.9</div>
                <div className="text-stone-600">The Knot</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-700 mb-1">5.0</div>
                <div className="text-stone-600">WeddingWire</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-700 mb-1">4.9</div>
                <div className="text-stone-600">Google</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-700 mb-1">5.0</div>
                <div className="text-stone-600">Yelp</div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
