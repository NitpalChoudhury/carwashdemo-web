import { useAdminPanel } from "./useAdminPanel";

function AdminVideos() {
  const { videoForm, setVideoForm, handleVideoSubmit } = useAdminPanel();

  return (
    <div>
      <h2 className="text-2xl font-bold">Videos</h2>
      <p className="mt-1 text-sm text-muted">
        Upload short and landscape videos (admin only).
      </p>

      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleVideoSubmit}>
        <div>
          <label className="mb-2 block text-sm">Short Video (Vertical)</label>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={(event) =>
              setVideoForm((prev) => ({
                ...prev,
                shortVideo: event.target.files?.[0] || null,
              }))
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Landscape Video</label>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={(event) =>
              setVideoForm((prev) => ({
                ...prev,
                landscapeVideo: event.target.files?.[0] || null,
              }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <button className="btn-brand" type="submit">
            Save Videos
          </button>
        </div>
      </form>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="mb-2 text-sm text-muted">Current Short Video</p>
          {videoForm.shortVideoUrl ? (
            <video controls className="h-64 w-full rounded-lg object-cover">
              <source src={videoForm.shortVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <p className="text-sm text-muted">No short video uploaded.</p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="mb-2 text-sm text-muted">Current Landscape Video</p>
          {videoForm.landscapeVideoUrl ? (
            <video controls className="h-64 w-full rounded-lg object-cover">
              <source src={videoForm.landscapeVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <p className="text-sm text-muted">No landscape video uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminVideos;
