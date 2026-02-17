import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-20 px-6">

      {/* PAGE TITLE */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-red-500">Pricing Plans</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose the perfect service package for your car. Transparent pricing,
          no hidden charges.
        </p>
      </div>

      {/* PRICING CARDS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* BASIC PLAN */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold mb-4">Basic Service</h2>
          <p className="text-4xl font-bold mb-6 text-red-500">₹999</p>

          <ul className="space-y-3 text-gray-400 mb-8">
            <li>✔ Engine Oil Replacement</li>
            <li>✔ Oil Filter Change</li>
            <li>✔ Basic Inspection</li>
            <li>✖ AC Service</li>
            <li>✖ Pickup & Delivery</li>
          </ul>

          <Link
            to="/booking"
            className="block text-center bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Choose Plan
          </Link>
        </div>


        {/* STANDARD PLAN (Highlighted) */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border-2 border-red-600 scale-105">
          <div className="text-center mb-4">
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center">
            Standard Service
          </h2>
          <p className="text-4xl font-bold mb-6 text-red-500 text-center">
            ₹1999
          </p>

          <ul className="space-y-3 text-gray-400 mb-8">
            <li>✔ Everything in Basic</li>
            <li>✔ AC Cleaning</li>
            <li>✔ Brake Inspection</li>
            <li>✔ Interior Cleaning</li>
            <li>✖ Free Pickup</li>
          </ul>

          <Link
            to="/booking"
            className="block text-center bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Choose Plan
          </Link>
        </div>


        {/* PREMIUM PLAN */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold mb-4">Premium Service</h2>
          <p className="text-4xl font-bold mb-6 text-red-500">₹2999</p>

          <ul className="space-y-3 text-gray-400 mb-8">
            <li>✔ Everything in Standard</li>
            <li>✔ Full Car Inspection</li>
            <li>✔ AC Gas Refill</li>
            <li>✔ Free Pickup & Delivery</li>
            <li>✔ Priority Support</li>
          </ul>

          <Link
            to="/booking"
            className="block text-center bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Choose Plan
          </Link>
        </div>

      </div>


      {/* COMPARISON SECTION */}
      <div className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Plan Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-800 text-center">
            <thead className="bg-slate-900">
              <tr>
                <th className="p-4 border border-slate-800">Features</th>
                <th className="p-4 border border-slate-800">Basic</th>
                <th className="p-4 border border-slate-800">Standard</th>
                <th className="p-4 border border-slate-800">Premium</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr>
                <td className="p-4 border border-slate-800">Oil Change</td>
                <td className="border border-slate-800">✔</td>
                <td className="border border-slate-800">✔</td>
                <td className="border border-slate-800">✔</td>
              </tr>
              <tr>
                <td className="p-4 border border-slate-800">AC Service</td>
                <td className="border border-slate-800">✖</td>
                <td className="border border-slate-800">✔</td>
                <td className="border border-slate-800">✔</td>
              </tr>
              <tr>
                <td className="p-4 border border-slate-800">Pickup</td>
                <td className="border border-slate-800">✖</td>
                <td className="border border-slate-800">✖</td>
                <td className="border border-slate-800">✔</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Pricing;
