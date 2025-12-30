import AppDownloadSection from "@/components/frontend/home/AppDownloadSection/AppDownloadSection ";
import Hero from "@/components/frontend/home/hero/Hero";
import OurSmartServices from "@/components/frontend/home/OurSmartServices/OurSmartServices";
import PopularAirlines from "@/components/frontend/home/PopularAirlines/PopularAirlines";
import SuitableRoutes from "@/components/frontend/home/SuitableRoutes/SuitableRoutes";
import TopDestination from "@/components/frontend/home/TopDestination/TopDestination";
import TravelSection from "@/components/frontend/home/travel/TravelSection";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <TravelSection />
      <TopDestination />
      <PopularAirlines />
      <OurSmartServices />
      <SuitableRoutes />
      <AppDownloadSection />
    </section>
  );
};

export default HomePage;
