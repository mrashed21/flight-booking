import Hero from "@/components/frontend/home/hero/Hero";
import TopDestination from "@/components/frontend/home/TopDestination/TopDestination";
import TravelSection from "@/components/frontend/home/travel/TravelSection";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <TravelSection />
      <TopDestination />
    </section>
  );
};

export default HomePage;
