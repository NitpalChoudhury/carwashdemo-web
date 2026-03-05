import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/client";

function Pricing() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPrimaryImage = (service) => service.images?.[0] || service.image || "";
  const getShortDescription = (description = "") => {
    const text = String(description).trim();
    if (!text) return "No description available.";
    return text.length > 110 ? `${text.slice(0, 110)}...` : text;
  };

  useEffect(() => {
    let isMounted = true;

    apiRequest("/services")
      .then((data) => {
        if (isMounted) setServices(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load pricing from services.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const servicesByCategory = useMemo(() => {
    const grouped = services.reduce((acc, service) => {
      const category = String(service?.category || "").trim() || "Other Services";
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {});

    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, [services]);

  return (
    <div className="page-shell py-14">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Our Pricing
        </h1>
        <p className="mt-3 text-sm text-gray-300">
          Transparent pricing powered directly by your backend services.
        </p>
      </div>

      {error && (
        <p className="mt-8 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-center text-sm text-red-200">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-10 text-center text-sm text-gray-300">Loading services...</p>
      ) : (
        <div className="mt-12 space-y-12">
          {servicesByCategory.map(([category, categoryServices]) => (
            <section key={category}>
              <h2 className="mb-5 text-2xl font-bold text-white">{category}</h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => (
                  <article
                    key={service._id}
                    className="
                      rounded-2xl border border-white/10 bg-white/5
                      shadow-[0_8px_25px_rgba(255,0,0,0.15)]
                      backdrop-blur-xl p-6 transition
                      hover:scale-[1.02] hover:border-red-400/40
                      hover:shadow-[0_12px_30px_rgba(255,0,0,0.25)]
                    "
                  >
                    {getPrimaryImage(service) && (
                      <img
                        src={getPrimaryImage(service)}
                        alt={service.name}
                        className="h-44 w-full rounded-xl border border-white/10 object-cover"
                      />
                    )}

                    <h3 className="mt-4 text-xl font-semibold text-white">{service.name}</h3>

                    <p className="mt-2 text-2xl font-extrabold text-red-400">₹{service.price}</p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-300">
                      {getShortDescription(service.description)}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Link
                        to={`/services/${service._id}`}
                        className="inline-block w-full rounded-lg border border-red-400/40 px-4 py-2 text-center text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                      >
                        View Details
                      </Link>
                      <Link
                        to="/booking"
                        className="inline-block w-full rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
                      >
                        Choose
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {!servicesByCategory.length && (
            <p className="text-center text-sm text-gray-300">No services available right now.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Pricing;
