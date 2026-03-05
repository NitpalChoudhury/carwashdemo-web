import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/client";
import ReviewsBlock from "../components/ReviewsBlock";
import ShortVideoSection from "./videos/ShortVideoSection";
import LongVideoSection from "./videos/LongVideoSection";

function Home() {
  const [banner, setBanner] = useState(null);
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [error, setError] = useState("");

  /* Load Banner */
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const bannerData = await apiRequest("/banner").catch(() => null);

        if (!mounted) return;

        setBanner(bannerData);

        const bannerSlides =
          bannerData?.slides || [bannerData?.image].filter(Boolean);

        setSlides(bannerSlides);
      } catch {
        if (mounted) setError("Unable to load homepage data.");
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  /* Auto Slider */
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="pb-20">

      {/* HERO BANNER */}
      <section className="relative h-[520px] w-full overflow-hidden md:h-[680px]">

        {slides.length ? (
          slides.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="banner-slide"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/40 text-gray-300">
            Upload a banner from admin dashboard
          </div>
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40"></div>

        {/* Hero Content */}
        <div className="absolute bottom-14 left-0 w-full px-6 md:px-16">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Premium Vehicle Care
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {banner?.title ||
              "Experience the Future of Premium Car & Bike Servicing"}
          </h1>

          <p className="mt-5 max-w-xl text-gray-200 md:text-lg">
            {banner?.subtitle ||
              "Doorstep pickup, real-time updates, and top-quality detailing handled by professionals."}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/booking"
              className="rounded-lg bg-red-500 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
            >
              Book Now
            </Link>

            <Link
              to="/services"
              className="rounded-lg border border-white/40 px-7 py-3 font-semibold text-white backdrop-blur-lg transition hover:bg-white/10"
            >
              Explore Services
            </Link>

          </div>
        </div>

        {/* Slider Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-8 bg-red-500"
                    : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

      </section>

      {/* FEATURE VIDEO */}
      <LongVideoSection />

      {/* SHORT REELS */}
      <ShortVideoSection />

      {/* REVIEWS */}
      <section className="page-shell mt-24">
        <ReviewsBlock title="Real Customer Reviews" limit={3} />
      </section>

      {/* ERROR */}
      {error && (
        <section className="page-shell mt-10">
          <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        </section>
      )}

    </div>
  );
}

export default Home;