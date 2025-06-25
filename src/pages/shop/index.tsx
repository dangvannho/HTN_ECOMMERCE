    import { useState, useEffect } from 'react';
    import SidebarCategory from './_components/sidebar-category/sidebar-category';
    import MainCategory from './_components/main-category/main-category';
    import productApi from '@/services/product/api/product.api';
    import { FilterProductParams, Product } from '@/services/product/types/product.type';
    import useCategory from '@/services/category/hooks/useCategory'; 
    import { useNavigate, useLocation, useParams } from 'react-router-dom';

    const PAGE_SIZE = 8;

    function getQueryParams(search: string) {
      const params = new URLSearchParams(search);
      return {
        minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
        maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
      };
    }

    const Category = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const { category } = useParams<{ category: string }>();
      const { minPrice, maxPrice } = getQueryParams(location.search);
      // Nếu category là 'all' hoặc không có thì để undefined
      const initialCategory = !category || category === 'all' ? undefined : category;
      const [filter, setFilter] = useState<FilterProductParams>({ category: initialCategory, minPrice, maxPrice });
      const [products, setProducts] = useState<Product[]>([]); 
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [loading, setLoading] = useState(false);
      const [priceFilterLoading, setPriceFilterLoading] = useState(false);
      const { categories } = useCategory();

      // Khi chọn category mới, chỉ cập nhật url path /shop/:category
      const handleCategorySelect = (catName: string) => {
        const params = new URLSearchParams(location.search);
        if (catName === 'all') {
          navigate({
            pathname: '/shop/all',
            search: params.toString()
          }, { replace: true });
          setFilter((prev) => ({ ...prev, category: undefined }));
        } else {
          navigate({
            pathname: `/shop/${encodeURIComponent(catName)}`,
            search: params.toString()
          }, { replace: true });
          setFilter((prev) => ({ ...prev, category: catName }));
        }
      };

      // Tối ưu: Chỉ cập nhật URL khi price thực sự thay đổi và không phải giá mặc định
      const handlePriceChange = (newPrice: [number, number]) => {
        setPage(1);
        setPriceFilterLoading(true); // Chỉ loading cho price filter
        
        setFilter((prev) => ({ ...prev, minPrice: newPrice[0], maxPrice: newPrice[1] }));
        
        // Chỉ cập nhật URL nếu giá khác mặc định
        const isDefaultPrice = newPrice[0] === 100000 && newPrice[1] === 10000000;
        const currentPath = category ? `/shop/${category}` : '/shop/all';
        
        if (isDefaultPrice) {
          // Nếu về giá mặc định, xóa query params
          if (location.search) {
            navigate(currentPath, { replace: true });
          }
        } else {
          // Chỉ cập nhật URL nếu có thay đổi thực sự
          const params = new URLSearchParams(location.search);
          const currentMinPrice = params.get('minPrice');
          const currentMaxPrice = params.get('maxPrice');
          
          if (currentMinPrice !== newPrice[0].toString() || currentMaxPrice !== newPrice[1].toString()) {
            params.set('minPrice', newPrice[0].toString());
            params.set('maxPrice', newPrice[1].toString());
            navigate({
              pathname: currentPath,
              search: params.toString(),
            }, { replace: true });
          }
        }
      };

      useEffect(() => {
        // Nếu category là 'all' hoặc không có thì để undefined
        setFilter((prev) => ({ ...prev, category: !category || category === 'all' ? undefined : category }));
        setPage(1);
      }, [category]);
      
      // Thêm useEffect này để ép URL về /shop/all khi filter về mặc định
      useEffect(() => {
        if (
          (!filter.category || filter.category === 'all') &&
          (!filter.minPrice || filter.minPrice === 100000) &&
          (!filter.maxPrice || filter.maxPrice === 10000000)
        ) {
          if (location.pathname !== '/shop/all' || location.search) {
            navigate('/shop/all', { replace: true });
          }
        }
      }, [filter.category, filter.minPrice, filter.maxPrice]);

      useEffect(() => {
        const fetchProducts = async () => {
          setLoading(true);
          try {
            let res;
            // Nếu không có filter.category thì gọi getAllProducts
            const isNoFilter = (!filter.category) && !filter.minPrice && !filter.maxPrice;
            if (isNoFilter) {
              res = await productApi.getAllProducts(PAGE_SIZE, page);
              setProducts(res.result || []);
              setTotalPages(res.meta?.totalPages || 1);
            } else {
              // Nếu không có category thì không truyền category lên API
              const filterParams = { ...filter };
              if (!filter.category) delete filterParams.category;
              res = await productApi.filterProducts({
                ...filterParams,
                currentPage: page,
                pageSize: PAGE_SIZE,
              });
              setProducts(res.data?.result || []);
              setTotalPages(res.data?.meta?.totalPages || 1);
            }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            setProducts([]);
            setTotalPages(1);
          } finally {
            setLoading(false);
            setPriceFilterLoading(false); // Tắt loading price filter
          }
        };
        fetchProducts();
      }, [filter.category, filter.minPrice, filter.maxPrice, page]); 

      return (
   <div className='xl:max-w-5xl 2xl:max-w-7xl mx-auto items-center px-4 xl:px-0'>
          
          <div className=' block md:flex gap-6'>
            <SidebarCategory filter={filter} setFilter={setFilter} categories={categories} onCategorySelect={handleCategorySelect} selectedCategory={filter.category || 'all'} onPriceChange={handlePriceChange} />
            <MainCategory
              filteredProducts={products}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              loading={loading || priceFilterLoading}
            />
          </div>
   </div>
      );
    };

    export default Category;