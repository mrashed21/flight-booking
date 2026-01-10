import Container from "@/components/common/Container/Container";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import GeneralBooking from "./GeneralBooking";
import ReviewSection from "./ReviewSection";
import StatsSection from "./StatsSection";

const AboutUs = () => {
  return (
    <>
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
          About Us
        </p>
      </div>

      {/* about us */}
      <Container>
        <div className="py-12 md:py-20">
          <div className="flex flex-col items-center justify-between gap-10 px-4 lg:flex-row lg:gap-14">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2">
              <span className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1 text-sm font-medium shadow backdrop-blur-xl">
                About Us
              </span>

              <h2 className="mb-6 text-2xl leading-snug font-semibold sm:text-3xl md:text-4xl">
                Transforming Businesses with <br />
                Flight, Hotel Booking & Visa Process
              </h2>

              <p className="text-muted mb-8 max-w-xl">
                A powerful, modern ERP solution built to automate operations,
                boost productivity, and help your business scale with
                confidence.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <CheckCircle className="text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">
                      All-in-One Control
                    </h4>
                    <p className="text-muted text-sm">
                      A powerful, modern ERP solution built to automate
                      operations and boost productivity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">
                      Built for Bangladeshi Businesses
                    </h4>
                    <p className="text-muted text-sm">
                      Designed specifically to support local business workflows
                      and growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE SECTION */}
            <div className="relative flex w-full justify-center lg:w-auto">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow sm:top-6 sm:-left-26">
                <span className="text-muted text-sm font-medium">
                  Trusted Clients
                </span>
                <div className="flex -space-x-2">
                  <Image
                    src="https://i.ibb.co.com/7xz4Xwgf/profile.png"
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <Image
                    src="https://i.ibb.co.com/7xz4Xwgf/profile.png"
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <Image
                    src="https://i.ibb.co.com/7xz4Xwgf/profile.png"
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
              </div>

              <Image
                src="https://i.ibb.co.com/5WM99wCH/mantas-hesthaven-g1-Wdc-Kc-V3w-unsplash.jpg"
                alt="About Image"
                width={600}
                height={500}
                className="w-full max-w-md rounded-3xl object-cover lg:max-w-none"
              />
            </div>
          </div>
        </div>
        {/* stats */}
        <StatsSection />
        {/* booking proccess */}
        <GeneralBooking />
        {/* review section */}
        <ReviewSection />
      </Container>
    </>
  );
};

export default AboutUs;
