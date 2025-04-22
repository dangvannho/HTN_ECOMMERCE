import ReviewItem from "./review-item";
import ReviewForm from "./review-form";

interface ReviewTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
}
const ReviewTab = ({ reviews }: ReviewTabProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-lg font-medium text-[#222] mb-4">Reviews</h2>
      <div>
        {reviews.map((review, index) => (
          <ReviewItem
            key={index}
            name={review.name}
            date={review.date}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>
      <ReviewForm />
    </div>
  );
};

export default ReviewTab;
