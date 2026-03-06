import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/client";

function Pricing() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPrimaryImage = (service) =>
    service.images?.[0] || service.image || "";

  const getShortDescription = (description = "") => {
    const text = String(description).trim();
    if (!text) return "No description available.";
    return text.length > 120 ? `${text.slice(0, 120)}...` : text;
  };

  useEffect(() => {
    let isMounted = true;

    apiRequest("/services")
      .then((data) => {
        if (isMounted) setServices(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load pricing.");
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
      const category =
        String(service?.category || "").trim() || "Other Services";
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {});
    return Object.entries(grouped).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [services]);

  return (
    <div className="page-shell py-16">

      {/* HEADER */}
      <div className="text-center mb-14 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
          Our Pricing
        </h1>
        <p className="mt-3 text-gray-400 text-sm md:text-base">
          Transparent pricing powered directly by your backend services.
        </p>
      </div>

      {error && (
        <p className="mb-8 text-center text-red-300">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-gray-400">
          Loading services...
        </p>
      ) : (
        <div className="space-y-16">

          {servicesByCategory.map(([category, categoryServices]) => (
            <section key={category}>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-8 px-4">
                {category}
              </h2>

              <div className="space-y-10">

                {categoryServices.map((service) => (

                  <div
                    key={service._id}
                    className="
                    grid
                    grid-cols-1
                    lg:grid-cols-[480px_1fr]
                    gap-8 lg:gap-10
                    items-center
                    bg-white/5
                    border border-white/10
                    rounded-2xl
                    p-6 md:p-8
                    backdrop-blur-xl
                    shadow-[0_10px_40px_rgba(255,0,0,0.15)]
                    hover:shadow-[0_15px_60px_rgba(255,0,0,0.25)]
                    transition
                    mx-4
                    "
                  >

                    {/* IMAGE */}
                    {getPrimaryImage(service) && (
                      <div className="w-full max-w-[480px] aspect-[2/3] overflow-hidden rounded-xl border border-white/10 mx-auto lg:mx-0">

                        <img
                          src={getPrimaryImage(service)}
                          alt={service.name}
                          className="w-full h-full object-cover transition duration-500 hover:scale-105"
                        />

                      </div>
                    )}

                    {/* CONTENT */}
                    <div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {service.name}
                      </h3>

                      <p className="text-gray-400 mt-3 max-w-xl">
                        {getShortDescription(service.description)}
                      </p>

                      <div className="mt-6 text-xl md:text-2xl font-extrabold text-red-400">
                        ₹{service.price}
                      </div>

                      {/* FEATURES */}
                      <div className="mt-6 text-gray-300 text-sm space-y-1">
                        <p>✔ Premium Cleaning</p>
                        <p>✔ Safe for Vehicle</p>
                        <p>✔ Eco Friendly Products</p>
                      </div>

                      {/* BUTTONS */}
                      <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                          to="/booking"
                          className="
                          bg-red-500
                          hover:bg-red-600
                          px-6 py-3
                          rounded-lg
                          font-semibold
                          text-white
                          transition
                          "
                        >
                          Book this service
                        </Link>

                        <Link
                          to={`/services/${service._id}`}
                          className="
                          border border-white/20
                          px-6 py-3
                          rounded-lg
                          text-gray-200
                          hover:bg-white/10
                          transition
                          "
                        >
                          Browse others
                        </Link>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>
          ))}

          {!servicesByCategory.length && (
            <p className="text-center text-gray-400">
              No services available right now.
            </p>
          )}

        </div>
      )}

    </div>
  );
}

export default Pricing;