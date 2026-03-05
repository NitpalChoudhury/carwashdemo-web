import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../../api/client";
import ReviewsBlock from "../../components/ReviewsBlock";

function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadService = async () => {
      try {
        const data = await apiRequest(`/services/${id}`);
        if (!isMounted) return;
        setService(data);
      } catch {
        if (isMounted) {
          setError("Service not found or unavailable.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadService();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const serviceImages = useMemo(() => {
    if (!service) return [];
    if (Array.isArray(service.images) && service.images.length) return service.images;
    if (service.image) return [service.image];
    return [];
  }, [service]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [service?._id]);

  const showPrevImage = () => {
    if (!serviceImages.length) return;
    setActiveImageIndex((prev) => (prev === 0 ? serviceImages.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    if (!serviceImages.length) return;
    setActiveImageIndex((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="page-shell py-14">
        <p className="text-sm text-muted">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="page-shell py-14">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <p className="mt-2 text-sm text-muted">{error || "The requested service does not exist."}</p>
          <Link to="/services" className="btn-brand mt-4 inline-block">
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass-card overflow-hidden p-4">
          {serviceImages.length ? (
            <div>
              <div className="relative">
                <img
                  src={serviceImages[activeImageIndex]}
                  alt={`${service.name}-${activeImageIndex + 1}`}
                  className="h-full w-full rounded-xl object-cover"
                />
                {serviceImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-sm"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-sm"
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
              {serviceImages.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {serviceImages.map((url, index) => (
                    <button
                      key={`thumb-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`overflow-hidden rounded-md border ${
                        index === activeImageIndex ? "border-[#ffba49]" : "border-white/20"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${service.name}-thumb-${index + 1}`}
                        className="h-16 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-60 items-center justify-center rounded-xl bg-black/20 text-muted">
              No image uploaded
            </div>
          )}
        </div>

        <div className="glass-card p-7">
          <h1 className="text-3xl font-bold">{service.name}</h1>
          <p className="mt-3 text-sm text-muted">{service.description}</p>
          <p className="mt-4 text-2xl font-extrabold text-[#ffba49]">INR {service.price}</p>
          <h2 className="mt-6 font-semibold">Features</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#d4e2ee]">
            {(service.features || []).map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-brand" to="/booking">
              Book this service
            </Link>
            <Link className="btn-ghost" to="/services">
              Browse others
            </Link>
          </div>
        </div>
      </div>

      <ReviewsBlock title="Customer Reviews" limit={3} />
    </div>
  );
}

export default ServiceDetailsPage;
