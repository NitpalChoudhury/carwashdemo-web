import ReviewsBlock from "../../components/ReviewsBlock";

function ReviewsPage() {
  return (
    <div className="page-shell py-10">
      <h1 className="section-title">Reviews</h1>
      <p className="mt-2 text-sm text-muted">
        Testimonials managed by admin and shown publicly.
      </p>
      <ReviewsBlock title="All Reviews" limit={24} />
    </div>
  );
}

export default ReviewsPage;
