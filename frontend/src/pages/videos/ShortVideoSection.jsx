import { useEffect, useMemo, useState } from "react";
import { getShortVideo } from "../../api/videos";

function ShortVideoSection() {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    getShortVideo()
      .then((data) => {
        setVideoUrl(data?.shortVideo || "");
      })
      .catch(() => {
        setError("Unable to load short video.");
      });
  }, []);

  // Only show videos that actually exist
  const slides = useMemo(() => {
    if (!videoUrl) return [];
    return [
      {
        id: 1,
        src: videoUrl,
        title: "Service Reel",
      },
    ];
  }, [videoUrl]);

  useEffect(() => {
    if (pause || slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length, pause]);

  return (
    <section className="relative mt-20 px-6 pt-16">

      {/* Red Glow Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_60%)]"></div>

      {/* Header */}
      <div className="mb-10 text-center">

        <h2 className="mt-6 text-4xl font-bold text-white">
          Quick Service Videos
        </h2>

        <div className="mx-auto mt-3 h-[2px] w-28 bg-gradient-to-r from-red-500 to-red-700"></div>

        <p className="mt-4 text-gray-400 text-sm">
          See how we transform cars in seconds
        </p>

      </div>

      {error && (
        <p className="mx-auto mb-6 max-w-md rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200 text-center">
          {error}
        </p>
      )}

      {!slides.length ? (
        <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-300">
          No short video uploaded yet.
        </div>
      ) : (

        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >

          {/* Slider */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >

            {slides.map((slide) => (
              <div key={slide.id} className="w-full shrink-0 flex justify-center">

                <div className="relative w-[260px] md:w-[300px]">

                  {/* Red Glow Border */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 blur opacity-40"></div>

                  {/* Video Card */}
                  <div className="relative overflow-hidden rounded-3xl bg-black p-2 shadow-2xl">

                    <video
                      muted
                      autoPlay
                      loop
                      playsInline
                      controls
                      className="h-[460px] w-full rounded-2xl object-cover"
                    >
                      <source src={slide.src} type="video/mp4" />
                    </video>

                  </div>

                  {/* Caption */}
                  <p className="mt-3 text-center text-sm font-semibold text-white">
                    {slide.title}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="mt-8 flex justify-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-10 bg-gradient-to-r from-red-500 to-red-700"
                      : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      )}

    </section>
  );
}

export default ShortVideoSection;