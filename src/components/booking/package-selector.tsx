"use client";

import { Check, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, getDurationLabel } from "@/lib/utils";
import { ADD_ONS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  isPopular?: boolean;
}

interface PackageSelectorProps {
  eventType: string;
  packages: Package[];
  selectedPackageId: string;
  onPackageSelect: (id: string) => void;
  selectedAddOns: string[];
  onAddOnsChange: (addOns: string[]) => void;
}

export function PackageSelector({
  eventType,
  packages,
  selectedPackageId,
  onPackageSelect,
  selectedAddOns,
  onAddOnsChange,
}: PackageSelectorProps) {
  const toggleAddOn = (addOnKey: string) => {
    if (selectedAddOns.includes(addOnKey)) {
      onAddOnsChange(selectedAddOns.filter((a) => a !== addOnKey));
    } else {
      onAddOnsChange([...selectedAddOns, addOnKey]);
    }
  };

  // Filter relevant add-ons based on event type
  const relevantAddOns = Object.entries(ADD_ONS).filter(([key]) => {
    if (eventType === "virtual") {
      return key === "custom_arrangement" || key === "song_learning";
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            variant="bordered"
            className={cn(
              "relative cursor-pointer transition-all",
              selectedPackageId === pkg.id
                ? "border-amber-600 ring-2 ring-amber-200"
                : "hover:border-stone-300"
            )}
            onClick={() => onPackageSelect(pkg.id)}
          >
            {pkg.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="warning" className="bg-amber-600 text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-stone-900 mb-1">
                  {pkg.name}
                </h3>
                <p className="text-stone-500 text-sm">{pkg.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-amber-700">
                  {formatCurrency(pkg.price)}
                </div>
                <div className="text-stone-500 text-sm">
                  {getDurationLabel(pkg.duration)}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={selectedPackageId === pkg.id ? "primary" : "outline"}
                className="w-full"
              >
                {selectedPackageId === pkg.id ? "Selected" : "Select Package"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-ons Section */}
      {selectedPackageId && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-stone-900 mb-4">
            Enhance Your Experience
          </h3>
          <p className="text-stone-600 mb-6">
            Customize your package with these optional add-ons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantAddOns.map(([key, addOn]) => (
              <button
                key={key}
                onClick={() => toggleAddOn(key)}
                className={cn(
                  "p-4 rounded-lg border-2 text-left transition-all",
                  selectedAddOns.includes(key)
                    ? "border-amber-600 bg-amber-50"
                    : "border-stone-200 hover:border-stone-300"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900">{addOn.name}</h4>
                    <p className="text-sm text-stone-500 mt-1">
                      {addOn.description}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className="font-semibold text-amber-700">
                      +{formatCurrency(addOn.price)}
                    </span>
                    <div
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                        selectedAddOns.includes(key)
                          ? "border-amber-600 bg-amber-600"
                          : "border-stone-300"
                      )}
                    >
                      {selectedAddOns.includes(key) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
