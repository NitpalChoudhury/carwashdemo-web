import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      id: "oil-change",
      title: "Oil Change Service",
      price: "Starting ₹999",
      description:
        "Premium engine oil replacement with high-quality filter & inspection.",
    },
    {
      id: "ac-service",
      title: "AC Service & Repair",
      price: "Starting ₹1499",
      description:
        "Complete AC cleaning, gas refill & cooling system inspection.",
    },
    {
      id: "full-inspection",
      title: "Full Car Inspection",
      price: "Starting ₹1999",
      description:
        "Comprehensive 50-point vehicle safety inspection.",
    },
    {
      id: "battery-replacement",
      title: "Battery Replacement",
      price: "Starting ₹3499",
      description:
        "Quick battery replacement with warranty support.",
    },
    {
      id: "brake-service",
      title: "Brake Service",
      price: "Starting ₹1299",
      description:
        "Brake pad replacement & complete braking inspection.",
    },
    {
      id: "car-wash",
      title: "Premium Car Wash",
      price: "Starting ₹499",
      description:
        "Interior & exterior deep cleaning for spotless shine.",
    },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen py-20 px-6">

      {/* PAGE TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-red-500">Services</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our professional automotive services designed to keep your
          vehicle running smoothly and safely.
        </p>
      </motion.div>

      {/* SERVICES GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">

        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-900 p-8 rounded-2xl shadow-lg flex flex-col justify-between border border-slate-800"
          >
            <div>
              <h2 className="text-xl font-bold mb-3">
                {service.title}
              </h2>

              <p className="text-red-500 font-semibold mb-4">
                {service.price}
              </p>

              <p className="text-gray-400 text-sm mb-6">
                {service.description}
              </p>
            </div>

            <Link
              to={`/services/${service.id}`}
              className="mt-auto block text-center bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              View Details
            </Link>
          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default Services;
