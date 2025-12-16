import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VB-${timestamp}-${random}`;
}

export function calculateDeposit(total: number, percentage: number = 0.5): number {
  return Math.round(total * percentage * 100) / 100;
}

export function calculateTravelFee(distance: number): number {
  // Free up to 25 miles, then $2/mile
  if (distance <= 25) return 0;
  return (distance - 25) * 2;
}

export function getDurationLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} minutes`;
  if (mins === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return `${hours} hour${hours > 1 ? "s" : ""} ${mins} min`;
}

export const EVENT_TYPES = {
  wedding: {
    name: "Wedding",
    slug: "wedding",
    description: "Elegant live violin music for your special day",
    basePrice: 1500,
    minDuration: 60,
    maxDuration: 480,
  },
  corporate: {
    name: "Corporate Event",
    slug: "corporate",
    description: "Sophisticated entertainment for corporate gatherings",
    basePrice: 800,
    minDuration: 60,
    maxDuration: 240,
  },
  private: {
    name: "Private Event",
    slug: "private",
    description: "Personalized performances for intimate celebrations",
    basePrice: 500,
    minDuration: 30,
    maxDuration: 180,
  },
  virtual: {
    name: "Virtual Performance",
    slug: "virtual",
    description: "Live-streamed performances from anywhere",
    basePrice: 300,
    minDuration: 15,
    maxDuration: 60,
  },
} as const;

export const GENRES = [
  "Classical",
  "Contemporary",
  "Pop",
  "Wedding",
  "Jazz",
  "Film Scores",
  "Broadway",
  "Holiday",
] as const;
