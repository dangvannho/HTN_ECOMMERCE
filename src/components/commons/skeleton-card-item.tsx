import { Skeleton } from "@/components/ui/skeleton";
const SkeletonCardItem = () => {
  return (
    <div >
      <Skeleton className="bg-gray-200 aspect-[1/1] rounded-lg w-full" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 bg-gray-200 rounded w-3/4" />
        <Skeleton className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCardItem;
