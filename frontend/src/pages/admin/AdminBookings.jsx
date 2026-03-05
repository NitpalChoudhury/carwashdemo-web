import { useAdminPanel } from "./useAdminPanel";

const statusOptions = [
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];

function AdminBookings() {
  const {
    loading,
    isActionLoading,
    bookings,
    handleBookingStatusUpdate,
    handleBookingDelete,
  } = useAdminPanel();

  if (loading) {
    return <p className="text-sm text-muted">Loading bookings...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Bookings</h2>
      <p className="mt-1 text-sm text-muted">Manage all user bookings and update service status.</p>

      <div className="mt-6 space-y-3">
        {bookings.length ? (
          bookings.map((booking) => (
            <div key={booking._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-semibold">{booking.service?.name || "Service"}</p>
                  <p className="text-sm text-muted">Customer: {booking.fullName}</p>
                  <p className="text-sm text-muted">Phone: {booking.phone}</p>
                  <p className="text-sm text-muted">Email: {booking.user?.email || "N/A"}</p>
                  <p className="text-sm text-muted">
                    Date: {new Date(booking.preferredDate).toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-sm text-muted">Pickup: {booking.pickupAddress}</p>
                </div>

                <div className="flex min-w-[240px] flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.14em] text-muted">Status</label>
                  <select
                    value={booking.status}
                    onChange={(event) => handleBookingStatusUpdate(booking._id, event.target.value)}
                    disabled={isActionLoading}
                    className="disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-ghost mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => handleBookingDelete(booking._id)}
                    disabled={isActionLoading}
                  >
                    Delete Booking
                  </button>
                </div>
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

export default AdminBookings;
