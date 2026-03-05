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

  const getPrimaryImage = (service) => service.images?.[0] || service.image || "";

  return (
    <div className="page-shell py-10">
      <div className="mb-8">
        <h1 className="section-title">Services</h1>
        <p className="mt-2 text-sm text-muted">Live data from `GET /services`.</p>
      </div>

      {loading && <p className="text-sm text-muted">Loading services...</p>}
      {error && (
        <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <article key={service._id} className="glass-card overflow-hidden p-5">
            {getPrimaryImage(service) && (
              <img
                src={getPrimaryImage(service)}
                alt={service.name}
                className="h-44 w-full rounded-xl object-cover"
              />
            )}
            <h2 className="mt-4 text-xl font-semibold">{service.name}</h2>
            <p className="mt-2 text-sm text-muted">{service.description}</p>
            {service.features?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {service.features.slice(0, 4).map((feature) => (
                  <span key={feature} className="rounded-full bg-white/10 px-3 py-1 text-xs text-[#dce8f2]">
                    {feature}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-5 flex items-center justify-between">
              <span className="font-bold text-[#ffba49]">INR {service.price}</span>
              <Link className="btn-ghost py-2 text-sm" to={`/services/${service._id}`}>
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
