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

      // Khi đổi giá, cập nhật filter và cập nhật url
      const handlePriceChange = (newPrice: [number, number]) => {
        setFilter((prev) => ({ ...prev, minPrice: newPrice[0], maxPrice: newPrice[1] }));
        // Cập nhật URL
        const params = new URLSearchParams(location.search);
        params.set('minPrice', newPrice[0].toString());
        params.set('maxPrice', newPrice[1].toString());
        navigate({
          pathname: category ? `/shop/${category}` : '/shop/all',
          search: params.toString(),
        }, { replace: true });
      };

      useEffect(() => {
        // Nếu category là 'all' hoặc không có thì để undefined
        setFilter((prev) => ({ ...prev, category: !category || category === 'all' ? undefined : category }));
        setPage(1);
      }, [category]);

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
              loading={loading}
            />
          </div>
   </div>
      );
    };

    export default Category;