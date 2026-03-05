import { useAdminPanel } from "./useAdminPanel";

function AdminReviews() {
  const {
    loading,
    reviews,
    reviewForm,
    setReviewForm,
    handleReviewSubmit,
    handleReviewDelete,
    startEditReview,
    setInitialReviewForm,
  } = useAdminPanel();

  return (
    <div>
      <h2 className="text-2xl font-bold">Reviews</h2>
      <p className="mt-1 text-sm text-muted">Manage testimonial content shown on public pages.</p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleReviewSubmit}>
        <input
          placeholder="Title"
          value={reviewForm.title}
          onChange={(event) => setReviewForm((prev) => ({ ...prev, title: event.target.value }))}
          required
        />
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(event) => setReviewForm((prev) => ({ ...prev, photo: event.target.files?.[0] || null }))}
          required={!reviewForm.id}
        />
        <p className="md:col-span-2 text-xs text-muted">
          Auto compression is enabled on server. Max upload size: 20MB.
        </p>
        <textarea
          className="md:col-span-2"
          placeholder="Description"
          value={reviewForm.description}
          onChange={(event) => setReviewForm((prev) => ({ ...prev, description: event.target.value }))}
          required
        />
        <div className="flex gap-2 md:col-span-2">
          <button className="btn-brand" type="submit">
            {reviewForm.id ? "Update Review" : "Create Review"}
          </button>
          {reviewForm.id && (
            <button type="button" className="btn-ghost" onClick={setInitialReviewForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading reviews...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {reviews.map((review) => (
            <div key={review._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {review.photo ? (
                    <img
                      src={review.photo}
                      alt={review.title}
                      className="h-14 w-14 rounded-lg border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-[10px] text-muted">
                      No image
                    </div>
                  )}
                  <div>
                  <h3 className="font-semibold">{review.title}</h3>
                  <p className="text-sm text-muted">{review.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-ghost" onClick={() => startEditReview(review)}>
                    Edit
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => handleReviewDelete(review._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminReviews;
