import React from 'react';
import SelectedFilters from './selected-filters-category';

interface FilterState {
  category: string | null;
  colors: string[];
  sizes: string[];
  brands: string[];
  price: [number, number];
}

interface FilterCategoryProps {
  filters: FilterState;
  resetAll: () => void;
  onRemoveFilter: (type: string, value: string) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ filters, resetAll, onRemoveFilter }) => {
  return (
    <div className="mt-2 mb-1">
      <SelectedFilters 
        filters={filters} 
        resetAll={resetAll} 
        onRemoveFilter={onRemoveFilter}
      />
    </div>
  );
};

export default FilterCategory;