import { useAdminPanel } from "./useAdminPanel";

function AdminOverview() {

  const { loading, services, reviews, bookings, contacts, announcements, banner } = useAdminPanel();

  if (loading) {
    return <p className="text-sm text-gray-400">Loading summary...</p>;
  }

  const stats = [
    { label: "Services", value: services.length },
    { label: "Reviews", value: reviews.length },
    { label: "Bookings", value: bookings.length },
    { label: "Contacts", value: contacts.length },
    { label: "Announce", value: announcements.length },
    { label: "Banner", value: banner ? "Set" : "Not set" }
  ];

  return (
    <div>

      <h2 className="text-2xl font-bold text-white">Overview</h2>
      <p className="mt-1 text-sm text-gray-400">
        Quick status of your current admin content.
      </p>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="
              rounded-xl border border-white/10
              bg-[#0b141d]
              p-5
              text-center
              transition
              hover:scale-105
              hover:border-red-400/40
              hover:shadow-[0_0_12px_rgba(255,0,0,0.25)]
            "
          >

            {/* Title */}
            <p className="text-xs uppercase tracking-wider text-gray-400">
              {item.label}
            </p>

            {/* Value Box */}
            <div className="mt-3 flex justify-center">
              <div
                className="
                  rounded-lg
                  border border-red-400/40
                  bg-black/30
                  px-4 py-2
                  text-2xl font-bold
                  text-red-400
                "
              >
                {item.value}
              </div>
            </div>

          </div>
        ))}

      </div>

      {/* Banner Preview */}
      {banner?.image && (
        <div className="mt-8">
          <p className="mb-2 text-sm text-gray-400">Current Banner Preview</p>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-48 w-full object-cover md:h-56"
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminOverview;