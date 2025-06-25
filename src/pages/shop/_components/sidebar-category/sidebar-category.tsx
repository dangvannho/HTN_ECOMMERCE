import React, { useState } from 'react';
import { X } from 'lucide-react';
import ProductCategory from './product-category';
import FilterCategory from './filter-category/filter-category';
import PriceCategory from './price-category';
import type { FilterProductParams, Category  } from '@/services/product/types/product.type'; 
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarCategoryProps {
  filter: FilterProductParams;
  setFilter: React.Dispatch<React.SetStateAction<FilterProductParams>>;  
  categories: Category[];
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string | null;
  onPriceChange?: (price: [number, number]) => void;
}

const DEFAULT_PRICE: [number, number] = [100000, 10000000];

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ filter, setFilter, categories, onCategorySelect, selectedCategory, onPriceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<[number, number]>([
    filter.minPrice ?? DEFAULT_PRICE[0],
    filter.maxPrice ?? DEFAULT_PRICE[1],
  ]);
  const isPriceActive = price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];

  const navigate = useNavigate();
  const location = useLocation();

  const handleCategory = (category: string) => {
    setFilter(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }));
  };

  // Gọi trực tiếp khi thả slider (không cần debounce)
  const handlePrice = (newPrice: [number, number]) => {
    setPrice(newPrice);
    if (onPriceChange) {
      onPriceChange(newPrice);
    } else {
      setFilter(prev => ({
        ...prev,
        minPrice: newPrice[0],
        maxPrice: newPrice[1],
      }));
    }
  };

  const resetAll = () => {
    setFilter({});
    setPrice(DEFAULT_PRICE);
    navigate('/shop/all', { replace: true });
    if (onCategorySelect) {
      onCategorySelect('all');
    }
  };

  const handleRemoveFilter = (type: string) => {
    if (type === 'category') {
      setFilter(prev => {
        const newFilter = { ...prev, category: undefined };
        // Cập nhật URL
        const params = new URLSearchParams(location.search);
        params.delete('category');
        if (newFilter.minPrice && newFilter.maxPrice) {
          params.set('minPrice', newFilter.minPrice.toString());
          params.set('maxPrice', newFilter.maxPrice.toString());
          navigate({ pathname: '/shop/all', search: params.toString() }, { replace: true });
        } else {
          navigate('/shop/all', { replace: true });
        }
        return newFilter;
      });
    }
    if (type === 'price') {
      setFilter(prev => {
        const newFilter = { ...prev, minPrice: undefined, maxPrice: undefined };
        // Cập nhật URL
        if (newFilter.category) {
          navigate(`/shop/${newFilter.category}`, { replace: true });
        } else {
          navigate('/shop/all', { replace: true });
        }
        return newFilter;
      });
      setPrice(DEFAULT_PRICE);
    }
  };

  // Sync price state với filter khi filter thay đổi từ bên ngoài
  React.useEffect(() => {
    setPrice([
      filter.minPrice ?? DEFAULT_PRICE[0],
      filter.maxPrice ?? DEFAULT_PRICE[1],
    ]);
  }, [filter.minPrice, filter.maxPrice]);

  const FilterContent = () => {
    // Lấy category name từ slug nếu có
    const selectedCategoryObj = categories.find(cat => cat.slug === (filter.category || ''));
    const selectedCategoryName = selectedCategoryObj ? selectedCategoryObj.name : (filter.category === 'all' ? 'all' : null);
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between md:hidden">
          <h2 className="text-lg font-medium">FILTER BY</h2>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <X size={24} />
          </button>
        </div>
        <ProductCategory 
          selectedCategory={selectedCategory !== undefined  ? selectedCategory : (filter.category || null)}
          onCategorySelect={onCategorySelect || handleCategory} 
          categories={categories}
        />
        <PriceCategory
          selectedPrice={price}
          onPriceSelect={handlePrice}
        />
        <FilterCategory 
          filters={{ category: selectedCategoryName, price }}
          resetAll={resetAll}
          onRemoveFilter={handleRemoveFilter}
          isPriceActive={isPriceActive}
        />
      </div>
    );
  };

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