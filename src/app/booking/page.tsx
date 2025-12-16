import type { Metadata } from "next";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { BookingForm } from "@/components/booking/booking-form";

export const metadata: Metadata = {
  title: "Book Your Event",
  description:
    "Book Victoria Strings for your wedding, corporate event, or private celebration. Check availability and get an instant quote.",
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-16 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
              Book Your Event
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Select your event type, choose a date, and customize your package.
              A 50% deposit secures your booking.
            </p>
          </div>

          <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
