import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, buildJsonRequest } from "../api/client";
import { useAuth } from "../context/AuthContext";

function Booking() {
  const { isAuthenticated, authFetch } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    serviceId: "",
    preferredDate: "",
    pickupAddress: "",
  });

  useEffect(() => {
    let active = true;

    apiRequest("/services")
      .then((data) => {
        if (active) setServices(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setServices([]);
      })
      .finally(() => active && setLoadingServices(false));

    return () => (active = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await authFetch("/user/bookings", buildJsonRequest("POST", form));

      setMessage(
        "🎉 Your booking has been submitted successfully. Our team will contact you shortly for confirmation. Final pricing may vary based on location and vehicle condition."
      );

      setForm({
        fullName: "",
        phone: "",
        serviceId: "",
        preferredDate: "",
        pickupAddress: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell py-12">

      {/* HEADER */}
      <section className="rounded-2xl bg-gradient-to-r from-black/70 via-black/60 to-black/40 p-10 shadow-xl backdrop-blur-lg md:p-14">
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">
          Book Your <span className="text-red-400">Service</span>
        </h1>

        <p className="mt-3 max-w-2xl text-gray-300 md:text-lg">
          Fill in your details and choose your preferred time. Our verified
          driver will pick up your vehicle and deliver it safely after servicing.
        </p>

        <div className="mt-5 h-1 w-24 rounded bg-red-500"></div>
      </section>

      {/* FORM */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">

        <h2 className="text-xl font-semibold text-white">
          Service Booking Form
        </h2>

        <p className="mt-1 text-sm text-gray-300">
          Select your service and preferred pickup date.
        </p>

        <form
          className="mt-8 grid gap-6 md:grid-cols-2"
          onSubmit={handleSubmit}
        >

          {/* FULL NAME */}
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              required
              type="text"
              className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white outline-none transition focus:border-red-400"
              value={form.fullName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Phone Number
            </label>

            <input
              required
              type="tel"
              className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white outline-none transition focus:border-red-400"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>

          {/* SERVICE SELECT */}
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Select Service
            </label>

            <select
              required
              className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white outline-none transition focus:border-red-400"
              value={form.serviceId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  serviceId: e.target.value,
                }))
              }
            >
              <option value="">Choose a service</option>

              {!loadingServices &&
                services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Preferred Date
            </label>

            <input
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-white/20 bg-black/30 p-3 text-white outline-none transition focus:border-red-400"
              value={form.preferredDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  preferredDate: e.target.value,
                }))
              }
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-gray-300">
              Pickup Address
            </label>

            <textarea
              required
              rows="4"
              className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-3 text-white outline-none transition focus:border-red-400"
              value={form.pickupAddress}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  pickupAddress: e.target.value,
                }))
              }
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-red-500 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600 active:scale-[0.97] disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Booking"}
            </button>
          </div>

        </form>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            ❌ {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            ✅ {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default Booking;