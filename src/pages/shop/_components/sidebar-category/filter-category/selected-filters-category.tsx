import React from "react";
import { X } from "lucide-react";
import { formatToVND } from '@/utils/format';

interface FilterState {
  category: string | null;
  price: [number, number];
}

interface SelectedFiltersProps {
  filters: FilterState;
  resetAll: () => void;
  onRemoveFilter?: (type: string, value: string) => void;
  isPriceActive?: boolean;
}

// Helper component for filter tags
function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
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

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ 
  filters, 
  resetAll,
  onRemoveFilter,
  isPriceActive
}) => {
  // Check if any filters are applied
  const hasFilters = 
    (filters.category !== null && filters.category !== undefined) ||
    (isPriceActive);

  if (!hasFilters) return null;

  const handleRemove = (type: string, value: string) => {
    if (onRemoveFilter) {
      onRemoveFilter(type, value);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex flex-wrap mb-2">
        {/* Category */}
        {filters.category && (
          <FilterTag
            key={`category-${filters.category}`}
            label={filters.category}
            onRemove={() => handleRemove("category", filters.category!)}
          />
        )}
        {/* Price Range */}
        {isPriceActive && (
          <FilterTag
            label={`${formatToVND(filters.price[0])} - ${formatToVND(filters.price[1])}`}
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
          Reset All
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;