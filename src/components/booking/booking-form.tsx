"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Building2,
  PartyPopper,
  Video,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  CreditCard,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { BookingCalendar, MiniCalendar } from "./booking-calendar";
import { PackageSelector } from "./package-selector";
import { PricingSummary } from "./pricing-summary";
import { calculatePricing, ADD_ONS } from "@/lib/pricing";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";
import { mockPackages, getBookedDates } from "@/lib/db";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Event Type", icon: Heart },
  { id: 2, title: "Date & Time", icon: Calendar },
  { id: 3, title: "Details", icon: MapPin },
  { id: 4, title: "Package", icon: FileText },
  { id: 5, title: "Contact", icon: Users },
  { id: 6, title: "Payment", icon: CreditCard },
];

const EVENT_TYPES = [
  {
    id: "wedding",
    name: "Wedding",
    icon: Heart,
    description: "Ceremony, cocktail hour, reception",
    color: "bg-rose-50 text-rose-600 border-rose-200",
  },
  {
    id: "corporate",
    name: "Corporate Event",
    icon: Building2,
    description: "Galas, conferences, dinners",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    id: "private",
    name: "Private Event",
    icon: PartyPopper,
    description: "Parties, anniversaries, celebrations",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    id: "virtual",
    name: "Virtual Performance",
    icon: Video,
    description: "Live-streamed concerts",
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
];

const TIME_OPTIONS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "20:00", label: "8:00 PM" },
];

interface BookingFormData {
  eventType: string;
  date: Date | null;
  startTime: string;
  duration: number;
  venueName: string;
  venueAddress: string;
  guestCount: number;
  specialRequests: string;
  packageId: string;
  addOns: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    eventType: "",
    date: null,
    startTime: "",
    duration: 120,
    venueName: "",
    venueAddress: "",
    guestCount: 100,
    specialRequests: "",
    packageId: "",
    addOns: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const bookedDates = getBookedDates();

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goToNextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedPackage = formData.eventType
    ? mockPackages[formData.eventType as keyof typeof mockPackages]?.find(
        (p) => p.id === formData.packageId
      )
    : null;

