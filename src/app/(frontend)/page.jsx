import AppDownloadSection from "@/components/frontend/Home/AppDownloadSection/AppDownloadSection ";
import BestHotel from "@/components/frontend/Home/BestHotel/BestHotel";
import Hero from "@/components/frontend/Home/Hero/Hero";
import OurSmartServices from "@/components/frontend/Home/OurSmartServices/OurSmartServices";
import PopularAirlines from "@/components/frontend/Home/PopularAirlines/PopularAirlines";
import SuitableRoutes from "@/components/frontend/Home/SuitableRoutes/SuitableRoutes";
import TopDestination from "@/components/frontend/Home/TopDestination/TopDestination";
import TravelSection from "@/components/frontend/Home/Travel/TravelSection";

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
