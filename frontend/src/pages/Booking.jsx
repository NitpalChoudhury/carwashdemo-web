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

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await authFetch("/user/bookings", buildJsonRequest("POST", form));
      setMessage("🎉 Your booking has been submitted successfully!");
      setForm({
        fullName: "",
        phone: "",
        serviceId: "",
        preferredDate: "",
        pickupAddress: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit booking.");
    }
  };

  return (
    <div className="page-shell py-12">

      {/* ------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------ */}
      <section className="rounded-2xl bg-gradient-to-r from-black/70 via-black/60 to-black/40 p-10 shadow-xl backdrop-blur-lg md:p-14">
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">
          Book Your <span className="text-red-400">Service</span>
        </h1>
        <p className="mt-3 text-gray-300 max-w-2xl md:text-lg">
          Fill in your details and choose your preferred time. Our verified
          driver will pick up your vehicle and deliver it safely after servicing.
        </p>
        <div className="mt-5 h-1 w-24 bg-red-500 rounded"></div>
      </section>

      {/* ------------------------------ */}
      {/* FORM */}
      {/* ------------------------------ */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">
        <h2 className="text-xl font-semibold text-white">Service Booking Form</h2>
        <p className="text-sm text-gray-300 mt-1">
          Service list loaded from <code className="text-red-400">/services</code>.
        </p>

        <form className="mt-8 grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              className="w-full rounded-lg bg-black/30 p-3 text-white border border-white/20 focus:border-red-400 outline-none transition"
              value={form.fullName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              required
              type="tel"
              className="w-full rounded-lg bg-black/30 p-3 text-white border border-white/20 focus:border-red-400 outline-none transition"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>

          {/* SERVICE SELECT */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Service
            </label>
            <select
              required
              className="w-full rounded-lg bg-black/30 p-3 text-white border border-white/20 focus:border-red-400 outline-none transition"
              value={form.serviceId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, serviceId: e.target.value }))
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
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preferred Date
            </label>
            <input
              required
              type="date"
              className="w-full rounded-lg bg-black/30 p-3 text-white border border-white/20 focus:border-red-400 outline-none transition"
              value={form.preferredDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, preferredDate: e.target.value }))
              }
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Pickup Address
            </label>
            <textarea
              required
              rows="4"
              className="w-full rounded-lg bg-black/30 p-3 text-white border border-white/20 focus:border-red-400 outline-none transition"
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
              className="
                w-full rounded-lg bg-red-500 py-3 text-lg font-semibold 
                text-white shadow-lg transition hover:bg-red-600 active:scale-[0.97]
              "
            >
              Submit Booking
            </button>
          </div>
        </form>

        {/* ------------------------------ */}
        {/* ALERTS */}
        {/* ------------------------------ */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200 animate-fadeIn">
            ❌ {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100 animate-fadeIn">
            ✅ {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;