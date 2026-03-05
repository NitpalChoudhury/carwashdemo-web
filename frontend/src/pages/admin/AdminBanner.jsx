import { useAdminPanel } from "./useAdminPanel";

function AdminBanner() {
  const {
    loading,
    isActionLoading,
    banner,
    bannerForm,
    setBannerForm,
    handleBannerSubmit,
    handleBannerDelete,
  } = useAdminPanel();

  return (
    <div>
      <h2 className="text-2xl font-bold">Banner</h2>
      <p className="mt-1 text-sm text-muted">Update homepage headline, subtitle, and hero image.</p>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading banner...</p>
      ) : (
        <>
          {banner?.image && (
            <img src={banner.image} alt={banner.title} className="mt-5 h-56 w-full rounded-xl object-cover" />
          )}
          <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleBannerSubmit}>
            <div>
              <label className="mb-2 block text-sm">Title</label>
              <input
                value={bannerForm.title}
                onChange={(event) => setBannerForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm">Subtitle</label>
              <input
                value={bannerForm.subtitle}
                onChange={(event) => setBannerForm((prev) => ({ ...prev, subtitle: event.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm">Image</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(event) => setBannerForm((prev) => ({ ...prev, image: event.target.files?.[0] || null }))}
              />
              <p className="mt-2 text-xs text-muted">
                Auto compression is enabled on server. Max upload size: 20MB.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="flex gap-2">
                <button className="btn-brand disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isActionLoading}>
                  {isActionLoading ? "Saving..." : "Save Banner"}
                </button>
                {banner && (
                  <button
                    type="button"
                    className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleBannerDelete}
                    disabled={isActionLoading}
                  >
                    Delete Banner
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AdminBanner;
