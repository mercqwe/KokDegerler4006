import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ValuesGrid } from "@/components/values-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValuesGrid />
      <Footer />
    </main>
  )
}
