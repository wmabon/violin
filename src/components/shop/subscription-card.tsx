"use client";

import { Check, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { SubscriptionPlan } from "@/lib/subscriptions";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  billingCycle?: "monthly" | "annual";
  onSelect?: (plan: SubscriptionPlan) => void;
  selected?: boolean;
}

export function SubscriptionCard({
  plan,
  billingCycle = "monthly",
  onSelect,
  selected,
}: SubscriptionCardProps) {
  const isAnnual = billingCycle === "annual";
  const price = isAnnual && plan.annualPrice ? plan.annualPrice : plan.price;
  const isAnnualOnly = plan.type === "anniversary";

  return (
    <Card
      className={cn(
        "relative h-full transition-all",
        plan.highlighted && "border-amber-500 shadow-lg",
        selected && "ring-2 ring-amber-500",
        onSelect && "cursor-pointer hover:shadow-lg"
      )}
      onClick={() => onSelect?.(plan)}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-amber-500">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className={cn(plan.highlighted && "pt-8")}>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <p className="text-stone-500 text-sm">{plan.description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-stone-900">
              {formatCurrency(price)}
            </span>
            <span className="text-stone-500">
              /{isAnnualOnly ? "year" : isAnnual ? "year" : "month"}
            </span>
          </div>
          {!isAnnualOnly && isAnnual && plan.annualSavings && (
            <p className="text-sm text-green-600 mt-1">{plan.annualSavings}</p>
          )}
          {!isAnnualOnly && !isAnnual && plan.annualPrice && (
            <p className="text-sm text-stone-500 mt-1">
              or {formatCurrency(plan.annualPrice)}/year (save {plan.annualSavings})
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-stone-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          className={cn(
            "w-full",
            plan.highlighted
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-stone-900 hover:bg-stone-800"
          )}
        >
          {selected ? "Selected" : "Get Started"}
        </Button>
      </CardContent>
    </Card>
  );
}
