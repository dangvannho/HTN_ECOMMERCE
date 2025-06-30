
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
  onCategorySelect?: (cat: string) => void;
}

const FilterCategory = ({ filters, resetAll, onRemoveFilter, isPriceActive, onCategorySelect }: FilterCategoryProps) => {
  return (
    <div className="mt-2 mb-1">
      <SelectedFilters 
        filters={filters} 
        resetAll={resetAll} 
        onRemoveFilter={onRemoveFilter}
        isPriceActive={isPriceActive}
        onCategorySelect={onCategorySelect}
      />
    </div>
  );
};

export default FilterCategory;