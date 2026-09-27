import Link from "next/link";

const NotFound = () => {
  return (
    <section className="bg-surface flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <div className="relative mb-6 select-none">
        <p className="text-primary text-[140px] leading-none font-black opacity-10 sm:text-[200px]">
          404
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-primary text-6xl font-black sm:text-8xl">404</span>
        </div>
      </div>

      {/* Plane icon */}
      <div className="bg-primary-bg border-primary-bg mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2 3.2 6.8 9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 5.8 5.8 1.6-1.6z" />
        </svg>
      </div>

      <h1 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
        Oops! Page Not Found
      </h1>
      <p className="text-muted mb-8 max-w-md text-sm leading-relaxed sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track to find your next flight!
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="common-btn text-sm">
          <span>Back to Home</span>
        </Link>
        <Link
          href="/search"
          className="border-primary text-primary hover:bg-primary-bg rounded-lg border px-6 py-3 text-sm font-semibold transition"
        >
          Search Flights
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
