import { useEffect, useMemo, useState } from "react";
import { getShortVideo } from "../../api/videos";

function ShortVideoSection() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    getShortVideo()
      .then((data) => {
        const list = Array.isArray(data?.shortVideos)
          ? data.shortVideos.filter(Boolean)
          : data?.shortVideo
          ? [data.shortVideo]
          : [];
        setVideoUrls(list);
      })
      .catch(() => {
        setError("Unable to load short video.");
      });
  }, []);

  const slides = useMemo(() => {
    if (!videoUrls.length) return [];
    return videoUrls.map((url, index) => ({
      id: index,
      src: url,
      title: `Service Reel ${index + 1}`,
    }));
  }, [videoUrls]);

  useEffect(() => {
    if (pause || slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length, pause]);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative mt-16 px-4 sm:px-6 pt-10 sm:pt-16">

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_60%)]"></div>

      {/* Header */}
      <div className="mb-8 sm:mb-10 text-center">

        <h2 className="text-2xl sm:text-4xl font-bold text-white">
          Quick Service Videos
        </h2>

        <div className="mx-auto mt-2 sm:mt-3 h-[2px] w-20 sm:w-28 bg-gradient-to-r from-red-500 to-red-700"></div>

        <p className="mt-3 text-gray-400 text-xs sm:text-sm">
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
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-10"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >

          {/* LEFT ARROW */}
          {slides.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
              bg-red-600 hover:bg-red-700 text-white
              w-10 h-10 rounded-full flex items-center justify-center
              shadow-lg transition"
            >
              ❮
            </button>
          )}

          {/* RIGHT ARROW */}
          {slides.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
              bg-red-600 hover:bg-red-700 text-white
              w-10 h-10 rounded-full flex items-center justify-center
              shadow-lg transition"
            >
              ❯
            </button>
          )}

          {/* Slider */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >

            {slides.map((slide) => (
              <div key={slide.id} className="w-full shrink-0 flex justify-center">

                <div className="relative w-[220px] sm:w-[260px] md:w-[300px]">

                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 blur opacity-40"></div>

                  <div className="relative overflow-hidden rounded-3xl bg-black p-2 shadow-2xl">

                    <video
                      muted
                      autoPlay
                      loop
                      playsInline
                      controls
                      className="h-[380px] sm:h-[420px] md:h-[460px] w-full rounded-2xl object-cover"
                    >
                      <source src={slide.src} type="video/mp4" />
                    </video>

                  </div>

                  <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm font-semibold text-white">
                    {slide.title}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="mt-6 flex justify-center gap-2 sm:gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-8 sm:w-10 bg-gradient-to-r from-red-500 to-red-700"
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