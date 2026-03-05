import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-shell py-14">
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-black/80 via-black/70 to-black/50 p-10 shadow-xl backdrop-blur-md md:p-14">
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">
          Get in <span className="text-red-400">Touch</span>
        </h1>
        <p className="mt-3 max-w-2xl text-gray-300 md:text-lg">
          We are here to assist you with bookings, updates, billing, and pickup support.
        </p>
        <div className="mt-5 h-1 w-24 rounded bg-red-500"></div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">
          <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
          <p className="mt-2 text-sm text-gray-300">
            For service updates, billing help, or pickup coordination.
          </p>

          {sent ? (
            <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Your message has been received. We will get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-1 block text-sm text-gray-300">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white focus:border-red-400 outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white focus:border-red-400 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-300">How can we help?</label>
                <textarea
                  rows="4"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white focus:border-red-400 outline-none transition"
                  placeholder="Describe your issue..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-red-500 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600 active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">
          <h2 className="text-2xl font-bold text-white">Support Details</h2>

          <div className="mt-6 space-y-6 text-sm text-gray-200">
            <div className="flex items-center gap-3">
              <FiPhone className="text-lg text-red-400" />
              <p>+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-lg text-red-400" />
              <p>support@shillongcozicars.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FiMapPin className="text-lg text-red-400" />
              <p>Police Bazar, Shillong</p>
            </div>

            <div className="flex items-center gap-3">
              <FiClock className="text-lg text-red-400" />
              <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
            </div>
          </div>

          <div className="mt-8 h-1 w-20 rounded bg-red-500"></div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
