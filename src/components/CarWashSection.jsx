import { useState } from "react";
import { motion } from "framer-motion";

function CarWashSection() {
  const [service, setService] = useState("Basic Wash");
  const [carType, setCarType] = useState("Hatchback");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const servicePrices = {
    "Basic Wash": 499,
    "Premium Wash": 999,
    "Interior + Exterior": 1499,
  };

  const carMultiplier = {
    Hatchback: 1,
    Sedan: 1.2,
    SUV: 1.5,
  };

  const basePrice = servicePrices[service];
  const multiplier = carMultiplier[carType];
  const total = Math.round(basePrice * multiplier);

  return (
    <section className="py-20 px-6 bg-slate-900 text-white">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚗 Book Car Washing Service
          </h2>

          <p className="text-gray-400 mb-8">
            Choose your wash package and schedule a doorstep cleaning service.
          </p>

          {/* Dropdowns */}
          <div className="space-y-5">

            {/* Service Type */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Select Wash Package
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none"
              >
                <option>Basic Wash</option>
                <option>Premium Wash</option>
                <option>Interior + Exterior</option>
              </select>
            </div>

            {/* Car Type */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Select Car Type
              </label>
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700"
              >
                <option>Hatchback</option>
                <option>Sedan</option>
                <option>SUV</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Select Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700"
              >
                <option value="">Choose Time</option>
                <option>9:00 AM - 11:00 AM</option>
                <option>12:00 PM - 2:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
              </select>
            </div>

          </div>

          <button className="mt-8 bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold">
            Confirm Booking
          </button>
        </motion.div>

        {/* RIGHT SUMMARY CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700"
        >
          <h3 className="text-2xl font-bold mb-6">
            Booking Summary
          </h3>

          <div className="space-y-4 text-gray-300">

            <div className="flex justify-between">
              <span>Service</span>
              <span>{service}</span>
            </div>

            <div className="flex justify-between">
              <span>Car Type</span>
              <span>{carType}</span>
            </div>

            <div className="flex justify-between">
              <span>Base Price</span>
              <span>₹{basePrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Size Multiplier</span>
              <span>x{multiplier}</span>
            </div>

            <hr className="border-slate-600" />

            <div className="flex justify-between text-xl font-bold text-red-500">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
}

export default CarWashSection;
