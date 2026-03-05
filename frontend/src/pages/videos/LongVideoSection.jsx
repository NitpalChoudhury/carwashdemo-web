import { useEffect, useState } from "react";
import { getLongVideo } from "../../api/videos";

function LongVideoSection() {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getLongVideo()
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data?.landscapeVideos)
          ? data.landscapeVideos.filter(Boolean)
          : [];
        const latest = list[list.length - 1] || data?.landscapeVideo || "";
        setVideoUrl(latest);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load landscape video.");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative mt-20 px-6">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]"></div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">

        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="h-[420px] w-full object-cover md:h-[560px]"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="flex h-[420px] w-full items-center justify-center text-sm text-gray-300 md:h-[560px]">
            No landscape video uploaded yet.
          </div>
        )}

        {/* Cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

        {/* Glow overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(56,189,248,0.25),transparent_50%)]"></div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">

          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              FEATURE STORY
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
              Premium Detailing That Makes Your Car Look Showroom New
            </h2>

            <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

            <p className="mt-4 text-sm text-gray-300 md:text-base">
              High-gloss protection, deep interior restoration, and paint-safe
              treatment handled by expert detailers.
            </p>

          </div>

        </div>

      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200 text-center">
          {error}
        </p>
      )}

    </section>
  );
}

export default LongVideoSection;
