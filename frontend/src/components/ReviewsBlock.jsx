import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";

function ReviewsBlock({ title = "Customer Reviews", limit = 6 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="mt-12">
      <h2 className="section-title">{title}</h2>
      {loading ? (
        <p className="mt-4 text-sm text-muted">Loading reviews...</p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review._id} className="glass-card p-5">
              {review.photo && (
                <img
                  src={review.photo}
                  alt={review.title}
                  className="h-32 w-full rounded-xl object-cover"
                />
              )}
              <h3 className="mt-3 text-lg font-semibold">{review.title}</h3>
              <p className="mt-2 text-sm text-muted">{review.description}</p>
            </article>
          ))}
          {!reviews.length && <p className="text-sm text-muted">No reviews available.</p>}
        </div>
      )}
    </section>
  );
}

export default ReviewsBlock;
