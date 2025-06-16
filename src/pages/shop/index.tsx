import { useState, useEffect } from 'react';
import SidebarCategory from './_components/sidebar-category/sidebar-category';
import MainCategory from './_components/main-category/main-category';
import productApi from '@/services/product/api/product.api';
import { FilterProductParams, Product } from '@/services/product/types/product.type';
import useCategory from '@/services/category/hooks/useCategory'; 


const PAGE_SIZE = 8;

const Category = () => {
  const [filter, setFilter] = useState<FilterProductParams>({});
  const [products, setProducts] = useState<Product[]>([]); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);  
  const { categories } = useCategory();
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res;
        // Kiểm tra nếu không có filter thì gọi getAllProducts
        const isNoFilter = !filter.category && !filter.minPrice && !filter.maxPrice;
        if (isNoFilter) {
          res = await productApi.getAllProducts(PAGE_SIZE, page);
          setProducts(res.result || []);
          setTotalPages(res.meta?.totalPages || 1);
        } else {
          res = await productApi.filterProducts({
            ...filter,
            currentPage: page,
            pageSize: PAGE_SIZE,
          });
          setProducts(res.data?.data?.result || []);
          setTotalPages(res.data?.data?.meta?.totalPages || 1);
        }
      } catch (e) {
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter.category, filter.minPrice, filter.maxPrice, page]); 



  return (
    <div className='max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto block md:flex gap-6'>
      <SidebarCategory filter={filter} setFilter={setFilter} categories={categories} />
      <MainCategory
        filteredProducts={products}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loading}
      />
    </div>
  );
};

export default Category;