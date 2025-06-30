import { useEffect } from "react";
import { X } from "lucide-react";
import { formatToVND } from "@/utils/format";

interface FilterState {
  category: string | null;
  price: [number, number];
}

interface SelectedFiltersProps {
  filters: FilterState;
  resetAll: () => void;
  onRemoveFilter?: (type: string, value: string) => void;
  isPriceActive?: boolean;
  onCategorySelect?: (cat: string) => void;
}

// Helper component for filter tags
function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 mr-2 mb-2 text-sm">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 hover:text-red-500"
        aria-label="Remove filter"
      >
        <X size={14} />
      </button>
    </span>
  );
}

const SelectedFilters = ({
  filters,
  resetAll,
  onRemoveFilter,
  isPriceActive,
  onCategorySelect,
}: SelectedFiltersProps) => {
  // Check if any filters are applied
  const hasFilters =
    (filters.category !== null &&
      filters.category !== undefined &&
      filters.category.toLowerCase() !== "all") ||
    isPriceActive;

  useEffect(() => {
    if (!hasFilters && onCategorySelect) {
      onCategorySelect("all");
    }
    // eslint-disable-next-line
  }, [hasFilters]);

  if (!hasFilters) return null;

  const handleRemove = (type: string, value: string) => {
    if (onRemoveFilter) {
      onRemoveFilter(type, value);
    }
    // Kiểm tra nếu sau khi xóa tag này sẽ không còn filter nào
    const isLastCategory =
      type === "category" &&
      !isPriceActive &&
      filters.category &&
      filters.category.toLowerCase() !== "all";
    const isLastPrice =
      type === "price" &&
      (!filters.category || filters.category.toLowerCase() === "all") &&
      isPriceActive;
    if ((isLastCategory || isLastPrice) && resetAll) {
      resetAll(); // Đảm bảo state cập nhật xong mới reset
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex flex-wrap mb-2">
        {/* Category */}
        {filters.category && filters.category.toLowerCase() !== "all" && (
          <FilterTag
            key={`category-${filters.category}`}
            label={filters.category}
            onRemove={() => handleRemove("category", filters.category!)}
          />
        )}
        {/* Price Range */}
        {isPriceActive && (
          <FilterTag
            label={`${formatToVND(filters.price[0])} - ${formatToVND(
              filters.price[1]
            )}`}
            onRemove={() => handleRemove("price", "")}
          />
        )}
      </div>
      {/* Reset All Button */}
      {hasFilters && (
        <button
          onClick={resetAll}
          className="text-sm px-4 py-1 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Đặt lại
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;
