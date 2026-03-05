import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../api/client";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const data = await apiRequest("/services");
        if (!isMounted) return;
        setServices(Array.isArray(data) ? data : []);
      } catch {
        if (isMounted) setError("Failed to load services.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const getPrimaryImage = (service) =>
    service.images?.[0] || service.image || "";

  return (
    <div className="page-shell py-14">

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white">Our Services</h1>
        <div className="mx-auto mt-3 h-[2px] w-24 bg-gradient-to-r from-red-500 to-red-700"></div>
        <p className="mt-4 text-sm text-gray-400">
          Premium car detailing & servicing packages
        </p>
      </div>

      {loading && (
        <p className="text-center text-sm text-gray-400">Loading services...</p>
      )}

      {error && (
        <p className="mx-auto max-w-md rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200 text-center">
          {error}
        </p>
      )}

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {services.map((service) => (
          <article
            key={service._id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            {/* Image */}
            {getPrimaryImage(service) && (
              <div className="overflow-hidden">
                <img
                  src={getPrimaryImage(service)}
                  alt={service.name}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            )}

            <div className="p-6">

              {/* Service Name */}
              <h2 className="text-xl font-semibold text-white">
                {service.name}
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-400">
                {service.description}
              </p>

              {/* Features */}
              {service.features?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Section */}
              <div className="mt-6 flex items-center justify-between">

                <span className="rounded-full bg-gradient-to-r from-red-500 to-red-700 px-4 py-1 text-sm font-bold text-white">
                  ₹{service.price}
                </span>

                <Link
                  className="text-sm font-semibold text-red-400 hover:text-red-500"
                  to={`/services/${service._id}`}
                >
                  View Details →
                </Link>

              </div>

            </div>

          </article>
        ))}

      </div>
    </div>
  );
}

export default ServicesPage;