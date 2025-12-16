// Subscription & Gift Revenue System Configuration

// ============================================
// SUBSCRIPTION PLANS
// ============================================

export interface SubscriptionPlan {
  id: string;
  type: "learning" | "recording_club" | "anniversary" | "hold_music";
  tier: string;
  name: string;
  description: string;
  price: number; // Monthly price
  annualPrice?: number;
  annualSavings?: string; // e.g., "15% off"
  features: string[];
  highlighted?: boolean;
  maxUsers?: number;
}

// Learning Subscription: "Violin Mastery"
export const LEARNING_PLANS: SubscriptionPlan[] = [
  {
    id: "learning-foundation",
    type: "learning",
    tier: "foundation",
    name: "Foundation",
    description: "Full video library access for self-paced learning",
    price: 29,
    annualPrice: 295,
    annualSavings: "15% off",
    features: [
      "Full video library access (100+ lessons)",
      "Practice guides & exercises",
      "Downloadable sheet music",
      "Progress tracking",
      "Mobile app access",
    ],
  },
  {
    id: "learning-professional",
    type: "learning",
    tier: "professional",
    name: "Professional",
    description: "Interactive learning with community support",
    price: 79,
    annualPrice: 805,
    annualSavings: "15% off",
    highlighted: true,
    features: [
      "Everything in Foundation",
      "Monthly group Q&A session (live)",
      "Community forum access",
      "Personalized practice plans",
      "Certificate of completion",
      "Priority support",
    ],
  },
  {
    id: "learning-elite",
    type: "learning",
    tier: "elite",
    name: "Elite",
    description: "Premium instruction with personal coaching",
    price: 199,
    annualPrice: 2030,
    annualSavings: "15% off",
    features: [
      "Everything in Professional",
      "One 30-min private lesson monthly",
      "Personalized feedback on recordings",
      "Custom repertoire recommendations",
      "Direct messaging with instructor",
      "Early access to new content",
    ],
  },
];

// Recording Club: "Strings Attached"
export const RECORDING_CLUB_PLANS: SubscriptionPlan[] = [
  {
    id: "recording-monthly",
    type: "recording_club",
    tier: "monthly",
    name: "Monthly",
    description: "Exclusive monthly recordings delivered to your inbox",
    price: 19,
    features: [
      "2 exclusive recordings per month",
      "Behind-the-scenes content",
      "High-quality audio (MP3 + WAV)",
      "Liner notes & song stories",
      "Early access to new releases",
    ],
  },
  {
    id: "recording-annual",
    type: "recording_club",
    tier: "annual",
    name: "Annual",
    description: "Best value with exclusive annual bonuses",
    price: 15, // $180/year = $15/month
    annualPrice: 180,
    annualSavings: "Save $48",
    highlighted: true,
    features: [
      "Everything in Monthly plan",
      "Bonus holiday album",
      "Subscriber-only live stream",
      "Exclusive behind-the-scenes documentary",
      "Physical welcome package",
    ],
  },
];

// Anniversary Program
export const ANNIVERSARY_PLANS: SubscriptionPlan[] = [
  {
    id: "anniversary-memory",
    type: "anniversary",
    tier: "memory",
    name: "Memory",
    description: "Keep your wedding day music alive",
    price: 99, // Annual
    features: [
      'Digital recording of "your song"',
      "Personalized video greeting",
      "Anniversary reminder emails",
      "10% rebooking discount",
    ],
  },
  {
    id: "anniversary-milestone",
    type: "anniversary",
    tier: "milestone",
    name: "Milestone",
    description: "Celebrate special anniversary milestones",
    price: 199, // Annual
    highlighted: true,
    features: [
      "Everything in Memory",
      "Physical USB keepsake",
      "Handwritten anniversary card",
      "15% rebooking discount",
      "Priority booking for events",
    ],
  },
  {
    id: "anniversary-legacy",
    type: "anniversary",
    tier: "legacy",
    name: "Legacy",
    description: "The ultimate anniversary experience",
    price: 349, // Annual
    features: [
      "Everything in Milestone",
      "15-min live virtual serenade",
      "Anniversary party priority booking",
      "20% rebooking discount",
      "Personalized song arrangement",
    ],
  },
];

