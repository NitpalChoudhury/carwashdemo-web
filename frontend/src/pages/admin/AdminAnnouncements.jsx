import { useAdminPanel } from "./useAdminPanel";

function AdminAnnouncements() {
  const {
    loading,
    isActionLoading,
    announcements,
    announcementForm,
    setAnnouncementForm,
    handleAnnouncementSubmit,
    handleAnnouncementDelete,
    startEditAnnouncement,
    setInitialAnnouncementForm,
  } = useAdminPanel();

  return (
    <div>
      <h2 className="text-2xl font-bold">Announcements</h2>
      <p className="mt-1 text-sm text-muted">Create and manage top-bar announcements.</p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleAnnouncementSubmit}>
        <textarea
          className="md:col-span-2"
          placeholder="Announcement message"
          value={announcementForm.message}
          onChange={(event) =>
            setAnnouncementForm((prev) => ({ ...prev, message: event.target.value }))
          }
          required
        />

        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={announcementForm.isActive}
            onChange={(event) =>
              setAnnouncementForm((prev) => ({ ...prev, isActive: event.target.checked }))
            }
          />
          Active
        </label>

        <div className="flex gap-2 md:col-span-2">
          <button className="btn-brand disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isActionLoading}>
            {isActionLoading ? "Saving..." : announcementForm.id ? "Update Announcement" : "Create Announcement"}
          </button>
          {announcementForm.id && (
            <button
              type="button"
              className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
              onClick={setInitialAnnouncementForm}
              disabled={isActionLoading}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading announcements...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{announcement.message}</p>
                  <p className="mt-1 text-xs text-muted">
                    Status: {announcement.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => startEditAnnouncement(announcement)}
                    disabled={isActionLoading}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => handleAnnouncementDelete(announcement._id)}
                    disabled={isActionLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!announcements.length && (
            <p className="text-sm text-muted">No announcements yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncements;
