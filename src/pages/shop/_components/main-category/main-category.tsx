import BannerCategory from "./banner-category";
import ListCardCategory from "./list-card-category/list-card-category";
import BreadCrumb from "@/components/commons/bread-crumb";
import { Product } from '@/services/product/types/product.type';

interface MainCategoryProps {
  filteredProducts?: Product[];
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
  loading: boolean;
}

const MainCategory = ({ filteredProducts, page, totalPages, setPage, loading }: MainCategoryProps) => {
  return (
    <div className="w-full">
      <BannerCategory />

      <BreadCrumb />

      <ListCardCategory
        filteredProducts={filteredProducts}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loading}
      />
    </div>
  );
};

export default MainCategory;
