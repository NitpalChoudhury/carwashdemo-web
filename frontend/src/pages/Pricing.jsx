import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/client";

function Pricing() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const getPrimaryImage = (service) => service.images?.[0] || service.image || "";

  useEffect(() => {
    let isMounted = true;

    apiRequest("/services")
      .then((data) => {
        if (isMounted) setServices(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load pricing from services.");
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service._id}
            className="
              rounded-2xl border border-white/10 bg-white/5 
              shadow-[0_8px_25px_rgba(255,0,0,0.15)]
              backdrop-blur-xl p-7 transition
              hover:scale-[1.03] hover:border-red-400/40 
              hover:shadow-[0_12px_30px_rgba(255,0,0,0.25)]
            "
          >
            {/* Image */}
            {getPrimaryImage(service) && (
              <img
                src={getPrimaryImage(service)}
                alt={service.name}
                className="h-44 w-full rounded-xl border border-white/10 object-cover"
              />
            )}

            {/* Title */}
            <h2 className="mt-5 text-2xl font-semibold text-white">
              {service.name}
            </h2>

            {/* Price */}
            <p className="mt-4 text-[2.4rem] font-extrabold text-red-400">
              ₹{service.price}
            </p>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {service.description}
            </p>

            {/* Features */}
            <ul className="mt-5 space-y-2 text-sm">
              {(service.features || []).slice(0, 5).map((feature, index) => (
                <li
                  key={index}
                  className="text-gray-200 flex items-center gap-2"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-red-400"></span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Choose button */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Link
                to={`/services/${service._id}`}
                className="
                  inline-block w-full rounded-lg border border-red-400/40
                  px-5 py-3 text-center text-sm font-semibold text-red-300
                  transition hover:bg-red-500/10
                "
              >
                View Details
              </Link>
              <Link
                to="/booking"
                className="
                  inline-block w-full rounded-lg bg-red-500
                  px-5 py-3 text-center text-sm font-semibold text-white
                  transition hover:bg-red-600 active:scale-95
                "
              >
                Choose Plan
              </Link>
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">
              Open details to slide through all service photos.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
