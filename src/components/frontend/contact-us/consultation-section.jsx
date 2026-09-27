"use client";

import Container from "@/components/common/Container/Container";
import CommonButton from "@/components/UI/CommonButton";

const ConsultationSection = () => {
  return (
    <Container className="py-20">
      <div className="px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <span className="text-primary bg-primary/15 mb-6 inline-block rounded-full px-6 py-2 text-sm font-medium shadow backdrop-blur-xl">
              Consultation With Us
            </span>

            <h2 className="mb-6 text-3xl leading-snug font-bold text-gray-800 md:text-4xl">
              Get Expert Consultation to Find the Right <br />
              ERP Solution for Your Business.
            </h2>

            <p className="mb-8 max-w-xl text-gray-600">
              Our dedicated ERP experts will help you analyze your business
              workflow, identify automation opportunities, and recommend the
              most efficient modules tailored to your industry. Get personalized
              advice to make smarter technology decisions.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {["f", "in", "yt", "ig"].map((icon, index) => (
                <div
                  key={index}
                  className="bg-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-semibold text-white"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-xl bg-white p-8 shadow">
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Write Message"
                  className="focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none"
                />
              </div>

              <CommonButton
                type="submit"
                className="bg-primary w-full rounded-md py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Submit
              </CommonButton>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConsultationSection;
