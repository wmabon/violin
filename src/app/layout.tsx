import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Victoria Strings | Professional Violinist for Weddings & Events",
    template: "%s | Victoria Strings",
  },
  description:
    "Award-winning violinist providing elegant live music for weddings, corporate events, and private celebrations. Book your date today.",
  keywords: [
    "wedding violinist",
    "event violinist",
    "live violin music",
    "corporate entertainment",
    "wedding music",
    "string musician",
    "luxury wedding entertainment",
  ],
  authors: [{ name: "Victoria Strings" }],
  creator: "Victoria Strings",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://victoriastrings.com",
    siteName: "Victoria Strings",
    title: "Victoria Strings | Professional Violinist",
    description:
      "Creating unforgettable moments through the timeless elegance of live violin performance.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Victoria Strings - Professional Violinist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victoria Strings | Professional Violinist",
    description:
      "Award-winning violinist for weddings, corporate events, and private celebrations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}
