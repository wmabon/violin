"use client";

import { Shield, Clock, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { PricingBreakdown } from "@/lib/pricing";

interface PricingSummaryProps {
  pricing: PricingBreakdown;
}

export function PricingSummary({ pricing }: PricingSummaryProps) {
  return (
    <Card variant="bordered" className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-stone-900 mb-6">
          Price Breakdown
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-600">Base Price</span>
            <span className="font-medium text-stone-900">
              {formatCurrency(pricing.basePrice)}
            </span>
          </div>

          {pricing.durationPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-stone-600">Extended Duration</span>
              <span className="font-medium text-stone-900">
                +{formatCurrency(pricing.durationPrice)}
              </span>
            </div>
          )}

          {pricing.peakDateSurcharge > 0 && (
            <div className="flex justify-between">
              <span className="text-stone-600">Peak Date Surcharge</span>
              <span className="font-medium text-stone-900">
                +{formatCurrency(pricing.peakDateSurcharge)}
              </span>
            </div>
          )}

          {pricing.travelFee > 0 && (
            <div className="flex justify-between">
              <span className="text-stone-600">Travel Fee</span>
              <span className="font-medium text-stone-900">
                +{formatCurrency(pricing.travelFee)}
              </span>
            </div>
          )}

          {pricing.addOnDetails.map((addOn, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-stone-600">{addOn.name}</span>
              <span className="font-medium text-stone-900">
                +{formatCurrency(addOn.price)}
              </span>
            </div>
          ))}

          <div className="border-t border-stone-200 pt-3 mt-3">
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-stone-900">Total</span>
              <span className="font-bold text-amber-700">
                {formatCurrency(pricing.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Deposit Info */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-amber-700" />
            <span className="font-semibold text-stone-900">
              Deposit Due Today
            </span>
          </div>
          <div className="text-2xl font-bold text-amber-700 mb-1">
            {formatCurrency(pricing.depositAmount)}
          </div>
          <p className="text-sm text-stone-600">
            {Math.round(pricing.depositPercent * 100)}% of total to secure your
            date
          </p>
        </div>

        {/* Balance Info */}
        <div className="mt-4 p-4 bg-stone-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-stone-500" />
            <span className="font-medium text-stone-900">Balance Due</span>
          </div>
          <div className="text-xl font-semibold text-stone-700">
            {formatCurrency(pricing.total - pricing.depositAmount)}
          </div>
          <p className="text-sm text-stone-600">
            Due 2 weeks before your event
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-stone-600">
            <Shield className="h-5 w-5 text-green-600" />
            <span>Secure payment via Stripe</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-600">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span>All major credit cards accepted</span>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-6 pt-4 border-t border-stone-200">
          <h4 className="font-medium text-stone-900 mb-2 text-sm">
            Cancellation Policy
          </h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            Full refund if cancelled 30+ days before event. 50% refund if
            cancelled 14-30 days before. No refund within 14 days of event.
            Rescheduling available with advance notice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
