import { useAdminPanel } from "./useAdminPanel";

function AdminContacts() {
  const {
    loading,
    isActionLoading,
    contacts,
    handleContactMarkRead,
    handleContactDelete,
  } = useAdminPanel();

  if (loading) {
    return <p className="text-sm text-muted">Loading contacts...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Contact Messages</h2>
      <p className="mt-1 text-sm text-muted">Messages submitted from the Contact form.</p>

      <div className="mt-5 space-y-3">
        {contacts.map((item) => (
          <div key={item._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-cyan-200">{item.email}</p>
                <p className="text-sm text-muted">
                  {new Date(item.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="mt-2 text-sm text-gray-200">{item.message}</p>
              </div>

              <div className="flex min-w-[180px] flex-col items-end gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "read"
                      ? "border border-emerald-300/40 bg-emerald-500/15 text-emerald-200"
                      : "border border-amber-300/40 bg-amber-500/15 text-amber-100"
                  }`}
                >
                  {item.status === "read" ? "Read" : "Unread"}
                </span>
                {item.status !== "read" && (
                  <button
                    type="button"
                    className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => handleContactMarkRead(item._id)}
                    disabled={isActionLoading}
                  >
                    Mark Read
                  </button>
                )}
                <button
                  type="button"
                  className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => handleContactDelete(item._id)}
                  disabled={isActionLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {!contacts.length && <p className="text-sm text-muted">No contact messages yet.</p>}
      </div>
    </div>
  );
}

export default AdminContacts;
