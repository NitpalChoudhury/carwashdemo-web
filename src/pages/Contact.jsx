import { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          Contact <span className="text-red-500">Us</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have questions? Need assistance? Our team is here to help you.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg"
        >

          {submitted ? (
            <div className="bg-green-600 p-6 rounded-lg text-center">
              ✅ Message sent successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500 transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500 transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-red-500 transition"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Send Message
              </button>

            </form>
          )}

        </motion.div>


        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-400">+91 9876543210</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">📧 Email</h3>
            <p className="text-gray-400">support@autocare.com</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">📍 Address</h3>
            <p className="text-gray-400">Kolkata, India</p>
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-60"
              loading="lazy"
            ></iframe>
          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Contact;
