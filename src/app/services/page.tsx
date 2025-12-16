import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { CTASection } from "@/components/portfolio/cta-section";
import {
  Heart,
  Building2,
  PartyPopper,
  Video,
  Check,
  ArrowRight,
  Clock,
  Music2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getDurationLabel } from "@/lib/utils";
import { mockPackages } from "@/lib/db";

export const metadata: Metadata = {
  title: "Services & Packages",
  description:
    "Explore our wedding, corporate, private event, and virtual performance packages. Custom pricing available for your unique celebration.",
};

const services = [
  {
    id: "wedding",
    name: "Wedding Services",
    icon: Heart,
    description:
      "From the moment your guests arrive to your final dance, create a soundtrack that captures the emotion and elegance of your special day.",
    features: [
      "Ceremony music (prelude, processional, recessional)",
      "Cocktail hour entertainment",
      "Dinner background music",
      "First dance and special moment performances",
      "Custom song arrangements for your special songs",
      "Coordination with wedding planner and DJ",
    ],
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    packages: mockPackages.wedding,
  },
  {
    id: "corporate",
    name: "Corporate Events",
    icon: Building2,
    description:
      "Elevate your corporate gatherings with sophisticated live music that creates the perfect ambiance for networking, celebrating, and impressing.",
    features: [
      "Galas and award ceremonies",
      "Product launches and brand events",
      "Executive dinners and client entertainment",
      "Holiday parties and team celebrations",
      "Conference entertainment",
      "Custom branding integration available",
    ],
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    packages: mockPackages.corporate,
  },
  {
    id: "private",
    name: "Private Events",
    icon: PartyPopper,
    description:
      "Make birthdays, anniversaries, and intimate gatherings truly memorable with personalized live violin performances tailored to your celebration.",
    features: [
      "Birthday and milestone celebrations",
      "Anniversary parties",
      "Holiday gatherings",
      "Proposal and romantic events",
      "Memorial services",
      "House parties and intimate dinners",
    ],
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    packages: mockPackages.private,
  },
  {
    id: "virtual",
    name: "Virtual Performances",
    icon: Video,
    description:
      "Experience the magic of live violin from anywhere in the world. Perfect for remote celebrations, virtual events, and personalized dedications.",
    features: [
      "Live-streamed concerts",
      "Personalized video dedications",
      "Virtual wedding ceremonies",
      "Corporate virtual events",
      "Interactive song requests",
      "High-quality recording provided",
    ],
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    packages: mockPackages.virtual,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-0">
        {/* Hero Section */}
        <section className="bg-stone-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
              Services & Packages
            </h1>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, discover the perfect
              musical experience for your special occasion.
            </p>
          </div>
        </section>

        {/* Services Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={index % 2 === 0 ? "bg-white" : "bg-stone-50"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              {/* Service Header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-16 h-16 rounded-xl ${service.color} border flex items-center justify-center`}
                >
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold text-stone-900">
                    {service.name}
                  </h2>
                </div>
              </div>

              <p className="text-lg text-stone-600 max-w-3xl mb-8">
                {service.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-stone-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Packages Grid */}
              <h3 className="text-2xl font-semibold text-stone-900 mb-6">
                Available Packages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    variant="bordered"
                    className="relative hover:shadow-lg transition-shadow"
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge
                          variant="warning"
                          className="bg-amber-600 text-white"
                        >
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-stone-900 mb-2">
                        {pkg.name}
                      </h4>
                      <p className="text-stone-500 text-sm mb-4">
                        {pkg.description}
                      </p>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-amber-700">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-stone-500 text-sm mb-4">
                        <Clock className="h-4 w-4" />
                        <span>{getDurationLabel(pkg.duration)}</span>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-stone-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href={`/booking?type=${service.id}&package=${pkg.id}`}>
                        <Button className="w-full">
                          Book This Package
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Custom Quote Section */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Music2 className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
              Need Something Custom?
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              Every event is unique. If you don&apos;t see exactly what you&apos;re
              looking for, let&apos;s create a custom package tailored to your
              specific needs and vision.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Request Custom Quote
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
