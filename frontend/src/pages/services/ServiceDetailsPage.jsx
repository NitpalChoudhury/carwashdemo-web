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
    let mounted = true;

    const loadService = async () => {
      try {
        const data = await apiRequest(`/services/${id}`);
        if (!mounted) return;
        setService(data);
      } catch {
        if (mounted) setError("Service not found or unavailable.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadService();

    return () => {
      mounted = false;
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

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? serviceImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === serviceImages.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="page-shell py-16 text-center">
        <p className="text-gray-400">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="page-shell py-16">
        <div className="glass-card p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Service Not Found</h1>
          <p className="mt-2 text-gray-400">
            {error || "The requested service does not exist."}
          </p>
          <Link to="/services" className="btn-brand mt-6 inline-block">
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell py-14">

      <div className="grid gap-10 md:grid-cols-2">

        {/* IMAGE SECTION */}
        <div className="glass-card p-4 max-w-[480px]">

          {serviceImages.length ? (

            <div>

              <div className="relative overflow-hidden rounded-2xl bg-black/30 p-3 shadow-2xl">

                {/* 2:3 IMAGE */}
                <div className="w-full aspect-[2/3] overflow-hidden rounded-xl">

                  <img
                    src={serviceImages[activeImageIndex]}
                    alt={service.name}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />

                </div>

                {serviceImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 
                      bg-white/10 backdrop-blur-md hover:bg-red-500 
                      text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                    >
                      ‹
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 
                      bg-white/10 backdrop-blur-md hover:bg-red-500 
                      text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                    >
                      ›
                    </button>
                  </>
                )}

              </div>

              {/* THUMBNAILS */}
              {serviceImages.length > 1 && (

                <div className="mt-4 flex gap-2 overflow-x-auto">

                  {serviceImages.map((img, index) => (

                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`rounded-lg border ${
                        index === activeImageIndex
                          ? "border-red-500"
                          : "border-white/20"
                      }`}
                    >

                      <img
                        src={img}
                        alt="thumb"
                        className="h-16 w-20 object-cover rounded-md"
                      />

                    </button>

                  ))}

                </div>

              )}

            </div>

          ) : (

            <div className="flex h-[350px] items-center justify-center text-gray-400">
              No image uploaded
            </div>

          )}

        </div>

        {/* SERVICE INFO */}
        <div className="glass-card p-8">

          <h1 className="text-3xl font-bold text-white">
            {service.name}
          </h1>

          <p className="mt-4 text-gray-400">
            {service.description}
          </p>

          <div className="mt-6 inline-block rounded-full 
          bg-gradient-to-r from-red-500 to-red-700
          px-6 py-2 text-lg font-bold text-white shadow-lg">

            ₹ {service.price}

          </div>

          <h2 className="mt-8 text-lg font-semibold text-white">
            Features
          </h2>

          <ul className="mt-4 grid gap-3 text-gray-300">

            {(service.features || []).map((feature) => (

              <li key={feature} className="flex items-center gap-3">

                <span className="flex h-6 w-6 items-center justify-center 
                rounded-full bg-red-500 text-white text-xs">
                  ✓
                </span>

                {feature}

              </li>

            ))}

          </ul>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              className="rounded-xl bg-gradient-to-r from-red-500 to-red-700
              px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition"
              to="/booking"
            >
              Book this service
            </Link>

            <Link
              className="rounded-xl border border-white/20
              px-6 py-3 text-gray-300 hover:bg-white/10 transition"
              to="/services"
            >
              Browse others
            </Link>

          </div>

        </div>

      </div>

      {/* Reviews */}
      <div className="mt-20">
        <ReviewsBlock title="Customer Reviews" limit={3} />
      </div>

    </div>
  );
}

export default ServiceDetailsPage;