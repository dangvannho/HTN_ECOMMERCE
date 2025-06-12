import React from 'react';
import SelectedFilters from './selected-filters-category';

interface FilterState {
  category: string | null;
  price: [number, number];
}

interface FilterCategoryProps {
  filters: FilterState;
  resetAll: () => void;
  onRemoveFilter: (type: string, value: string) => void;
  isPriceActive?: boolean;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ filters, resetAll, onRemoveFilter, isPriceActive }) => {
  return (
    <div className="mt-2 mb-1">
      <SelectedFilters 
        filters={filters} 
        resetAll={resetAll} 
        onRemoveFilter={onRemoveFilter}
        isPriceActive={isPriceActive}
      />
    </div>
  );
};

export default FilterCategory;