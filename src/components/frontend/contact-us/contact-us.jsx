import Image from "next/image";
import ConsultationSection from "./ConsultationSection";

const ContactUs = () => {
  return (
    <section className="bg-surface">
      {/* air line image */}
      <div className="relative">
        <Image
          src="https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg"
          width={2000}
          height={400}
          className="h-64 w-full object-cover opacity-25 sm:h-72 md:h-85"
          alt="air-line"
        />
        <p className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-center text-2xl font-bold sm:text-3xl md:text-5xl">
          Contact Us
        </p>
      </div>

      <ConsultationSection />
    </section>
  );
};

export default ContactUs;