  const pricing = formData.eventType && formData.date
    ? calculatePricing({
        eventType: formData.eventType,
        duration: selectedPackage?.duration || formData.duration,
        date: formData.date,
        addOns: formData.addOns,
      })
    : null;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.eventType;
      case 2:
        return !!formData.date && !!formData.startTime;
      case 3:
        return !!formData.venueName;
      case 4:
        return !!formData.packageId;
      case 5:
        return (
          !!formData.firstName &&
          !!formData.lastName &&
          !!formData.email &&
          !!formData.phone
        );
      default:
        return true;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                index < STEPS.length - 1 && "flex-1"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep === step.id &&
                    "border-amber-600 bg-amber-600 text-white",
                  currentStep > step.id &&
                    "border-green-500 bg-green-500 text-white",
                  currentStep < step.id && "border-stone-300 text-stone-400"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium hidden sm:block",
                  currentStep >= step.id ? "text-stone-900" : "text-stone-400"
                )}
              >
                {step.title}
              </span>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4",
                    currentStep > step.id ? "bg-green-500" : "bg-stone-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card variant="bordered">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Event Type */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    What type of event are you planning?
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Select the event type to see tailored packages and pricing.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {EVENT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateFormData({ eventType: type.id, packageId: "" })}
                        className={cn(
                          "p-6 rounded-xl border-2 text-left transition-all",
                          formData.eventType === type.id
                            ? "border-amber-600 bg-amber-50"
                            : "border-stone-200 hover:border-stone-300"
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                            type.color
                          )}
                        >
                          <type.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-stone-900 mb-1">
                          {type.name}
                        </h3>
                        <p className="text-stone-500 text-sm">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    When is your event?
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Select your preferred date and start time.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <BookingCalendar
                        selectedDate={formData.date}
                        onDateSelect={(date) => updateFormData({ date })}
                        bookedDates={bookedDates}
                      />
                    </div>

                    <div className="space-y-6">
                      {formData.date && (
                        <>
                          <MiniCalendar date={formData.date} />

                          <Select
                            label="Start Time"
                            options={TIME_OPTIONS}
                            value={formData.startTime}
                            onChange={(value) => updateFormData({ startTime: value })}
                            placeholder="Select a time"
                          />

                          <div className="bg-amber-50 rounded-lg p-4">
                            <h4 className="font-medium text-stone-900 mb-2">
                              Important Note
                            </h4>
                            <p className="text-sm text-stone-600">
                              A 50% deposit is required to secure your date.
                              Dates are only held for 48 hours after inquiry.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Event Details */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    Tell us about your venue
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Provide details about where your event will take place.
                  </p>

                  <div className="space-y-6 max-w-xl">
                    <Input
                      label="Venue Name"
                      placeholder="e.g., The Grand Ballroom"
                      value={formData.venueName}
                      onChange={(e) => updateFormData({ venueName: e.target.value })}
                    />

                    <Input
                      label="Venue Address"
                      placeholder="123 Main Street, City, State"
                      value={formData.venueAddress}
                      onChange={(e) => updateFormData({ venueAddress: e.target.value })}
                    />

                    <Input
                      label="Estimated Guest Count"
                      type="number"
                      min={1}
                      value={formData.guestCount}
                      onChange={(e) =>
                        updateFormData({ guestCount: parseInt(e.target.value) || 0 })
                      }
                    />

                    <Textarea
                      label="Special Requests or Notes"
                      placeholder="Any specific songs, timing requirements, or special considerations..."
                      rows={4}
                      value={formData.specialRequests}
                      onChange={(e) =>
                        updateFormData({ specialRequests: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Package Selection */}
              {currentStep === 4 && formData.eventType && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    Choose your package
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Select a package that fits your event needs, or customize with add-ons.
                  </p>

                  <PackageSelector
                    eventType={formData.eventType}
                    packages={mockPackages[formData.eventType as keyof typeof mockPackages]}
                    selectedPackageId={formData.packageId}
                    onPackageSelect={(id) => updateFormData({ packageId: id })}
                    selectedAddOns={formData.addOns}
                    onAddOnsChange={(addOns) => updateFormData({ addOns })}
                  />
                </div>
              )}

              {/* Step 5: Contact Information */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    Your contact information
                  </h2>
                  <p className="text-stone-600 mb-8">
                    We&apos;ll use this to send your booking confirmation and updates.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <Input
                      label="First Name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData({ firstName: e.target.value })}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => updateFormData({ lastName: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Payment & Confirmation */}
              {currentStep === 6 && pricing && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    Review & Payment
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Review your booking details and pay the deposit to secure your date.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Booking Summary */}
                    <div className="space-y-6">
                      <div className="bg-stone-50 rounded-xl p-6">
                        <h3 className="font-semibold text-stone-900 mb-4">
                          Booking Summary
                        </h3>
                        <dl className="space-y-3">
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Event Type</dt>
                            <dd className="font-medium text-stone-900">
                              {EVENT_TYPES.find((t) => t.id === formData.eventType)?.name}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Date</dt>
                            <dd className="font-medium text-stone-900">
                              {formData.date && formatDate(formData.date)}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Time</dt>
                            <dd className="font-medium text-stone-900">
                              {formData.startTime}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Package</dt>
                            <dd className="font-medium text-stone-900">
                              {selectedPackage?.name}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Duration</dt>
                            <dd className="font-medium text-stone-900">
                              {getDurationLabel(selectedPackage?.duration || formData.duration)}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Venue</dt>
                            <dd className="font-medium text-stone-900">
                              {formData.venueName}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="bg-stone-50 rounded-xl p-6">
                        <h3 className="font-semibold text-stone-900 mb-4">
                          Contact Details
                        </h3>
                        <dl className="space-y-3">
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Name</dt>
                            <dd className="font-medium text-stone-900">
                              {formData.firstName} {formData.lastName}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Email</dt>
                            <dd className="font-medium text-stone-900">
                              {formData.email}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-600">Phone</dt>
                            <dd className="font-medium text-stone-900">
                              {formData.phone}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Pricing Summary */}
                    <PricingSummary pricing={pricing} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-stone-200">
            <Button
              variant="ghost"
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>

            {currentStep < STEPS.length ? (
              <Button onClick={goToNextStep} disabled={!canProceed()}>
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            ) : (
              <Button disabled={!canProceed()}>
                <CreditCard className="h-5 w-5 mr-2" />
                Pay Deposit ({pricing && formatCurrency(pricing.depositAmount)})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