// Corporate Hold Music
export const HOLD_MUSIC_PLANS: SubscriptionPlan[] = [
  {
    id: "hold-small",
    type: "hold_music",
    tier: "small",
    name: "Small Business",
    description: "Perfect for small offices",
    price: 49,
    maxUsers: 50,
    features: [
      "1-50 employees",
      "Single location",
      "Phone system only",
      "60+ minutes of music",
      "Quarterly new tracks",
    ],
  },
  {
    id: "hold-professional",
    type: "hold_music",
    tier: "professional",
    name: "Professional",
    description: "Multi-location businesses",
    price: 99,
    maxUsers: 200,
    highlighted: true,
    features: [
      "51-200 employees",
      "Multiple locations",
      "Phone + lobby music",
      "60+ minutes of music",
      "Quarterly new tracks",
      "10% live performance discount",
    ],
  },
  {
    id: "hold-enterprise",
    type: "hold_music",
    tier: "enterprise",
    name: "Enterprise",
    description: "Large organizations",
    price: 199,
    features: [
      "200+ employees",
      "Unlimited locations",
      "All internal use",
      "Custom branding available",
      "Priority support",
      "15% live performance discount",
    ],
  },
];

// ============================================
// GIFT PRODUCTS
// ============================================

export interface GiftProduct {
  id: string;
  type: "custom_arrangement" | "dedication_video" | "virtual_serenade" | "concert_box";
  tier: string;
  name: string;
  description: string;
  price: number;
  rushPrice?: number;
  deliveryDays: number;
  rushDeliveryDays?: number;
  features: string[];
  popular?: boolean;
}

// Custom Song Arrangement + Recording
export const CUSTOM_ARRANGEMENT_PRODUCTS: GiftProduct[] = [
  {
    id: "arrangement-digital",
    type: "custom_arrangement",
    tier: "digital",
    name: "Digital",
    description: "Custom arrangement with high-quality recording",
    price: 175,
    rushPrice: 87.50, // +50%
    deliveryDays: 14,
    rushDeliveryDays: 2,
    features: [
      "Custom arrangement of any song",
      "Professional studio recording",
      "MP3 + WAV formats",
      "Unlimited personal use license",
    ],
  },
  {
    id: "arrangement-keepsake",
    type: "custom_arrangement",
    tier: "keepsake",
    name: "Keepsake",
    description: "Beautiful physical package for gifting",
    price: 295,
    rushPrice: 147.50,
    deliveryDays: 14,
    rushDeliveryDays: 3,
    popular: true,
    features: [
      "Everything in Digital",
      "Engraved USB drive",
      "Printed sheet music",
      "Certificate of authenticity",
      "Premium gift packaging",
    ],
  },
  {
    id: "arrangement-video",
    type: "custom_arrangement",
    tier: "video",
    name: "Video Performance",
    description: "Professionally filmed performance video",
    price: 450,
    rushPrice: 225,
    deliveryDays: 14,
    rushDeliveryDays: 4,
    features: [
      "Everything in Keepsake",
      "Professional video performance (3-5 min)",
      "Multiple camera angles",
      "Edited with titles & transitions",
      "4K resolution",
    ],
  },
  {
    id: "arrangement-ultimate",
    type: "custom_arrangement",
    tier: "ultimate",
    name: "Ultimate",
    description: "The complete custom music experience",
    price: 750,
    rushPrice: 375,
    deliveryDays: 21,
    rushDeliveryDays: 7,
    features: [
      "Everything in Video Performance",
      "Framed art print",
      "Behind-the-scenes video",
      "Dedicated website page",
      "Social media feature",
    ],
  },
];

