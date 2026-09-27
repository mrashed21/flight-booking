import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";

const FrontendLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default FrontendLayout;
