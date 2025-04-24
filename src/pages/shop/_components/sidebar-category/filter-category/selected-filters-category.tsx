import React from "react";
import { X } from "lucide-react";

interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  brands: string[];
  price: [number, number];
}

interface SelectedFiltersProps {
  filters: FilterState;
  resetAll: () => void;
  onRemoveFilter?: (type: string, value: string) => void;
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
  onRemoveFilter 
}) => {
  // Check if any filters are applied
  const hasFilters = 
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    filters.price[0] !== 20 ||
    filters.price[1] !== 937;

  if (!hasFilters) return null;

  const handleRemove = (type: string, value: string) => {
    if (onRemoveFilter) {
      onRemoveFilter(type, value);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex flex-wrap mb-2">
        {/* Categories */}
        {filters.categories.map((category) => (
          <FilterTag
            key={`category-${category}`}
            label={category}
            onRemove={() => handleRemove("categories", category)}
          />
        ))}

        {/* Colors */}
        {filters.colors.map((color) => (
          <FilterTag
            key={`color-${color}`}
            label={color}
            onRemove={() => handleRemove("colors", color)}
          />
        ))}

        {/* Sizes */}
        {filters.sizes.map((size) => (
          <FilterTag
            key={`size-${size}`}
            label={size}
            onRemove={() => handleRemove("sizes", size)}
          />
        ))}

        {/* Brands */}
        {filters.brands.map((brand) => (
          <FilterTag
            key={`brand-${brand}`}
            label={brand}
            onRemove={() => handleRemove("brands", brand)}
          />
        ))}

        {/* Price Range */}
        {(filters.price[0] !== 20 || filters.price[1] !== 937) && (
          <FilterTag
            label={`$${filters.price[0]} - $${filters.price[1]}`}
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