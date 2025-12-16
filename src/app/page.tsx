import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { ServicesPreview } from "@/components/portfolio/services-preview";
import { AboutPreview } from "@/components/portfolio/about-preview";
import { Testimonials } from "@/components/portfolio/testimonials";
import { Gallery } from "@/components/portfolio/gallery";
import { CTASection } from "@/components/portfolio/cta-section";
import { Footer } from "@/components/portfolio/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesPreview />
        <AboutPreview />
        <Gallery />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
