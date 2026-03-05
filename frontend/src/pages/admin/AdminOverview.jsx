import { useAdminPanel } from "./useAdminPanel";

function AdminOverview() {
  const { loading, services, reviews, banner } = useAdminPanel();

  if (loading) {
    return <p className="text-sm text-muted">Loading summary...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Overview</h2>
      <p className="mt-1 text-sm text-muted">Quick status of your current admin content.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">Services</p>
          <p className="mt-2 text-3xl font-extrabold text-[#ffba49]">{services.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">Reviews</p>
          <p className="mt-2 text-3xl font-extrabold text-[#ffba49]">{reviews.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">Banner</p>
          <p className="mt-2 text-lg font-bold text-[#ffba49]">{banner ? "Configured" : "Not set"}</p>
        </div>
      </div>

      {banner?.image && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-muted">Current Banner Preview</p>
          <img src={banner.image} alt={banner.title} className="h-56 w-full rounded-xl object-cover" />
        </div>
      )}
    </div>
  );
}

export default AdminOverview;
