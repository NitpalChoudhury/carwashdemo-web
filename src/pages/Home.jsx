import { Link } from "react-router-dom";
import HeroSection from "../components/Hero";
import VideoSection from "../components/VideoSection";
import ReviewSection from "../components/ReviewSection";
import OfferBanner from "../components/OfferBanner";
import CarWashSection from "../components/CarWashSection";

import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-slate-950 text-white overflow-hidden">

      {/* HERO (From Separate Component) */}
      <HeroSection />
      <OfferBanner />
      <CarWashSection />

      {/* Video Section */}
      <VideoSection />

      {/* SERVICES PREVIEW */}
      <section className="py-20 px-6 bg-slate-900">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Our Top Services
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">

          {["Oil Change", "AC Service", "Full Inspection"].map(
            (service, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {service}
                </h3>
                <p className="text-gray-400 text-sm">
                  Professional service handled by certified experts.
                </p>
              </motion.div>
            )
        )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">

          {[
              "Book Online",
              "Pickup Vehicle",
              "Service Process",
              "Delivery Back",
            ].map((step, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                >
              <div className="text-red-500 text-4xl mb-3">
                {index + 1}
              </div>
              <h3 className="font-semibold">{step}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-800 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Service Your Car?
        </motion.h2>

        <Link
          to="/booking"
          className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
        >
          Book Appointment Now
        </Link>
      </section>

<ReviewSection />
    </div>
  );
}

export default Home;
