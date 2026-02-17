import { Link } from "react-router-dom";

function Pickup() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">

      {/* HERO SECTION */}
      <section className="py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Pickup & <span className="text-red-500">Delivery Service</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Enjoy hassle-free car servicing with our secure pickup and delivery
          option right from your doorstep.
        </p>
      </section>


      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Pickup Works
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">

          <div>
            <div className="text-red-500 text-4xl mb-3">1</div>
            <h3 className="font-semibold">Book Online</h3>
            <p className="text-gray-400 text-sm mt-2">
              Schedule service and select pickup option.
            </p>
          </div>

          <div>
            <div className="text-red-500 text-4xl mb-3">2</div>
            <h3 className="font-semibold">Vehicle Pickup</h3>
            <p className="text-gray-400 text-sm mt-2">
              Our executive collects your car safely.
            </p>
          </div>

          <div>
            <div className="text-red-500 text-4xl mb-3">3</div>
            <h3 className="font-semibold">Service Process</h3>
            <p className="text-gray-400 text-sm mt-2">
              Certified mechanics complete servicing.
            </p>
          </div>

          <div>
            <div className="text-red-500 text-4xl mb-3">4</div>
            <h3 className="font-semibold">Delivery Back</h3>
            <p className="text-gray-400 text-sm mt-2">
              Car delivered back to your location.
            </p>
          </div>

        </div>
      </section>


      {/* SAFETY MEASURES */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Safety & Transparency
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Vehicle Inspection</h3>
            <p className="text-gray-400 text-sm">
              Complete inspection before and after servicing.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Live Updates</h3>
            <p className="text-gray-400 text-sm">
              Get real-time service progress updates.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Secure Handling</h3>
            <p className="text-gray-400 text-sm">
              Trained professionals handle your vehicle safely.
            </p>
          </div>

        </div>
      </section>


      {/* TIMELINE & CHARGES */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Service Timeline
            </h2>
            <ul className="space-y-4 text-gray-400">
              <li>🚗 Pickup within 2 hours of booking</li>
              <li>🔧 Service completion within 24 hours</li>
              <li>📦 Delivery on the same or next day</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Pickup Charges
            </h2>
            <ul className="space-y-4 text-gray-400">
              <li>Free within 5km radius</li>
              <li>₹199 for 5–15km distance</li>
              <li>Custom charges beyond 15km</li>
            </ul>
          </div>

        </div>
      </section>


      {/* CTA SECTION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for Pickup?
        </h2>

        <Link
          to="/booking"
          className="bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
        >
          Schedule Pickup Now
        </Link>
      </section>

    </div>
  );
}

export default Pickup;
