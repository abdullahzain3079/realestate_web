import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import LocationFacts from "@/components/sections/LocationFacts";
import UnitLayouts from "@/components/sections/UnitLayouts";
import Facilities from "@/components/sections/Facilities";
import VirtualTour from "@/components/sections/VirtualTour";
import Concierge from "@/components/sections/Concierge";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg relative overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <ScrollProgress />

      <Hero />
      <SectionDivider />

      <LocationFacts />
      <SectionDivider />

      <UnitLayouts />
      <SectionDivider />

      <Facilities />
      <SectionDivider />

      <VirtualTour />
      <SectionDivider />

      <Concierge />
      <SectionDivider />

      <Gallery />
      <SectionDivider />

      <Contact />
    </main>
  );
}
