"use client";

import { Clock, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { GiftProduct } from "@/lib/subscriptions";

interface GiftProductCardProps {
  product: GiftProduct;
  onSelect?: (product: GiftProduct) => void;
  selected?: boolean;
}

export function GiftProductCard({
  product,
  onSelect,
  selected,
}: GiftProductCardProps) {
  return (
    <Card
      className={cn(
        "relative h-full transition-all",
        product.popular && "border-amber-500",
        selected && "ring-2 ring-amber-500",
        onSelect && "cursor-pointer hover:shadow-lg"
      )}
      onClick={() => onSelect?.(product)}
    >
      {product.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-amber-500">
            <Star className="h-3 w-3 mr-1" />
            Popular Choice
          </Badge>
        </div>
      )}

      <CardContent className={cn("p-6 space-y-4", product.popular && "pt-8")}>
        {/* Title & Price */}
        <div>
          <h3 className="text-xl font-semibold text-stone-900 mb-1">
            {product.name}
          </h3>
          <p className="text-stone-500 text-sm">{product.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-stone-900">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-stone-600">
            <Clock className="h-4 w-4" />
            <span>{product.deliveryDays} day delivery</span>
          </div>
          {product.rushDeliveryDays && (
            <div className="flex items-center gap-1 text-amber-600">
              <Zap className="h-4 w-4" />
              <span>Rush: {product.rushDeliveryDays} day (+{formatCurrency(product.rushPrice || 0)})</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 pt-2 border-t border-stone-100">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-amber-600 mt-1">•</span>
              <span className="text-stone-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          className={cn(
            "w-full mt-4",
            product.popular
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-stone-900 hover:bg-stone-800"
          )}
        >
          {selected ? "Selected" : "Order Now"}
        </Button>
      </CardContent>
    </Card>
  );
}
