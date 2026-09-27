import AppDownloadSection from "@/components/frontend/home/app-download-section/app-download-section";
import BestHotel from "@/components/frontend/home/best-hotel/best-hotel";
import Hero from "@/components/frontend/home/hero/hero";
import OurSmartServices from "@/components/frontend/home/our-smart-services/our-smart-services";
import PopularAirlines from "@/components/frontend/home/popular-airlines/popular-airlines";
import SuitableRoutes from "@/components/frontend/home/suitable-routes/suitable-routes";
import TopDestination from "@/components/frontend/home/top-destination/top-destination";
import TravelSection from "@/components/frontend/home/travel/travel-section";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <TravelSection />
      <TopDestination />
      <BestHotel></BestHotel>
      {/* <PopularAirlines /> */}
      <OurSmartServices />
      <SuitableRoutes />
      <AppDownloadSection />
    </section>
  );
};

export default HomePage;
