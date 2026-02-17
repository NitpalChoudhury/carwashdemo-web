import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        alt="Car Service"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl">

        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Premium Car Service <br />
          <span className="text-red-500">Fast. Reliable. Trusted.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-gray-300 text-sm md:text-lg mb-8"
        >
          Experience expert car maintenance with pickup & delivery,
          certified mechanics and transparent pricing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/booking"
            className="bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold shadow-lg"
          >
            Book Now
          </Link>

          <Link
            to="/services"
            className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Explore Services
          </Link>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 animate-bounce text-white text-2xl z-10">
        ↓
      </div>

    </section>
  );
}

export default HeroSection;
