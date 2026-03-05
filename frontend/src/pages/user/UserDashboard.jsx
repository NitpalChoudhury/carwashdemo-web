import { useUserPanel } from "./useUserPanel";

function UserDashboard() {
  const { loading, dashboard, bookings, cars, profile } = useUserPanel();
  const recent = dashboard?.recentBooking;

  if (loading) {
    return <p className="text-sm text-muted">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Welcome back, {profile?.name || "User"}.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">My Bookings</p>
          <p className="mt-2 text-3xl font-extrabold text-[#ffba49]">{dashboard?.stats?.bookings || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">My Cars</p>
          <p className="mt-2 text-3xl font-extrabold text-[#ffba49]">{dashboard?.stats?.cars || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">My Addresses</p>
          <p className="mt-2 text-3xl font-extrabold text-[#ffba49]">{dashboard?.stats?.addresses || 0}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 md:col-span-2">
          <h2 className="text-lg font-semibold">Recent Booking</h2>
          {recent ? (
            <div className="mt-3 text-sm text-[#d8e7f3]">
              <p>Service: {recent?.service?.name || "Unknown Service"}</p>
              <p>Date: {new Date(recent.preferredDate).toLocaleDateString()}</p>
              <p>Status: {recent.status}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">No recent booking found.</p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <h2 className="text-lg font-semibold">My Cars Preview</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#d8e7f3]">
            {cars.slice(0, 3).map((car) => (
              <li key={car._id}>
                {car.make} {car.model}
              </li>
            ))}
            {cars.length === 0 && <li className="text-muted">No cars added.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
        <h2 className="text-lg font-semibold">Latest Bookings</h2>
        <div className="mt-3 space-y-2 text-sm text-[#d8e7f3]">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking._id} className="flex flex-wrap items-center justify-between gap-2">
              <span>{booking.service?.name || "Service"}</span>
              <span>{booking.status}</span>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-muted">No bookings yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
