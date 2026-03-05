import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/client";

function PricingTable() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      try {
        const data = await apiRequest("/services");
        if (!active) return;
        setServices(Array.isArray(data) ? data : []);
      } catch {
        if (!active) return;
        setError("Failed to load price list.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-400">Loading price list...</p>;
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
        {error}
      </p>
    );
  }

  if (!services.length) {
    return <p className="text-sm text-gray-400">No services available right now.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/20">
      <table className="min-w-full overflow-hidden">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Service</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-black/40 text-white">
          {services.map((service) => (
            <tr key={service._id} className="border-t border-white/10">
              <td className="px-4 py-3 font-medium">{service.name}</td>
              <td className="px-4 py-3 text-sm text-gray-300">{service.description || "-"}</td>
              <td className="px-4 py-3 text-right font-semibold">INR {service.price}</td>
              <td className="px-4 py-3 text-center">
                <Link
                  to={`/services/${service._id}`}
                  className="rounded-lg border border-red-400/40 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PricingTable;
