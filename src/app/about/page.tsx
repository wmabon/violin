import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { CTASection } from "@/components/portfolio/cta-section";
import {
  GraduationCap,
  Award,
  Music2,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Victoria",
  description:
    "Learn about Victoria's journey from Juilliard graduate to premier event violinist. Over 15 years of experience creating unforgettable musical moments.",
};

const milestones = [
  {
    year: "2005",
    title: "Juilliard Pre-College",
    description: "Accepted into the prestigious Juilliard Pre-College program",
  },
  {
    year: "2009",
    title: "Bachelor of Music",
    description: "Graduated with honors from The Juilliard School",
  },
  {
    year: "2011",
    title: "Master of Music",
    description: "Completed Master's degree in Violin Performance",
  },
  {
    year: "2012",
    title: "International Debut",
    description: "Solo debut at Carnegie Hall's Weill Recital Hall",
  },
  {
    year: "2015",
    title: "Victoria Strings Founded",
    description: "Launched private event performance business",
  },
  {
    year: "2020",
    title: "500+ Events",
    description: "Milestone of performing at 500 events reached",
  },
];

const awards = [
  "Young Concert Artists International Auditions - Finalist",
  "Sphinx Competition - Semi-Finalist",
  "National Foundation for Advancement in the Arts - Gold Award",
  "Juilliard Concerto Competition - Winner",
];

const venues = [
  "The Plaza Hotel",
  "The Rainbow Room",
  "Cipriani Wall Street",
  "The Pierre",
  "Gotham Hall",
  "The St. Regis",
  "One World Observatory",
  "Brooklyn Botanic Garden",
  "New York Public Library",
  "The Metropolitan Club",
  "Oheka Castle",
  "The Foundry",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-stone-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070')",
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Meet Victoria
              </h1>
              <p className="text-xl text-stone-300 leading-relaxed">
                Award-winning violinist dedicated to creating unforgettable
                musical experiences for life&apos;s most precious moments.
              </p>
            </div>
          </div>
        </section>

        {/* Main Bio Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Image */}
              <div className="space-y-6">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070')",
                    }}
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-stone-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-amber-700">15+</div>
                    <div className="text-sm text-stone-600">Years Experience</div>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-amber-700">500+</div>
                    <div className="text-sm text-stone-600">Events</div>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-amber-700">4.9</div>
                    <div className="text-sm text-stone-600">Rating</div>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
                    A Passion for Performance
                  </h2>
                  <div className="prose prose-stone prose-lg">
                    <p>
                      My love affair with the violin began at age five, when I
                      first heard Itzhak Perlman perform on television. That
                      moment sparked a lifelong dedication to the instrument
                      that would eventually lead me to the stages of Carnegie
                      Hall and beyond.
                    </p>
                    <p>
                      After graduating from The Juilliard School with both
                      Bachelor&apos;s and Master&apos;s degrees in Violin
                      Performance, I embarked on a career that has taken me
                      around the world. I&apos;ve had the privilege of
                      performing with renowned orchestras, in prestigious
                      concert halls, and at private events for discerning
                      clients who understand the transformative power of live
                      music.
                    </p>
                    <p>
                      Today, I specialize in bringing the elegance and emotion
                      of live violin to weddings, corporate events, and private
                      celebrations. Every performance is an opportunity to
                      create a moment that will be remembered forever—and I
                      approach each event with the same dedication and artistry
                      that I bring to the concert stage.
                    </p>
                  </div>
                </div>

                {/* Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                      <GraduationCap className="h-7 w-7 text-amber-700" />
                    </div>
                    <h3 className="font-semibold text-stone-900">Education</h3>
                    <p className="text-sm text-stone-600">
                      The Juilliard School
                      <br />
                      B.M. & M.M.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                      <Award className="h-7 w-7 text-amber-700" />
                    </div>
                    <h3 className="font-semibold text-stone-900">Recognition</h3>
                    <p className="text-sm text-stone-600">
                      Multiple International
                      <br />
                      Competition Awards
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                      <MapPin className="h-7 w-7 text-amber-700" />
                    </div>
                    <h3 className="font-semibold text-stone-900">Based In</h3>
                    <p className="text-sm text-stone-600">
                      New York City
                      <br />& Tri-State Area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                Journey & Milestones
              </h2>
              <p className="text-lg text-stone-600">
                Key moments in my musical journey
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-amber-200" />

              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="w-1/2" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                      }`}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="text-amber-600 font-bold text-lg mb-1">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-stone-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-stone-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                Awards & Recognition
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg"
                >
                  <Star className="h-6 w-6 text-amber-600 flex-shrink-0" />
                  <span className="text-stone-800">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notable Venues */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Notable Venues
              </h2>
              <p className="text-stone-300">
                A selection of prestigious venues where I&apos;ve had the honor to
                perform
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {venues.map((venue, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-amber-300">{venue}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Music2 className="h-12 w-12 text-amber-600 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              My Philosophy
            </h2>
            <blockquote className="text-2xl text-stone-600 font-serif italic leading-relaxed mb-8">
              &quot;Music has the power to transform ordinary moments into
              extraordinary memories. My goal is not just to perform, but to
              create an experience that resonates in the hearts of everyone
              present—an experience that will be cherished for a lifetime.&quot;
            </blockquote>
            <p className="text-stone-500">— Victoria</p>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
