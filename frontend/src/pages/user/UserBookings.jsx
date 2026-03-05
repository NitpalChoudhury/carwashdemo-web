import { useUserPanel } from "./useUserPanel";

function UserBookings() {
  const { bookings, loading } = useUserPanel();

  return (
    <div>
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <p className="mt-1 text-sm text-muted">
        Booking creation is available on the main booking page. This section only shows your booking history.
      </p>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-muted">Loading bookings...</p>
        ) : bookings.length ? (
          bookings.map((booking) => (
            <div key={booking._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{booking.service?.name || "Service"}</h3>
                  <p className="text-sm text-muted">
                    Date: {new Date(booking.preferredDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted">Pickup: {booking.pickupAddress}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{booking.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default UserBookings;
