# Victoria Strings - Professional Violin Booking Platform

A comprehensive booking and revenue management platform for professional violinists, designed to streamline event bookings, manage travel logistics, and maximize revenue through intelligent pricing.

## Overview

This platform serves as the primary booking interface for a solo violinist operating from dual home bases (Nashville, TN and Baltimore, MD), targeting $50,000+ monthly revenue through premium event performances.

### Key Features

- **Multi-step Booking Flow** - Guided booking process for weddings, corporate events, private parties, and virtual performances
- **Dynamic Pricing Engine** - Intelligent pricing with seasonal multipliers, peak date surcharges, and customizable add-ons
- **Intelligent Travel System** - Automated travel cost calculation from dual home bases with flight/hotel estimates
- **Calendar Intelligence** - Smart scheduling with travel time blocking, conflict detection, and personal time protection
- **Subscription Revenue** - Recurring income from learning subscriptions, recording clubs, and corporate hold music
- **Gift Products Shop** - Custom arrangements, dedication videos, virtual serenades, and sheet music store
- **Admin Dashboard** - Comprehensive management of bookings, travel, subscriptions, and analytics
- **Client Portal** - Self-service access for clients to manage bookings and song requests
- **Stripe Integration** - Secure payment processing with 50% deposit system

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite
- **Payments**: Stripe
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd violin

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize the database
npx prisma generate
npx prisma db push

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL="file:./dev.db"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   │   ├── calendar/      # Availability checking
│   │   ├── checkout/      # Stripe checkout
│   │   ├── shop/          # Subscriptions, gifts, sheet music
│   │   ├── travel/        # Travel quote & clustering
│   │   └── webhook/       # Stripe webhooks
│   ├── booking/           # Client booking flow
│   ├── client/            # Client portal
│   └── shop/              # Store pages
│       ├── subscriptions/ # Subscription plans
│       ├── gift-cards/    # Gift card purchasing
│       └── sheet-music/   # Digital downloads
├── components/
│   ├── admin/             # Admin components
│   ├── booking/           # Booking flow components
│   ├── portfolio/         # Public site components
│   ├── shop/              # Shop components
│   └── ui/                # Reusable UI components
└── lib/
    ├── calendar-intelligence.ts  # Scheduling logic
    ├── pricing.ts                # Pricing calculations
    ├── subscriptions.ts          # Subscription & gift config
    ├── travel-calculator.ts      # Travel cost engine
    └── travel-config.ts          # Home bases & config
```

## Features in Detail

### Event Types & Packages

| Event Type | Description | Starting Price |
|------------|-------------|----------------|
| Wedding | Ceremony, cocktail hour, reception | $1,500 |
| Corporate | Galas, conferences, dinners | $1,200 |
| Private | Parties, anniversaries, celebrations | $800 |
| Virtual | Live-streamed performances | $400 |

### Intelligent Travel System

The platform automatically calculates travel costs based on:

- **Distance-based routing**: Ground transport (<75 mi), Regional (76-200 mi), Flight required (>200 mi)
- **Dual home base optimization**: Selects Nashville (BNA) or Baltimore (BWI) based on lowest cost
- **Hotel pricing tiers**: Major metros, secondary markets, smaller markets
- **Seasonal adjustments**: Peak season multipliers and last-minute premiums
- **15% contingency buffer**: Built-in price protection for travel estimates

### Calendar Intelligence

- **Travel time blocking**: Automatically blocks time before/after events for travel
- **Personal time protection**: Keywords like "vacation", "family", "off" create hard blocks
- **Conflict detection**: Prevents double-booking with travel window awareness
- **Clustering optimization**: Identifies opportunities to combine nearby events and save on travel

### Pricing Engine

```
Total = Base Price + Duration Premium + Peak Date Surcharge + Travel Fee + Add-ons
```

- **Peak dates**: Saturdays, holidays (+15-25%)
- **Seasonal**: Wedding season (May-Oct) premium
- **Add-ons**: Sound system, additional repertoire, extended hours

### Subscription & Gift Revenue System

Passive and recurring income streams for scalable growth, targeting $16,000/month additional revenue.

#### Subscription Plans

| Plan | Monthly Price | Target Revenue |
|------|---------------|----------------|
| Violin Mastery (Learning) | $29-199/mo | $5,000/mo |
| Strings Attached (Recording Club) | $19/mo | $3,000/mo |
| Anniversary Program | $99-349/yr | $2,000/yr+ |
| Corporate Hold Music | $49-199/mo | $1,500/mo |

#### Gift Products

| Product | Price Range | Description |
|---------|-------------|-------------|
| Custom Arrangements | $175-750 | Personalized song arrangements with recording |
| Dedication Videos | $85-150 | Short personalized video performances |
| Virtual Serenades | $199-499 | Live private performances via video call |
| Concert in a Box | $129-279 | At-home concert experience package |
| Sheet Music | $15-75 | Professional violin arrangements (PDF) |
| Gift Cards | $25-5,000 | Redeemable for any service |

#### Shop Features

- Category-based browsing (subscriptions, gifts, sheet music, gift cards)
- Tiered subscription selection with billing cycle toggle
- Rush delivery options for gift products
- Shopping cart for sheet music bundles
- Admin dashboard with subscription/order management

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/travel/quote` | POST | Calculate travel costs for a venue |
| `/api/calendar/availability` | GET | Get monthly availability |
| `/api/calendar/availability` | POST | Check specific date availability |
| `/api/travel/clustering` | GET | Detect clustering opportunities |
| `/api/shop/subscriptions` | GET/POST | List plans and create subscriptions |
| `/api/shop/gifts` | GET/POST | List products and create gift orders |
| `/api/shop/sheet-music` | GET/POST | Browse catalog and purchase downloads |
| `/api/shop/gift-cards` | GET/POST | Purchase and redeem gift cards |
| `/api/checkout` | POST | Create Stripe checkout session |
| `/api/webhook` | POST | Handle Stripe webhooks |

## Database Schema

The Prisma schema includes models for:

- **Users & Sessions** - Authentication and client management
- **Bookings & Payments** - Event bookings with payment tracking
- **Event Types & Packages** - Configurable service offerings
- **Travel System** - Home bases, itineraries, flights, hotels, expenses
- **Calendar Events** - Scheduling with category and block types
- **Subscriptions** - Plans, subscribers, content access, payments
- **Gift Products** - Catalog, orders, delivery tracking
- **Sheet Music** - Digital products, purchases, bundles
- **Gift Cards** - Issuance, redemptions, balances
- **Supporting Models** - Repertoire, testimonials, media, inquiries, reviews

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint

# Format with Prisma
npx prisma format
```

## Deployment

The application is optimized for deployment on Vercel:

```bash
# Build and deploy
vercel --prod
```

Ensure environment variables are configured in your Vercel project settings.

## License

Private - All rights reserved.
