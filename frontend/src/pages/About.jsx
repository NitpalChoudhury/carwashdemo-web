import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";

function About() {
  const [stats, setStats] = useState({ services: 0, reviews: 0 });

  useEffect(() => {
    let active = true;

    Promise.all([
      apiRequest("/services").catch(() => []),
      apiRequest("/reviews").catch(() => []),
    ]).then(([services, reviews]) => {
      if (!active) return;
      setStats({
        services: Array.isArray(services) ? services.length : 0,
        reviews: Array.isArray(reviews) ? reviews.length : 0,
      });
    });

    return () => (active = false);
  }, []);

  return (
    <div className="page-shell py-12">

      {/* ------------------------------------------------------- */}
      {/* LUXURY HERO BANNER  */}
      {/* ------------------------------------------------------- */}

      <section className="relative mb-14 h-[48vh] w-full overflow-hidden rounded-2xl shadow-2xl">

        {/* Background banner image */}
        <img
          src="/banner-about.jpeg"  // <-- Put your image in public/banner-about.jpg
          alt="About CoziCars"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/40 backdrop-blur-[2px]" />

        {/* Content Layer */}
        <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
            Redefining Premium <span className="text-red-500">Car & Bike Care</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-gray-200 md:text-lg leading-relaxed">
            We blend technology, transparency and trust to deliver a modern vehicle servicing
            experience — built specially for Shillong.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* INTRO SECTION */}
      {/* ------------------------------------------------------- */}

      <section className="rounded-2xl bg-white/5 p-10 shadow-xl backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-white">
          About <span className="text-red-400">Shillong CoziCars</span>
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
          Shillong CoziCars is committed to delivering modern, transparent and
          professional vehicle care. From doorstep pickup to visual service 
          reports, we prioritize clarity, speed, and top-tier workmanship that 
          builds long-term trust with every customer.
        </p>

        <div className="mt-5 h-1 w-24 rounded bg-red-500"></div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* FEATURE CARDS */}
      {/* ------------------------------------------------------- */}

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-lg hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold text-white">What We Do</h3>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            We provide on-demand car & bike care including deep cleaning,
            premium detailing, service packages and maintenance. Every step is
            documented for complete transparency.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-lg hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold text-white">Why Customers Trust Us</h3>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Our customers trust us for consistent timelines, clear pricing,
            honest diagnostics and service quality. We help maintain their
            vehicle’s health for the long run.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* STATISTIC CARDS */}
      {/* ------------------------------------------------------- */}

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Services Count */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Live Services</p>
          <p className="mt-3 text-4xl font-extrabold text-red-400">{stats.services}</p>
        </div>

        {/* Reviews */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Customer Reviews</p>
          <p className="mt-3 text-4xl font-extrabold text-red-400">{stats.reviews}</p>
        </div>

        {/* Coverage */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">City Coverage</p>
          <p className="mt-3 text-4xl font-extrabold text-red-400">24 Zones</p>
        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* CLOSING MESSAGE */}
      {/* ------------------------------------------------------- */}

      <section className="mt-14 rounded-2xl bg-white/5 p-8 text-center shadow-xl backdrop-blur-lg">
        <h3 className="text-xl font-semibold text-white">
          Built for the Shillong community with trust and reliability.
        </h3>
        <p className="mt-3 text-sm text-gray-300">
          Your vehicle deserves better — and we make sure it gets exactly that.
        </p>
      </section>
    </div>
  );
}

export default About;