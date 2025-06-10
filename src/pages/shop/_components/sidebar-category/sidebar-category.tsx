import React, { useState } from 'react';
import { X } from 'lucide-react';
import ProductCategory from './product-category';
// import ColorCategory from './color-categoty';
// import SizeCategory from './size-category/size-category';
import BrandsCategory from './brands-category';
import PriceCategory from './price-category';
import FilterCategory from './filter-category/filter-category';

interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  brands: string[];
  price: [number, number];
}

const SidebarCategory = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
    price: [20, 937],
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePrice = (price: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      price
    }));
  };

  const resetAll = () => {
    setFilters({
      categories: [],
      colors: [],
      sizes: [],
      brands: [],
      price: [20, 937],
    });
  };

  const handleRemoveFilter = (type: string, value: string) => {
    switch (type) {
      case 'categories':
        handleCategory(value);
        break;
      case 'colors':
        handleColor(value);
        break;
      case 'sizes':
        handleSize(value);
        break;
      case 'brands':
        handleBrand(value);
        break;
      case 'price':
        handlePrice([20, 937]);
        break;
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
        selectedCategories={filters.categories}
        onCategorySelect={handleCategory}
      />
      {/* <ColorCategory 
        selectedColors={filters.colors}
        onColorSelect={handleColor}
      />
      <SizeCategory 
        selectedSizes={filters.sizes}
        onSizeSelect={handleSize}
      /> */}
      <BrandsCategory 
        selectedBrands={filters.brands}
        onBrandSelect={handleBrand}
      />
      <PriceCategory 
        selectedPrice={filters.price}
        onPriceSelect={handlePrice}
      />
      <FilterCategory 
        filters={filters}
        resetAll={resetAll}
        onRemoveFilter={handleRemoveFilter}
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