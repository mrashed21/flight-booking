import Container from "@/components/common/container/container";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

const visaTypes = [
  {
    id: 1,
    country: "United Arab Emirates",
    isoCode: "AE",
    type: "Tourist Visa",
    duration: "30 Days",
    processing: "3–5 Working Days",
    fee: 8500,
    requirements: ["Passport Copy", "Photo", "Bank Statement", "Flight Ticket"],
    badge: "Popular",
    approval: "98%",
  },
  {
    id: 2,
    country: "Thailand",
    isoCode: "TH",
    type: "Tourist Visa on Arrival",
    duration: "15 Days",
    processing: "On Arrival",
    fee: 5200,
    requirements: ["Passport", "Photo", "Hotel Booking", "Return Ticket"],
    badge: "Easy",
    approval: "99%",
  },
  {
    id: 3,
    country: "Malaysia",
    isoCode: "MY",
    type: "eVisa",
    duration: "30 Days",
    processing: "2–3 Working Days",
    fee: 4500,
    requirements: ["Passport Scan", "Photo", "Bank Statement"],
    badge: "eVisa",
    approval: "97%",
  },
  {
    id: 4,
    country: "United Kingdom",
    isoCode: "GB",
    type: "Standard Visitor Visa",
    duration: "6 Months",
    processing: "15–20 Working Days",
    fee: 32000,
    requirements: [
      "Passport",
      "Bank Statement",
      "Employment Letter",
      "Invitation Letter",
    ],
    badge: null,
    approval: "85%",
  },
  {
    id: 5,
    country: "Schengen (Europe)",
    isoCode: "EU",
    type: "Schengen Visa",
    duration: "90 Days",
    processing: "10–15 Working Days",
    fee: 28000,
    requirements: [
      "Passport",
      "Travel Insurance",
      "Bank Statement",
      "Hotel Booking",
    ],
    badge: "Multi-Country",
    approval: "88%",
  },
  {
    id: 6,
    country: "Singapore",
    isoCode: "SG",
    type: "Tourist Visa",
    duration: "30 Days",
    processing: "3–5 Working Days",
    fee: 6000,
    requirements: ["Passport", "Photo", "Bank Statement", "Return Ticket"],
    badge: null,
    approval: "96%",
  },
];

const badgeColors = {
  Popular: "bg-primary text-white",
  Easy: "bg-green-500 text-white",
  eVisa: "bg-info text-white",
  "Multi-Country": "bg-warning text-white",
};

const steps = [
  { step: "01", title: "Choose Country", desc: "Select your destination country and visa type." },
  { step: "02", title: "Submit Documents", desc: "Upload required documents through our secure portal." },
  { step: "03", title: "Pay Fee", desc: "Pay the visa processing fee online securely." },
  { step: "04", title: "Get Visa", desc: "Receive your approved visa via email." },
];

const VisaPage = () => {
  return (
    <section className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="relative">
        <Image
          src="https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg"
          width={2000}
          height={400}
          className="h-52 w-full object-cover opacity-20 sm:h-64"
          alt="visa services"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <h1 className="text-primary text-center text-3xl font-bold sm:text-5xl">
            Visa Services
          </h1>
          <p className="text-muted text-sm">
            Fast, reliable visa processing for all major destinations
          </p>
        </div>
      </div>

      <Container>
        <div className="px-4 py-10">
          {/* How It Works */}
          <div className="mb-12">
            <h2 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
              How It Works
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-primary mb-2 text-3xl font-black opacity-20">
                    {s.step}
                  </p>
                  <h3 className="text-primary mb-1 text-sm font-semibold">
                    {s.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visa Cards */}
          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Available Visa Services
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visaTypes.map((visa) => (
              <div
                key={visa.id}
                className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={visa.isoCode}
                      svg
                      style={{ width: "2.2rem", height: "2.2rem", borderRadius: "6px", objectFit: "cover" }}
                      title={visa.country}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {visa.country}
                      </h3>
                      <p className="text-muted text-xs">{visa.type}</p>
                    </div>
                  </div>
                  {visa.badge && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColors[visa.badge]}`}
                    >
                      {visa.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="bg-surface mb-4 space-y-1.5 rounded-lg p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Duration</span>
                    <span className="font-medium text-gray-700">
                      {visa.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Processing Time</span>
                    <span className="font-medium text-gray-700">
                      {visa.processing}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Approval Rate</span>
                    <span className="text-primary font-semibold">
                      {visa.approval}
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {visa.requirements.map((r) => (
                    <span
                      key={r}
                      className="bg-primary-bg text-primary rounded-full px-2 py-0.5 text-xs"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Price & Apply */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted text-xs">Processing Fee</p>
                    <p className="text-primary text-lg font-bold">
                      BDT {visa.fee.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href="/checkout"
                    className="common-btn !px-4 !py-2 !text-xs"
                  >
                    <span>Apply Now</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VisaPage;
