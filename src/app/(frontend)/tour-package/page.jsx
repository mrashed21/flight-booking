import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";

const packages = [
  {
    id: 1,
    title: "Cox's Bazar Beach Escape",
    location: "Cox's Bazar, Bangladesh",
    duration: "3 Days / 2 Nights",
    image:
      "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg",
    price: 8500,
    rating: 4.8,
    reviews: 124,
    includes: ["Flight", "Hotel", "Breakfast", "Transfer"],
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Dubai Desert & City Tour",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    image:
      "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg",
    price: 65000,
    rating: 4.9,
    reviews: 89,
    includes: ["Flight", "Hotel", "Breakfast", "Desert Safari", "City Tour"],
    badge: "Popular",
  },
  {
    id: 3,
    title: "Bangkok Explorer",
    location: "Bangkok, Thailand",
    duration: "4 Days / 3 Nights",
    image:
      "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg",
    price: 42000,
    rating: 4.7,
    reviews: 67,
    includes: ["Flight", "Hotel", "Breakfast", "City Tour"],
    badge: null,
  },
  {
    id: 4,
    title: "Kuala Lumpur City Break",
    location: "Kuala Lumpur, Malaysia",
    duration: "4 Days / 3 Nights",
    image:
      "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg",
    price: 38500,
    rating: 4.6,
    reviews: 55,
    includes: ["Flight", "Hotel", "Breakfast"],
    badge: "Value Deal",
  },
  {
    id: 5,
    title: "Singapore in Style",
    location: "Singapore",
    duration: "5 Days / 4 Nights",
    image:
      "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg",
    price: 72000,
    rating: 4.9,
    reviews: 101,
    includes: ["Flight", "Hotel", "All Meals", "City Tour", "Gardens by Bay"],
    badge: "Luxury",
  },
  {
    id: 6,
    title: "Maldives Honeymoon Special",
    location: "Maldives",
    duration: "6 Days / 5 Nights",
    image:
      "https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg",
    price: 125000,
    rating: 5.0,
    reviews: 48,
    includes: ["Flight", "Water Villa", "All Meals", "Snorkeling", "Spa"],
    badge: "Honeymoon",
  },
];

const badgeColors = {
  "Best Seller": "bg-warning text-white",
  Popular: "bg-primary text-white",
  "Value Deal": "bg-green-500 text-white",
  Luxury: "bg-primary-dark text-white",
  Honeymoon: "bg-pink-500 text-white",
};

const TourPackagePage = () => {
  return (
    <section className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="relative">
        <Image
          src="https://i.ibb.co.com/pBsCyYz6/md-shafinur-rahman-k5fq2-NIZm-4-unsplash.jpg"
          width={2000}
          height={400}
          className="h-52 w-full object-cover opacity-20 sm:h-64"
          alt="tour packages"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <h1 className="text-primary text-center text-3xl font-bold sm:text-5xl">
            Tour Packages
          </h1>
          <p className="text-muted text-sm">
            Handpicked packages for unforgettable journeys
          </p>
        </div>
      </div>

      <Container>
        <div className="px-4 py-10">
          {/* Filter */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-muted text-sm font-medium">Filter:</span>
            {["All", "Domestic", "International", "Honeymoon", "Budget"].map(
              (f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                    i === 0
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
          </div>

          {/* Package Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover opacity-60"
                  />
                  {pkg.badge && (
                    <span
                      className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[pkg.badge]}`}
                    >
                      {pkg.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <p className="text-xs font-medium text-white drop-shadow">
                      📍 {pkg.location}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="mb-1 text-base font-semibold text-gray-800">
                    {pkg.title}
                  </h2>
                  <p className="text-muted mb-3 text-xs">
                    ⏱ {pkg.duration} &nbsp;|&nbsp; ⭐ {pkg.rating} ({pkg.reviews}{" "}
                    reviews)
                  </p>

                  {/* Includes */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    {pkg.includes.map((inc) => (
                      <span
                        key={inc}
                        className="bg-primary-bg text-primary rounded-full px-2 py-0.5 text-xs"
                      >
                        {inc}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted text-xs">Starting from</p>
                      <p className="text-primary text-lg font-bold">
                        BDT {pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href="/checkout"
                      className="common-btn !px-4 !py-2 !text-xs"
                    >
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TourPackagePage;
