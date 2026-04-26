"use clinet";
import FeaturedProducts from "@/components/landing/featured-products";
import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturedProducts />
    </main>
  );
}
