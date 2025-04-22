import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRating from "@/components/commons/star-rating";

interface ReviewItemProps {
  name: string;
  date: string;
  rating: number;
  content: string;
}

const ReviewItem = ({ name, date, rating, content }: ReviewItemProps) => {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-gray-200">
      <Avatar className="w-12 h-12">
        <AvatarFallback className="bg-gray-200 text-[#222] text-base">
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#222]">{name}</p>
          <StarRating rating={rating} />
        </div>
        <p className="text-sm text-[#767676] uppercase">{date}</p>

        <p className="mt-5 text-sm text-[#767676] line-clamp-2">{content}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
