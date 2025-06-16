import React, { useState } from 'react';
import { X } from 'lucide-react';
import ProductCategory from './product-category';
import FilterCategory from './filter-category/filter-category';
import PriceCategory from './price-category';
import type { FilterProductParams, Category  } from '@/services/product/types/product.type'; 


interface SidebarCategoryProps {
  filter: FilterProductParams;
  setFilter: React.Dispatch<React.SetStateAction<FilterProductParams>>;  
  categories: Category[];
}

const DEFAULT_PRICE: [number, number] = [100000, 1000000];

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ filter, setFilter, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<[number, number]>([
    filter.minPrice ?? DEFAULT_PRICE[0],
    filter.maxPrice ?? DEFAULT_PRICE[1],
  ]);
  const isPriceActive = price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];

  const handleCategory = (category: string) => {
    setFilter(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }));
  };

  const handlePrice = (newPrice: [number, number]) => {
    setPrice(newPrice);
    setFilter(prev => ({
      ...prev,
      minPrice: newPrice[0],
      maxPrice: newPrice[1],
    }));
  };

  const resetAll = () => {
    setFilter({});
    setPrice(DEFAULT_PRICE);
  };

  const handleRemoveFilter = (type: string, value: string) => {
    if (type === 'category') {
      setFilter(prev => ({ ...prev, category: undefined }));
    }
    if (type === 'price') {
      setFilter(prev => ({ ...prev, minPrice: DEFAULT_PRICE[0], maxPrice: DEFAULT_PRICE[1] }));
      setPrice(DEFAULT_PRICE);
    }
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between md:hidden">
        <h2 className="text-lg font-medium">FILTER BY</h2>
        <button onClick={() => setIsOpen(false)} className="p-1">
          <X size={24} />
        </button>
      </div>
      <ProductCategory 
        selectedCategory={filter.category || null}
        onCategorySelect={handleCategory} 
        categories={categories}
      />
      <PriceCategory
        selectedPrice={price}
        onPriceSelect={handlePrice}
      />
      <FilterCategory 
        filters={{ category: filter.category || null, price }}
        resetAll={resetAll}
        onRemoveFilter={handleRemoveFilter}
        isPriceActive={isPriceActive}
      />
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full md:hidden"
      >
        Filter By
      </button>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-[400px] bg-white p-6 overflow-y-auto">
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col gap-6 top-[80px] self-start w-[40%] xl:w-[30%]">
        <FilterContent />
      </aside>
    </>
  );
};

export default SidebarCategory;