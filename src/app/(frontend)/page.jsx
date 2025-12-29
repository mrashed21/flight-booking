import Hero from "@/components/frontend/home/hero/Hero";
import PopularAirlines from "@/components/frontend/home/PopularAirlines/PopularAirlines";
import TopDestination from "@/components/frontend/home/TopDestination/TopDestination";
import TravelSection from "@/components/frontend/home/travel/TravelSection";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <TravelSection />
      <TopDestination />
      <PopularAirlines />
    </section>
  );
};

export default HomePage;
