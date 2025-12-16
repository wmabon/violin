import type { Metadata } from "next";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your event. Schedule a consultation or request a custom quote for your wedding, corporate event, or private celebration.",
};

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "private", label: "Private Event" },
  { value: "virtual", label: "Virtual Performance" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-16">
        {/* Hero Section */}
        <section className="bg-stone-900 text-white py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
              Let&apos;s Create Something Beautiful
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              Whether you&apos;re planning a grand celebration or an intimate
              gathering, I&apos;d love to hear about your vision.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card variant="bordered">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
                    Send a Message
                  </h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        placeholder="Your first name"
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Your last name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <Select
                      label="Event Type"
                      options={eventTypes}
                      placeholder="Select event type"
                    />

                    <Input
                      label="Event Date (if known)"
                      type="date"
                    />

                    <Textarea
                      label="Tell me about your event"
                      placeholder="Share details about your event, including venue, number of guests, and any special requests or questions..."
                      rows={6}
                      required
                    />

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="newsletter" className="text-stone-600 text-sm">
                        Subscribe to receive event tips and special offers
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <Card variant="bordered">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-stone-900 mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:hello@victoriastrings.com"
                      className="flex items-center gap-3 text-stone-600 hover:text-amber-700 transition-colors"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Email</div>
                        <div className="font-medium text-stone-900">
                          hello@victoriastrings.com
                        </div>
                      </div>
                    </a>

                    <a
                      href="tel:+15551234567"
                      className="flex items-center gap-3 text-stone-600 hover:text-amber-700 transition-colors"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Phone</div>
                        <div className="font-medium text-stone-900">
                          (555) 123-4567
                        </div>
                      </div>
                    </a>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Service Area</div>
                        <div className="font-medium text-stone-900">
                          New York City & Tri-State Area
                        </div>
                        <div className="text-sm text-stone-500">
                          Travel available upon request
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card variant="bordered">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-900">
                      Quick Response
                    </h3>
                  </div>
                  <p className="text-stone-600 text-sm">
                    I typically respond to inquiries within 24 hours. For urgent
                    requests, please call directly.
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card variant="bordered">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-stone-900 mb-4">
                    Follow Along
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-amber-100 transition-colors"
                    >
                      <Instagram className="h-6 w-6 text-stone-700" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-amber-100 transition-colors"
                    >
                      <Facebook className="h-6 w-6 text-stone-700" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-amber-100 transition-colors"
                    >
                      <Youtube className="h-6 w-6 text-stone-700" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Preview */}
              <Card variant="bordered" className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-stone-900 mb-3">
                    Common Questions
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li>• How far in advance should I book?</li>
                    <li>• What is your cancellation policy?</li>
                    <li>• Do you travel outside the tri-state area?</li>
                    <li>• Can you learn a specific song?</li>
                  </ul>
                  <Button variant="link" className="mt-4 p-0">
                    View all FAQs →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
