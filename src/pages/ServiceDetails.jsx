import { useParams, Link } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams();

  // Demo data (later you can fetch from backend)
  const serviceData = {
    "oil-change": {
      title: "Oil Change Service",
      price: "₹999",
      duration: "2 Hours",
      description:
        "Complete engine oil replacement with premium quality oil and filter.",
    },
    "ac-service": {
      title: "AC Service",
      price: "₹1499",
      duration: "3 Hours",
      description:
        "Full AC cleaning, gas refill, and cooling system inspection.",
    },
    "full-inspection": {
      title: "Full Car Inspection",
      price: "₹1999",
      duration: "4 Hours",
      description:
        "Comprehensive 50-point car inspection and safety check.",
    },
  };

  const service = serviceData[id];

  if (!service) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl">Service Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen">

      {/* HERO */}
      <section className="py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {service.title}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {service.description}
        </p>
      </section>


      {/* DETAILS SECTION */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* What's Included */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              What’s Included
            </h2>

            <ul className="space-y-4 text-gray-400">
              <li>✔ High-quality parts & materials</li>
              <li>✔ Certified mechanic inspection</li>
              <li>✔ Complete safety check</li>
              <li>✔ Transparent billing</li>
              <li>✔ Service warranty</li>
            </ul>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Service Price
            </h3>

            <p className="text-4xl font-bold text-red-500 mb-4">
              {service.price}
            </p>

            <p className="text-gray-400 mb-4">
              Duration: {service.duration}
            </p>

            <Link
              to="/booking"
              className="block text-center bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Book Now
            </Link>
          </div>

        </div>
      </section>


      {/* FAQ SECTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              Is pickup & delivery available?
            </h3>
            <p className="text-gray-400 text-sm">
              Yes, pickup & delivery is available based on your selected plan.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              Are genuine parts used?
            </h3>
            <p className="text-gray-400 text-sm">
              Yes, we only use 100% genuine and high-quality parts.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              How long does the service take?
            </h3>
            <p className="text-gray-400 text-sm">
              Service duration depends on the selected package.
            </p>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="py-20 px-6 bg-red-600 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Book This Service?
        </h2>

        <Link
          to="/booking"
          className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
        >
          Book Appointment
        </Link>
      </section>

    </div>
  );
}

export default ServiceDetails;
