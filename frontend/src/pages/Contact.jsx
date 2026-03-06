import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { submitContactMessage } from "../api/contacts";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {

      await submitContactMessage(form);

      setSent(true);

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (requestError) {

      setError(
        requestError.message || "Failed to send message. Please try again."
      );

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="page-shell py-14">

      {/* HERO */}

      <section className="mb-12 rounded-3xl bg-gradient-to-r from-black/90 via-black/80 to-black/60 p-10 shadow-xl md:p-14">

        <h1 className="text-4xl font-extrabold text-white md:text-5xl">
          Contact <span className="text-red-400">CoziCars</span>
        </h1>

        <p className="mt-3 max-w-2xl text-gray-300 md:text-lg">
          Need help with bookings, vehicle pickup, or service updates?
          Our support team is ready to assist you.
        </p>

        <div className="mt-5 h-1 w-24 rounded bg-red-500"></div>

      </section>

      <div className="grid gap-8 md:grid-cols-2">

        {/* CONTACT FORM */}

        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">

          <h2 className="text-2xl font-bold text-white">
            Send Us a Message
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            For service updates, billing help, or pickup coordination.
          </p>

          {sent ? (

            <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Your message has been received. We will get back to you shortly.
            </div>

          ) : (

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              {error && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white focus:border-red-400 outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white focus:border-red-400 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Message
                </label>

                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      message: e.target.value
                    }))
                  }
                  className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-3 text-white focus:border-red-400 outline-none transition"
                  placeholder="Describe your issue..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-red-500 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>

            </form>

          )}

        </section>

        {/* CONTACT DETAILS */}

        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">

          <h2 className="text-2xl font-bold text-white">
            Support Details
          </h2>

          <div className="mt-6 space-y-6 text-sm text-gray-200">

            <div className="flex items-center gap-3">
              <FiPhone className="text-lg text-red-400" />
              <p>+91 98564 33273</p>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-lg text-red-400" />
              <p>franky281092@gmail.com</p>
            </div>

            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 text-lg text-red-400" />
              <p>
                Mawlai Mawiong Umjapung Nengnong B <br />
                Opposite SBI Branch Mawiong <br />
                Shillong, Meghalaya 793016
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiClock className="text-lg text-red-400" />
              <p>Mon - Sat : 9:00 AM - 8:00 PM</p>
            </div>

          </div>

          <div className="mt-8 h-1 w-20 rounded bg-red-500"></div>

        </section>

      </div>

    </div>

  );
}

export default Contact;