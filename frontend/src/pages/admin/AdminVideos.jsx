import { useAdminPanel } from "./useAdminPanel";

function AdminVideos() {
  const {
    isActionLoading,
    videoForm,
    setVideoForm,
    videoInputResetKey,
    handleVideoSubmit,
    handleVideoDeleteByType,
    handleVideoDeleteAll,
    handleVideoDeleteItem,
  } = useAdminPanel();

  return (
    <div>
      <h2 className="text-2xl font-bold">Videos</h2>
      <p className="mt-1 text-sm text-muted">
        New uploads are added to list. They do not replace existing videos.
      </p>

      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleVideoSubmit}>
        <div>
          <label className="mb-2 block text-sm">Short Videos (Vertical)</label>
          <input
            key={`short-${videoInputResetKey}`}
            type="file"
            multiple
            accept="video/mp4,video/quicktime,video/webm"
            onChange={(event) =>
              setVideoForm((prev) => ({
                ...prev,
                shortVideosToUpload: event.target.files ? Array.from(event.target.files) : [],
              }))
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Landscape Videos</label>
          <input
            key={`landscape-${videoInputResetKey}`}
            type="file"
            multiple
            accept="video/mp4,video/quicktime,video/webm"
            onChange={(event) =>
              setVideoForm((prev) => ({
                ...prev,
                landscapeVideosToUpload: event.target.files ? Array.from(event.target.files) : [],
              }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            <button className="btn-brand disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isActionLoading}>
              {isActionLoading ? "Uploading..." : "Add Videos"}
            </button>
            <button
              type="button"
              className="btn-ghost transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300/50 hover:bg-red-500/15 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => handleVideoDeleteByType("short")}
              disabled={isActionLoading}
            >
              Clear All Short
            </button>
            <button
              type="button"
              className="btn-ghost transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300/50 hover:bg-red-500/15 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => handleVideoDeleteByType("long")}
              disabled={isActionLoading}
            >
              Clear All Landscape
            </button>
            <button
              type="button"
              className="btn-ghost transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300/50 hover:bg-red-500/15 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleVideoDeleteAll}
              disabled={isActionLoading}
            >
              Delete All Videos
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="mb-3 text-sm text-muted">Short Video List ({videoForm.shortVideoUrls.length})</p>
          <div className="space-y-4">
            {videoForm.shortVideoUrls.map((url, index) => (
              <div key={`short-${url}-${index}`} className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs text-muted">Short #{index + 1}</p>
                  <button
                    type="button"
                    className="btn-ghost transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300/50 hover:bg-red-500/15 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => handleVideoDeleteItem("short", url)}
                    disabled={isActionLoading}
                  >
                    Delete This Video
                  </button>
                </div>
                <video controls className="h-56 w-full rounded-lg object-cover">
                  <source src={url} type="video/mp4" />
                </video>
              </div>
            ))}
            {!videoForm.shortVideoUrls.length && (
              <p className="text-sm text-muted">No short videos uploaded.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="mb-3 text-sm text-muted">Landscape Video List ({videoForm.landscapeVideoUrls.length})</p>
          <div className="space-y-4">
            {videoForm.landscapeVideoUrls.map((url, index) => (
              <div key={`landscape-${url}-${index}`} className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs text-muted">Landscape #{index + 1}</p>
                  <button
                    type="button"
                    className="btn-ghost transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300/50 hover:bg-red-500/15 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => handleVideoDeleteItem("long", url)}
                    disabled={isActionLoading}
                  >
                    Delete This Video
                  </button>
                </div>
                <video controls className="h-56 w-full rounded-lg object-cover">
                  <source src={url} type="video/mp4" />
                </video>
              </div>
            ))}
            {!videoForm.landscapeVideoUrls.length && (
              <p className="text-sm text-muted">No landscape videos uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminVideos;