// Dedication Video Performances
export const DEDICATION_VIDEO_PRODUCTS: GiftProduct[] = [
  {
    id: "dedication-standard",
    type: "dedication_video",
    tier: "standard",
    name: "Standard",
    description: "Heartfelt video dedication",
    price: 85,
    rushPrice: 50,
    deliveryDays: 3,
    rushDeliveryDays: 1,
    features: [
      "2-3 minute video",
      "One song performance",
      "Personal spoken message",
      "HD quality",
    ],
  },
  {
    id: "dedication-premium",
    type: "dedication_video",
    tier: "premium",
    name: "Premium",
    description: "Extended dedication with more music",
    price: 150,
    rushPrice: 50,
    deliveryDays: 2,
    rushDeliveryDays: 1,
    popular: true,
    features: [
      "4-5 minute video",
      "Two song performances",
      "Extended personal message",
      "HD quality",
      "Custom background option",
    ],
  },
];

// Virtual Serenades
export const VIRTUAL_SERENADE_PRODUCTS: GiftProduct[] = [
  {
    id: "serenade-10",
    type: "virtual_serenade",
    tier: "10min",
    name: "10 Minutes",
    description: "Quick surprise serenade",
    price: 199,
    deliveryDays: 0, // Live event
    features: [
      "2-3 songs",
      "Personal greeting",
      "Surprise coordination support",
      "Zoom or Google Meet",
    ],
  },
  {
    id: "serenade-20",
    type: "virtual_serenade",
    tier: "20min",
    name: "20 Minutes",
    description: "Extended celebration",
    price: 349,
    deliveryDays: 0,
    popular: true,
    features: [
      "4-5 songs",
      "Extended interaction time",
      "Recorded video of performance",
      "Surprise coordination support",
      "Zoom or Google Meet",
    ],
  },
  {
    id: "serenade-30",
    type: "virtual_serenade",
    tier: "30min",
    name: "30 Minutes",
    description: "Full mini-concert experience",
    price: 499,
    deliveryDays: 0,
    features: [
      "Full mini-concert",
      "Q&A time with performer",
      "HD recording",
      "Digital photo package",
      "Surprise coordination support",
      "Zoom or Google Meet",
    ],
  },
];

// Concert in a Box
export const CONCERT_BOX_PRODUCTS: GiftProduct[] = [
  {
    id: "concert-standard",
    type: "concert_box",
    tier: "standard",
    name: "Standard",
    description: "At-home concert experience",
    price: 129,
    deliveryDays: 7,
    features: [
      "USB with 60+ min of recordings",
      "Printed program with liner notes",
      "Handwritten thank-you note",
      "Wine & cheese pairing guide",
      "Ambiance setup guide",
      "10% live booking discount",
    ],
  },
  {
    id: "concert-premium",
    type: "concert_box",
    tier: "premium",
    name: "Premium",
    description: "Enhanced concert experience",
    price: 179,
    deliveryDays: 7,
    popular: true,
    features: [
      "Everything in Standard",
      "Framed 8x10 performance photo",
      "Premium packaging",
      "Exclusive bonus tracks",
    ],
  },
  {
    id: "concert-luxury",
    type: "concert_box",
    tier: "luxury",
    name: "Luxury",
    description: "Ultimate at-home experience",
    price: 279,
    deliveryDays: 10,
    features: [
      "Everything in Premium",
      "15-min virtual meet & greet",
      "Signed certificate",
      "Custom message recording",
    ],
  },
];

// ============================================
// SHEET MUSIC
// ============================================

export interface SheetMusicItem {
  id: string;
  title: string;
  artist?: string;
  category: "wedding" | "pop" | "film" | "holiday" | "classical";
  price: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  duration?: string;
  featured?: boolean;
}

export const SHEET_MUSIC_CATEGORIES = [
  { id: "wedding", name: "Wedding Standards", priceRange: "$15-25" },
  { id: "pop", name: "Pop/Contemporary", priceRange: "$20-35" },
  { id: "film", name: "Film/TV Themes", priceRange: "$25-40" },
  { id: "holiday", name: "Holiday Collections", priceRange: "$45-75" },
  { id: "classical", name: "Classical", priceRange: "$15-30" },
];

