// Database client for Prisma
// Note: In development without Prisma client generated, we use mock data

// This would be the Prisma client in production:
// import { PrismaClient } from '@prisma/client'
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
// export const prisma = globalForPrisma.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Mock data for demonstration
export const mockTestimonials = [
  {
    id: "1",
    clientName: "Sarah & Michael Thompson",
    eventType: "Wedding",
    venue: "The Grand Ballroom, Four Seasons",
    date: new Date("2024-06-15"),
    content:
      "Harrison made our wedding absolutely magical. His performance during our ceremony brought tears to everyone's eyes. The way he played 'Canon in D' as I walked down the aisle was everything I dreamed of and more. He was incredibly professional, easy to work with, and his music created the perfect atmosphere throughout our cocktail hour. We couldn't have asked for a more talented musician.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
  },
  {
    id: "2",
    clientName: "Jennifer Martinez",
    eventType: "Corporate Gala",
    venue: "The Ritz-Carlton",
    date: new Date("2024-09-22"),
    content:
      "We hired Harrison for our annual company gala and he exceeded all expectations. His elegant performance set the perfect tone for our black-tie event. Our guests were thoroughly impressed with both his talent and professionalism. We've already booked him for next year's event!",
    rating: 5,
    isApproved: true,
    isFeatured: true,
  },
  {
    id: "3",
    clientName: "Robert & Lisa Chen",
    eventType: "Anniversary Party",
    venue: "Private Residence",
    date: new Date("2024-08-10"),
    content:
      "Harrison performed at our 25th wedding anniversary celebration. He learned our wedding song and played it perfectly - such a touching moment for us. His repertoire was diverse and he kept our guests entertained all evening. A true professional with extraordinary talent.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
  },
  {
    id: "4",
    clientName: "Amanda Reynolds",
    eventType: "Wedding",
    venue: "Vineyard Estate",
    date: new Date("2024-05-28"),
    content:
      "From our first consultation to the last note at our reception, Harrison was amazing. He provided excellent suggestions for our ceremony music and seamlessly transitioned between different parts of our wedding day. His violin added such an elegant touch to our vineyard wedding.",
    rating: 5,
    isApproved: true,
    isFeatured: false,
  },
  {
    id: "5",
    clientName: "David Park",
    eventType: "Corporate Event",
    venue: "Tech Conference Center",
    date: new Date("2024-07-14"),
    content:
      "Harrison performed at our product launch event and created exactly the sophisticated ambiance we were looking for. He was flexible with timing as our schedule shifted, and his music impressed all of our VIP guests. Highly recommend for corporate events!",
    rating: 5,
    isApproved: true,
    isFeatured: false,
  },
];

