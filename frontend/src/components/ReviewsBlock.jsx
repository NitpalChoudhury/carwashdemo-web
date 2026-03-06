import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../api/client";

function ReviewsBlock({ title = "Customer Reviews", limit = 6 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    apiRequest("/reviews")
      .then((data) => {
        if (!mounted) return;
        setReviews(Array.isArray(data) ? data.slice(0, limit) : []);
      })
      .catch(() => {
        if (!mounted) return;
        setReviews([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [limit]);

  // AUTO SLIDE
  useEffect(() => {
    if (!sliderRef.current) return;

    const interval = setInterval(() => {
      const container = sliderRef.current;

      if (!container) return;

      const cardWidth = container.firstChild?.offsetWidth || 0;

      container.scrollBy({
        left: cardWidth + 20,
        behavior: "smooth",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <section className="mt-12">

      <h2 className="section-title">{title}</h2>

      {loading ? (
        <p className="mt-4 text-sm text-muted">Loading reviews...</p>
      ) : (

        <div
          ref={sliderRef}
          className="
mt-6
flex
gap-5
overflow-x-auto
scroll-smooth
snap-x
snap-mandatory
no-scrollbar
"
        >

          {reviews.map((review) => (

            <article
              key={review._id}
              className="
              min-w-[280px]
              md:min-w-[320px]
              glass-card
              p-5
              flex-shrink-0
              "
            >

              {review.photo && (
                <img
                  src={review.photo}
                  alt={review.title}
                  className="h-32 w-full rounded-xl object-cover"
                />
              )}

              <h3 className="mt-3 text-lg font-semibold">
                {review.title}
              </h3>

              <p className="mt-2 text-sm text-muted">
                {review.description}
              </p>

            </article>

          ))}

          {!reviews.length && (
            <p className="text-sm text-muted">
              No reviews available.
            </p>
          )}

        </div>

      )}

    </section>
  );
}

export default ReviewsBlock;