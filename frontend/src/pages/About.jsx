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

      {/* ================= HERO SECTION ================= */}

      <section className="relative h-[55vh] overflow-hidden rounded-3xl shadow-2xl">

        <img
          src="/banner-about.jpeg"
          alt="About CoziCars"
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Premium Vehicle Care <br />
            <span className="text-red-500">For Shillong</span>
          </h1>

          <p className="mt-5 max-w-xl text-gray-200 text-sm md:text-lg leading-relaxed">
            A modern car & bike care platform designed for convenience,
            transparency and premium detailing services.
          </p>

        </div>

      </section>

      {/* ================= INTRO ================= */}

      <section className="mt-16 grid items-center gap-10 md:grid-cols-2">

        <div>
          <h2 className="text-3xl font-bold text-white">
            About <span className="text-red-400">Shillong CoziCars</span>
          </h2>

          <div className="mt-4 h-1 w-20 bg-red-500 rounded"></div>

          <p className="mt-6 text-gray-300 leading-relaxed">
            Shillong CoziCars delivers premium vehicle care with a modern,
            transparent approach. From doorstep pickup to visual service
            updates, we ensure every step of your vehicle's journey is
            documented and delivered with precision.
          </p>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Our mission is simple — elevate vehicle maintenance into a
            seamless and premium experience for every driver in Shillong.
          </p>
        </div>

        <img
          src="/about-garage.jpeg"
          alt="Car detailing"
          className="rounded-2xl shadow-xl object-cover h-[320px] w-full"
        />

      </section>

      {/* ================= FEATURES ================= */}

      <section className="mt-16 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:scale-[1.03] transition shadow-lg">

          <h3 className="text-xl font-semibold text-white">
            Professional Detailing
          </h3>

          <p className="mt-3 text-sm text-gray-300">
            Advanced cleaning, polishing and protective treatments for
            maintaining showroom quality vehicles.
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:scale-[1.03] transition shadow-lg">

          <h3 className="text-xl font-semibold text-white">
            Transparent Service
          </h3>

          <p className="mt-3 text-sm text-gray-300">
            We document every service with clarity so customers always know
            what their vehicle is receiving.
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:scale-[1.03] transition shadow-lg">

          <h3 className="text-xl font-semibold text-white">
            Pickup & Delivery
          </h3>

          <p className="mt-3 text-sm text-gray-300">
            Doorstep pickup ensures vehicle servicing without interrupting
            your daily schedule.
          </p>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="mt-16 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center shadow-xl backdrop-blur-lg">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Live Services
          </p>

          <p className="mt-4 text-4xl font-extrabold text-red-400">
            {stats.services}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center shadow-xl backdrop-blur-lg">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Customer Reviews
          </p>

          <p className="mt-4 text-4xl font-extrabold text-red-400">
            {stats.reviews}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center shadow-xl backdrop-blur-lg">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            City Coverage
          </p>

          <p className="mt-4 text-4xl font-extrabold text-red-400">
            24 Zones
          </p>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="mt-16 rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-10 text-center shadow-2xl">

        <h3 className="text-2xl font-bold text-white">
          Experience Premium Car Care
        </h3>

        <p className="mt-3 text-white/90">
          Book your vehicle service with Shillong CoziCars today.
        </p>

        <button className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200">
          Book a Service
        </button>

      </section>

    </div>
  );
}

export default About;