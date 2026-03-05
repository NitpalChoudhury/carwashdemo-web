import { Link } from "react-router-dom";

function Pickup() {
  const steps = [
    { title: "Choose service and slot", icon: "1" },
    { title: "Driver verification at pickup", icon: "2" },
    { title: "Live service updates", icon: "3" },
    { title: "Final QC and delivery", icon: "4" },
  ];

  return (
    <div className="page-shell py-14">
      <section className="rounded-2xl bg-gradient-to-r from-black/80 via-black/70 to-black/50 p-10 shadow-2xl backdrop-blur-md md:p-14">
        <h1 className="text-4xl font-extrabold tracking-wide text-white md:text-5xl">
          Hassle-Free <span className="text-red-400">Pickup and Delivery</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
          Verified drivers, live updates, and transparent handover from doorstep to workshop and back.
        </p>
        <div className="mt-6 h-1 w-24 rounded bg-red-500"></div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.icon}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-lg transition hover:scale-[1.03]"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-500 font-bold text-white">
              {step.icon}
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-200">{step.title}</h3>
          </div>
        ))}
      </section>

      <section className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/booking"
          className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600 active:scale-95"
        >
          Schedule Pickup
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
