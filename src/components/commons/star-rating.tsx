import FullStar from "../icons/full-star";
import HalfStar from "../icons/half-star";
import EmptyStar from "../icons/empty-star";
interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  // Lấy số sao đầy (sao nguyên)
  const fullStars = Math.floor(rating);
  // Kiểm tra xem có sao lẻ (sao nửa) hay không
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        if (starValue <= fullStars) {
          // Sao đầy
          return <FullStar key={index} className="w-4 h-4 text-yellow-400" />;
        } else if (starValue === fullStars + 1 && hasHalfStar) {
          // Sao nửa
          return <HalfStar key={index} className="w-4 h-4 text-yellow-400" />;
        } else {
          // Sao trống
          return <EmptyStar key={index} className="w-4 h-4 text-gray-300" />;
        }
      })}
    </div>
  );
};

export default StarRating;