export const mockRepertoire = [
  // Classical
  { id: "1", title: "Canon in D", artist: "Pachelbel", genre: "Classical", category: "Ceremony", isPopular: true, isFeatured: true },
  { id: "2", title: "Ave Maria", artist: "Schubert", genre: "Classical", category: "Ceremony", isPopular: true, isFeatured: true },
  { id: "3", title: "Air on the G String", artist: "Bach", genre: "Classical", category: "Ceremony", isPopular: true, isFeatured: false },
  { id: "4", title: "The Four Seasons - Spring", artist: "Vivaldi", genre: "Classical", category: "Cocktail Hour", isPopular: true, isFeatured: true },
  { id: "5", title: "Meditation from Thais", artist: "Massenet", genre: "Classical", category: "Ceremony", isPopular: false, isFeatured: false },
  { id: "6", title: "Clair de Lune", artist: "Debussy", genre: "Classical", category: "Cocktail Hour", isPopular: true, isFeatured: false },
  { id: "7", title: "Hungarian Dance No. 5", artist: "Brahms", genre: "Classical", category: "Reception", isPopular: false, isFeatured: false },
  { id: "8", title: "Eine Kleine Nachtmusik", artist: "Mozart", genre: "Classical", category: "Cocktail Hour", isPopular: true, isFeatured: false },

  // Contemporary/Pop
  { id: "9", title: "A Thousand Years", artist: "Christina Perri", genre: "Contemporary", category: "Ceremony", isPopular: true, isFeatured: true },
  { id: "10", title: "Perfect", artist: "Ed Sheeran", genre: "Contemporary", category: "Ceremony", isPopular: true, isFeatured: true },
  { id: "11", title: "All of Me", artist: "John Legend", genre: "Contemporary", category: "Ceremony", isPopular: true, isFeatured: false },
  { id: "12", title: "Can't Help Falling in Love", artist: "Elvis Presley", genre: "Contemporary", category: "Ceremony", isPopular: true, isFeatured: false },
  { id: "13", title: "Thinking Out Loud", artist: "Ed Sheeran", genre: "Contemporary", category: "Reception", isPopular: true, isFeatured: false },
  { id: "14", title: "Here Comes the Sun", artist: "The Beatles", genre: "Contemporary", category: "Cocktail Hour", isPopular: true, isFeatured: false },
  { id: "15", title: "What a Wonderful World", artist: "Louis Armstrong", genre: "Jazz", category: "Cocktail Hour", isPopular: true, isFeatured: false },

  // Film Scores
  { id: "16", title: "Theme from Schindler's List", artist: "John Williams", genre: "Film Scores", category: "Ceremony", isPopular: true, isFeatured: true },
  { id: "17", title: "Cinema Paradiso", artist: "Ennio Morricone", genre: "Film Scores", category: "Cocktail Hour", isPopular: true, isFeatured: false },
  { id: "18", title: "Moon River", artist: "Henry Mancini", genre: "Film Scores", category: "Cocktail Hour", isPopular: true, isFeatured: false },
  { id: "19", title: "The Godfather Theme", artist: "Nino Rota", genre: "Film Scores", category: "Reception", isPopular: false, isFeatured: false },
  { id: "20", title: "Gabriel's Oboe", artist: "Ennio Morricone", genre: "Film Scores", category: "Ceremony", isPopular: false, isFeatured: false },

  // Wedding Traditional
  { id: "21", title: "Bridal Chorus", artist: "Wagner", genre: "Wedding", category: "Ceremony", isPopular: true, isFeatured: false },
  { id: "22", title: "Wedding March", artist: "Mendelssohn", genre: "Wedding", category: "Ceremony", isPopular: true, isFeatured: false },
  { id: "23", title: "Trumpet Voluntary", artist: "Clarke", genre: "Wedding", category: "Ceremony", isPopular: true, isFeatured: false },

  // Jazz
  { id: "24", title: "The Way You Look Tonight", artist: "Jerome Kern", genre: "Jazz", category: "Cocktail Hour", isPopular: true, isFeatured: false },
  { id: "25", title: "Fly Me to the Moon", artist: "Bart Howard", genre: "Jazz", category: "Cocktail Hour", isPopular: true, isFeatured: false },
  { id: "26", title: "Autumn Leaves", artist: "Joseph Kosma", genre: "Jazz", category: "Cocktail Hour", isPopular: false, isFeatured: false },

  // Holiday
  { id: "27", title: "O Holy Night", artist: "Traditional", genre: "Holiday", category: "Holiday", isPopular: true, isFeatured: false },
  { id: "28", title: "Silent Night", artist: "Traditional", genre: "Holiday", category: "Holiday", isPopular: true, isFeatured: false },
  { id: "29", title: "Winter Wonderland", artist: "Traditional", genre: "Holiday", category: "Holiday", isPopular: true, isFeatured: false },
  { id: "30", title: "Have Yourself a Merry Little Christmas", artist: "Traditional", genre: "Holiday", category: "Holiday", isPopular: true, isFeatured: false },
];

export const mockMedia = [
  {
    id: "1",
    type: "video",
    title: "Wedding Ceremony Performance",
    description: "Canon in D at a beautiful garden wedding",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video-thumb-1.jpg",
    category: "Wedding",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "2",
    type: "video",
    title: "Corporate Gala Highlights",
    description: "Performance at the Annual Tech Awards",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video-thumb-2.jpg",
    category: "Corporate",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: "3",
    type: "photo",
    title: "Four Seasons Wedding",
    description: "Elegant ceremony at the Four Seasons ballroom",
    url: "/images/gallery-1.jpg",
    category: "Wedding",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: "4",
    type: "photo",
    title: "Outdoor Garden Performance",
    description: "Cocktail hour at a vineyard estate",
    url: "/images/gallery-2.jpg",
    category: "Wedding",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    id: "5",
    type: "audio",
    title: "A Thousand Years",
    description: "Live recording from a recent wedding",
    url: "/audio/thousand-years.mp3",
    category: "Performance",
    isFeatured: true,
    sortOrder: 5,
  },
];

