import { Link } from "react-router-dom";

function Pickup() {
  const policySections = [
    {
      title: "1. Service Area",
      points: [
        "Pickup and drop are available only in selected zones of Shillong.",
        "Serviceability depends on address, slot availability, and weather/traffic conditions.",
      ],
    },
    {
      title: "2. Pickup Timing",
      points: [
        "Standard pickup window is Monday to Saturday, 9:00 AM to 8:00 PM.",
        "Pickup ETA is shared after booking confirmation and may vary due to traffic.",
      ],
    },
    {
      title: "3. Pickup Charges",
      points: [
        "Pickup may be free in eligible zones; otherwise additional charges can apply.",
        "Any pickup or distance charge is shown before final booking confirmation.",
      ],
    },
    {
      title: "4. Customer Responsibilities",
      points: [
        "Vehicle must be accessible at the selected pickup location and time.",
        "Please remove valuables, cash, and personal documents from the vehicle before handover.",
        "Provide correct contact details so our driver can coordinate pickup smoothly.",
      ],
    },
    {
      title: "5. Vehicle Handover",
      points: [
        "Driver identity can be verified at pickup before handing over keys.",
        "Existing visible issues may be noted at handover for transparency.",
      ],
    },
    {
      title: "6. Reschedule or Cancellation",
      points: [
        "Please reschedule/cancel early whenever possible to avoid slot loss.",
        "Last-minute cancellation or no-response at pickup point may lead to a service fee.",
      ],
    },
    {
      title: "7. Delays and Exceptions",
      points: [
        "Delays due to traffic, rain, civic restrictions, or technical reasons can occur.",
        "In rare cases, pickup may be moved to the next available slot.",
      ],
    },
    {
      title: "8. Damage and Claims",
      points: [
        "If any issue is noticed at delivery, report it immediately to support.",
        "Claims are reviewed case-by-case based on pickup/delivery inspection notes.",
      ],
    },
  ];

  return (
    <div className="page-shell py-14">
      <section className="rounded-2xl bg-gradient-to-r from-black/80 via-black/70 to-black/50 p-10 shadow-2xl backdrop-blur-md md:p-14">
        <h1 className="text-4xl font-extrabold tracking-wide text-white md:text-5xl">
          Pickup <span className="text-red-400">Policy</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
          Please review these terms before booking pickup and delivery for your vehicle.
        </p>
        <div className="mt-6 h-1 w-24 rounded bg-red-500"></div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {policySections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-lg"
          >
            <h2 className="text-lg font-bold text-white">{section.title}</h2>
            <ul className="mt-4 space-y-2">
              {section.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-red-400"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-100">
        Final pickup eligibility, charges, and timing are confirmed during booking based on your location and slot availability.
      </section>

      <section className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/booking"
          className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600 active:scale-95"
        >
          Book Pickup
        </Link>
        <Link
          to="/contact"
          className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white backdrop-blur-md hover:bg-white/10 active:scale-95"
        >
          Ask Support
        </Link>
      </section>
    </div>
  );
}

export default Pickup;
