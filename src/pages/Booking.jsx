import { useState } from "react";

function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-20 px-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
          Book <span className="text-red-500">Your Service</span>
        </h1>

        {submitted ? (
          <div className="bg-green-600 text-white p-6 rounded-lg text-center">
            ✅ Your booking request has been submitted successfully!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 p-8 rounded-xl shadow-lg space-y-6"
          >

            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* Car Model */}
            <div>
              <label className="block mb-2 text-sm">Car Model</label>
              <input
                type="text"
                required
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500"
                placeholder="e.g. Hyundai i20"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block mb-2 text-sm">Select Service</label>
              <select
                required
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500"
              >
                <option value="">Choose Service</option>
                <option>Basic Service</option>
                <option>Standard Service</option>
                <option>Premium Service</option>
                <option>AC Repair</option>
                <option>Full Inspection</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 text-sm">Preferred Date</label>
              <input
                type="date"
                required
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Pickup Option */}
            <div>
              <label className="block mb-2 text-sm">Pickup Address</label>
              <textarea
                rows="3"
                required
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500"
                placeholder="Enter pickup address"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Confirm Booking
            </button>

          </form>
        )}
      </div>

    </div>
  );
}

export default Booking;
