import  { useState } from 'react';
import ButtonFilter from '@/components/commons/button-filter';
import type { Category  } from '@/services/product/types/product.type'; 

interface ProductCategoryProps {
  selectedCategory: string | null;
  onCategorySelect: (categorySlug: string) => void; 
  categories: Category[]
}

const ProductCategory = ({ selectedCategory, onCategorySelect, categories }: ProductCategoryProps) => {
  const [openCats, setOpenCats] = useState(true);
  const handleClick = () => {
    setOpenCats((o) => !o);
  };

  // if (loading) {
  //   return <div>Loading categories...</div>;
  // }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

  return (
    <div>
      <ButtonFilter title="DANH MỤC SẢN PHẨM" onClick={handleClick} openCats={openCats}/>
      {openCats && (
        <div className='mb-10'>
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
              <li key={cat._id}>
                <button
                  className={`py-1.5 px-2 rounded hover:bg-gray-100 text-left text-[.96rem] w-full text-[#222] text-sm not-italic font-normal leading-[30px]${
                    selectedCategory === cat.slug ? " bg-gray-200" : ""
                  }`}
                  onClick={() => onCategorySelect(cat.slug)}
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