import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  FileText,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your booking has been confirmed. We look forward to making your event special!",
};

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { booking_id?: string };
}) {
  const bookingId = searchParams.booking_id || "VB-XXXXX";

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 bg-stone-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="bordered" className="text-center">
            <CardContent className="p-8">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              {/* Confirmation Message */}
              <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-stone-600 mb-2">
                Thank you for your deposit. Your date is now secured.
              </p>
              <p className="text-stone-500 mb-8">
                Booking Reference: <span className="font-mono font-semibold">{bookingId}</span>
              </p>

              {/* What's Next */}
              <div className="bg-amber-50 rounded-xl p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  What Happens Next?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-800 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">
                        Confirmation Email
                      </div>
                      <div className="text-sm text-stone-600">
                        You&apos;ll receive an email with your booking details and
                        receipt within a few minutes.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-800 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">
                        Planning Consultation
                      </div>
                      <div className="text-sm text-stone-600">
                        I&apos;ll reach out within 48 hours to discuss your event
                        details and song preferences.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-800 font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">
                        Client Portal Access
                      </div>
                      <div className="text-sm text-stone-600">
                        Log in to your client portal to manage song requests,
                        upload details, and message me directly.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-800 font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">
                        Balance Payment
                      </div>
                      <div className="text-sm text-stone-600">
                        The remaining balance is due 2 weeks before your event.
                        You&apos;ll receive a reminder.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Link href="/client">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-5 w-5 mr-2" />
                    Client Portal
                  </Button>
                </Link>
                <Link href="/repertoire">
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-5 w-5 mr-2" />
                    Browse Repertoire
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="border-t border-stone-200 pt-6">
                <p className="text-stone-600 mb-4">
                  Questions? I&apos;m here to help!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                  <a
                    href="mailto:hello@victoriastrings.com"
                    className="flex items-center justify-center gap-2 text-amber-700 hover:text-amber-800"
                  >
                    <Mail className="h-4 w-4" />
                    hello@victoriastrings.com
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center justify-center gap-2 text-amber-700 hover:text-amber-800"
                  >
                    <Phone className="h-4 w-4" />
                    (555) 123-4567
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="ghost">
                Back to Home
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
