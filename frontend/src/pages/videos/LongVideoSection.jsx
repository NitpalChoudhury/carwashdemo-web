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
    <section className="relative mt-16 px-4 sm:px-6 md:mt-20">

      {/* Red Glow Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_60%)]"></div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">

        {/* Video */}
        {videoUrl ? (
          <div className="aspect-video w-full">

            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              className="h-full w-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center text-sm text-gray-300">
            No landscape video uploaded yet.
          </div>
        )}

        {/* Cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

        {/* Red Glow overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(239,68,68,0.25),transparent_50%)]"></div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10">

          <div className="max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 sm:p-6">

            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-red-400">
              FEATURE STORY
            </p>

            <h2 className="mt-2 text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight">
              Premium Detailing That Makes Your Car Look Showroom New
            </h2>

            <div className="mt-3 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-red-500 to-red-700"></div>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
              High-gloss protection, deep interior restoration, and paint-safe
              treatment handled by expert detailers.
            </p>

          </div>

        </div>

      </div>

      {/* Error */}
      {error && (
        <p className="mt-5 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-xs sm:text-sm text-red-200 text-center">
          {error}
        </p>
      )}

    </section>
  );
}

export default LongVideoSection;