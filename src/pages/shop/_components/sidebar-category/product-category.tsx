import React, { useState } from 'react';
import ButtonFilter from '@/components/commons/button-filter';

interface ProductCategoryProps {
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
}

const categories = [
  "Dresses", "Sweatshirts", "Jeans", "Jewelry", "Men", "Shirts",
  "Swimwear", "T-Shirts & Tops", "Trousers", "Jumpers & Cardigans"
];

const ProductCategory: React.FC<ProductCategoryProps> = ({ selectedCategories, onCategorySelect }) => {
  const [openCats, setOpenCats] = useState(true);

  const handleClick = () => {
    setOpenCats((o) => !o);
  };

  return (
    <div>
      <ButtonFilter title="Product Categories" onClick={handleClick} openCats={openCats}/>
      {openCats && (
        <div className='mb-10'>
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`py-1.5 px-2 rounded hover:bg-gray-100 text-left text-[.96rem] w-full text-[#222] text-sm not-italic font-normal leading-[30px]${
                    selectedCategories.includes(cat) ? " bg-gray-200" : ""
                  }`}
                  onClick={() => onCategorySelect(cat)}
                >
                  {cat}
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