export const SHEET_MUSIC_BUNDLES = [
  {
    id: "bundle-wedding-complete",
    name: "Complete Wedding Package",
    description: "25+ arrangements covering ceremony, cocktail, and reception",
    category: "wedding",
    price: 149,
    originalValue: 425,
    itemCount: 25,
  },
  {
    id: "bundle-holiday",
    name: "Holiday Collection",
    description: "15 arrangements for the holiday season",
    category: "holiday",
    price: 75,
    originalValue: 200,
    itemCount: 15,
  },
  {
    id: "bundle-film-favorites",
    name: "Film Favorites",
    description: "10 iconic movie theme arrangements",
    category: "film",
    price: 59,
    originalValue: 150,
    itemCount: 10,
  },
];

// Sample sheet music catalog
export const SAMPLE_SHEET_MUSIC: SheetMusicItem[] = [
  { id: "sm-1", title: "Canon in D", artist: "Pachelbel", category: "wedding", price: 15, difficulty: "intermediate", duration: "4:30", featured: true },
  { id: "sm-2", title: "A Thousand Years", artist: "Christina Perri", category: "wedding", price: 20, difficulty: "intermediate", duration: "4:45", featured: true },
  { id: "sm-3", title: "Wedding March", artist: "Mendelssohn", category: "wedding", price: 15, difficulty: "intermediate", duration: "3:00" },
  { id: "sm-4", title: "Perfect", artist: "Ed Sheeran", category: "pop", price: 25, difficulty: "intermediate", duration: "4:20", featured: true },
  { id: "sm-5", title: "All of Me", artist: "John Legend", category: "pop", price: 25, difficulty: "intermediate", duration: "4:30" },
  { id: "sm-6", title: "Thinking Out Loud", artist: "Ed Sheeran", category: "pop", price: 25, difficulty: "intermediate", duration: "4:40" },
  { id: "sm-7", title: "Game of Thrones Theme", category: "film", price: 30, difficulty: "advanced", duration: "3:30" },
  { id: "sm-8", title: "Jurassic Park Theme", artist: "John Williams", category: "film", price: 35, difficulty: "advanced", duration: "5:00" },
  { id: "sm-9", title: "The Godfather Theme", category: "film", price: 30, difficulty: "intermediate", duration: "3:15" },
  { id: "sm-10", title: "O Holy Night", category: "holiday", price: 18, difficulty: "intermediate", duration: "4:00" },
];

// ============================================
// GIFT CARDS
// ============================================

export const GIFT_CARD_AMOUNTS = [50, 100, 250, 500, 1000];

export interface GiftCardOption {
  amount: number;
  description: string;
}

export const GIFT_CARD_OPTIONS: GiftCardOption[] = [
  { amount: 50, description: "Perfect for dedication videos or sheet music" },
  { amount: 100, description: "Great for virtual serenades or custom recordings" },
  { amount: 250, description: "Covers most gift products or lesson packages" },
  { amount: 500, description: "Luxury gift, applicable toward live bookings" },
  { amount: 1000, description: "Premium tier for corporate gifting" },
];

// ============================================
// OCCASION CATEGORIES
// ============================================

export const OCCASIONS = [
  { id: "birthday", name: "Birthday", icon: "cake" },
  { id: "anniversary", name: "Anniversary", icon: "heart" },
  { id: "wedding", name: "Wedding", icon: "rings" },
  { id: "graduation", name: "Graduation", icon: "graduation-cap" },
  { id: "valentines", name: "Valentine's Day", icon: "heart" },
  { id: "mothers-day", name: "Mother's Day", icon: "flower" },
  { id: "fathers-day", name: "Father's Day", icon: "medal" },
  { id: "sympathy", name: "Sympathy", icon: "dove" },
  { id: "get-well", name: "Get Well", icon: "bandage" },
  { id: "thank-you", name: "Thank You", icon: "gift" },
  { id: "retirement", name: "Retirement", icon: "sun" },
  { id: "corporate", name: "Corporate", icon: "briefcase" },
  { id: "holiday", name: "Holiday", icon: "snowflake" },
  { id: "just-because", name: "Just Because", icon: "sparkles" },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "VS-";
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += "-";
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `GO-${dateStr}-${random}`;
}

export function calculateRushFee(basePrice: number): number {
  return Math.round(basePrice * 0.5);
}

export function getDueDate(deliveryDays: number, isRush: boolean, rushDays?: number): Date {
  const days = isRush && rushDays ? rushDays : deliveryDays;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