export const mockPackages = {
  wedding: [
    {
      id: "w1",
      name: "Ceremony Package",
      description: "Perfect for an elegant ceremony",
      price: 1500,
      duration: 60,
      features: [
        "30 minutes prelude music",
        "Processional & recessional",
        "Up to 3 special songs",
        "Coordination with officiant",
      ],
      isPopular: false,
    },
    {
      id: "w2",
      name: "Ceremony + Cocktail Hour",
      description: "Our most popular wedding package",
      price: 2500,
      duration: 150,
      features: [
        "Everything in Ceremony Package",
        "90 minutes cocktail hour music",
        "Custom song arrangement",
        "Wireless amplification included",
      ],
      isPopular: true,
    },
    {
      id: "w3",
      name: "Full Wedding Experience",
      description: "Complete musical coverage for your day",
      price: 4000,
      duration: 300,
      features: [
        "Everything in Ceremony + Cocktail",
        "Dinner background music",
        "First dance performance",
        "Rehearsal attendance included",
        "Up to 5 custom arrangements",
      ],
      isPopular: false,
    },
    {
      id: "w4",
      name: "Luxury Wedding Package",
      description: "Premium experience with string duo",
      price: 8000,
      duration: 360,
      features: [
        "Violin & cello duo",
        "Full day coverage (6 hours)",
        "Unlimited custom arrangements",
        "Rehearsal & coordination meetings",
        "Premium wireless sound system",
        "Dedicated event coordinator",
      ],
      isPopular: false,
    },
  ],
  corporate: [
    {
      id: "c1",
      name: "Cocktail Reception",
      description: "Elegant background music for networking",
      price: 1200,
      duration: 120,
      features: [
        "2 hours of live music",
        "Professional attire",
        "Curated playlist consultation",
        "Setup & sound check included",
      ],
      isPopular: false,
    },
    {
      id: "c2",
      name: "Gala Performance",
      description: "Premium entertainment for special events",
      price: 2500,
      duration: 180,
      features: [
        "3 hours of live music",
        "Featured solo performances",
        "Custom corporate playlist",
        "Wireless amplification",
        "Coordination with event planner",
      ],
      isPopular: true,
    },
    {
      id: "c3",
      name: "Executive Experience",
      description: "String quartet for prestigious events",
      price: 5000,
      duration: 240,
      features: [
        "Full string quartet",
        "4 hours of live music",
        "Premium sound system",
        "Dedicated coordinator",
        "Custom arrangements available",
      ],
      isPopular: false,
    },
  ],
  private: [
    {
      id: "p1",
      name: "Intimate Gathering",
      description: "Perfect for small celebrations",
      price: 800,
      duration: 60,
      features: [
        "1 hour of live music",
        "Personalized song selection",
        "Setup included",
      ],
      isPopular: false,
    },
    {
      id: "p2",
      name: "Celebration Package",
      description: "Ideal for parties and anniversaries",
      price: 1500,
      duration: 120,
      features: [
        "2 hours of live music",
        "Special song request",
        "Custom arrangement option",
        "Wireless amplification",
      ],
      isPopular: true,
    },
    {
      id: "p3",
      name: "Grand Celebration",
      description: "Make your event unforgettable",
      price: 2500,
      duration: 180,
      features: [
        "3 hours of live music",
        "Multiple custom arrangements",
        "Premium sound system",
        "Event coordination",
      ],
      isPopular: false,
    },
  ],
  virtual: [
    {
      id: "v1",
      name: "Mini Performance",
      description: "Short and sweet virtual concert",
      price: 300,
      duration: 15,
      features: [
        "15-minute live performance",
        "HD video quality",
        "3 song selections",
        "Recording provided",
      ],
      isPopular: false,
    },
    {
      id: "v2",
      name: "Virtual Concert",
      description: "Full virtual performance experience",
      price: 500,
      duration: 30,
      features: [
        "30-minute live performance",
        "HD video with multiple angles",
        "Interactive song requests",
        "Recording provided",
        "Personalized message",
      ],
      isPopular: true,
    },
    {
      id: "v3",
      name: "Private Virtual Event",
      description: "Extended virtual entertainment",
      price: 800,
      duration: 60,
      features: [
        "60-minute live performance",
        "Professional production quality",
        "Custom setlist",
        "Multiple camera angles",
        "Full recording rights",
        "Q&A session included",
      ],
      isPopular: false,
    },
  ],
};

// Helper to get booked dates (mock)
export function getBookedDates(): Date[] {
  const today = new Date();
  const booked: Date[] = [];

  // Mock some booked dates
  for (let i = 0; i < 10; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 90) + 7);
    booked.push(futureDate);
  }

  return booked;
}
