"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { CTASection } from "@/components/portfolio/cta-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Music, Star, Play, Filter } from "lucide-react";
import { mockRepertoire } from "@/lib/db";
import { cn } from "@/lib/utils";

const genres = [
  "All",
  "Classical",
  "Contemporary",
  "Wedding",
  "Jazz",
  "Film Scores",
  "Holiday",
];

const categories = [
  "All",
  "Ceremony",
  "Cocktail Hour",
  "Reception",
  "Holiday",
];

export default function RepertoirePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRepertoire = useMemo(() => {
    return mockRepertoire.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" || song.genre === selectedGenre;

      const matchesCategory =
        selectedCategory === "All" || song.category === selectedCategory;

      return matchesSearch && matchesGenre && matchesCategory;
    });
  }, [searchQuery, selectedGenre, selectedCategory]);

  const featuredSongs = mockRepertoire.filter((song) => song.isFeatured);

  return (
    <>
      <Header />
      <main className="pt-28 pb-0">
        {/* Hero Section */}
        <section className="bg-stone-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
                Repertoire
              </h1>
              <p className="text-xl text-stone-300">
                From classical masterpieces to contemporary favorites, explore my
                extensive repertoire of over 200 songs perfect for any occasion.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Songs */}
        <section className="py-12 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-amber-600 fill-amber-600" />
              <h2 className="text-xl font-semibold text-stone-900">
                Popular Requests
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {featuredSongs.map((song) => (
                <Badge
                  key={song.id}
                  variant="default"
                  className="bg-white border border-amber-200 text-stone-700 px-3 py-1.5"
                >
                  <Music className="h-3 w-3 mr-1.5" />
                  {song.title}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b border-stone-200 sticky top-20 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <Input
                  placeholder="Search by song or artist..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Genre Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-5 w-5 text-stone-500" />
                <span className="text-sm text-stone-600 mr-2">Genre:</span>
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-stone-600 mr-2">Perfect for:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Repertoire List */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-600">
                Showing {filteredRepertoire.length} songs
              </p>
            </div>

            {filteredRepertoire.length === 0 ? (
              <Card variant="bordered" className="text-center py-12">
                <CardContent>
                  <Music className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">
                    No songs found
                  </h3>
                  <p className="text-stone-600">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRepertoire.map((song) => (
                  <Card
                    key={song.id}
                    variant="bordered"
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-stone-900">
                              {song.title}
                            </h3>
                            {song.isPopular && (
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          {song.artist && (
                            <p className="text-stone-500 text-sm">{song.artist}</p>
                          )}
                        </div>
                        <button className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors">
                          <Play className="h-4 w-4 text-amber-700 ml-0.5" />
                        </button>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="default">{song.genre}</Badge>
                        {song.category && (
                          <Badge variant="info">{song.category}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Custom Song Request */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Music className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
              Don&apos;t See Your Song?
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              I&apos;m happy to learn new songs for your special occasion. Custom
              arrangements are available for an additional fee. Let me know what
              song holds special meaning for you!
            </p>
            <Button size="lg">Request a Custom Song</Button>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
