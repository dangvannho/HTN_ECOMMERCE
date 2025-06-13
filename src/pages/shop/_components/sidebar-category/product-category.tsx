import React, { useState, useEffect } from 'react';
import ButtonFilter from '@/components/commons/button-filter';
import { categoryApi } from '@/services/category/api/category.api';
import { Category } from '@/services/category/types/category.types';

interface ProductCategoryProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ selectedCategory, onCategorySelect }) => {
  const [openCats, setOpenCats] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAllCategories();
        // Sort categories based on their names
        const sortedCategories = data.sort((a, b) => {
          // First group: Basic shirts (Áo Thun, Áo Polo, etc.)
          const isBasicShirtA = a.name.toLowerCase().includes('áo') && 
            !a.name.toLowerCase().includes('khoác');
          const isBasicShirtB = b.name.toLowerCase().includes('áo') && 
            !b.name.toLowerCase().includes('khoác');
          
          // Second group: Jackets (Áo khoác)
          const isJacketA = a.name.toLowerCase().includes('áo khoác');
          const isJacketB = b.name.toLowerCase().includes('áo khoác');
          
          // Third group: Pants (Quần)
          const isPantsA = a.name.toLowerCase().includes('quần');
          const isPantsB = b.name.toLowerCase().includes('quần');

          // Sort by groups first
          if (isBasicShirtA && !isBasicShirtB) return -1;
          if (!isBasicShirtA && isBasicShirtB) return 1;
          if (isJacketA && !isJacketB) return -1;
          if (!isJacketA && isJacketB) return 1;
          if (isPantsA && !isPantsB) return -1;
          if (!isPantsA && isPantsB) return 1;

          // If in same group, sort alphabetically
          return a.name.localeCompare(b.name, 'vi');
        });
        
        setCategories(sortedCategories);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = () => {
    setOpenCats((o) => !o);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <ButtonFilter title="Product Categories" onClick={handleClick} openCats={openCats}/>
      {openCats && (
        <div className='mb-10'>
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
              <li key={cat._id}>
                <button
                  className={`py-1.5 px-2 rounded hover:bg-gray-100 text-left text-[.96rem] w-full text-[#222] text-sm not-italic font-normal leading-[30px]${
                    selectedCategory === cat.name ? " bg-gray-200" : ""
                  }`}
                  onClick={() => onCategorySelect(cat.name)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;