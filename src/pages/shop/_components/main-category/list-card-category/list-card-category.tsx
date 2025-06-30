
import Pagination from "./pagination-category";
import CardItem from "@/components/commons/card-item";
import { Product } from "@/services/product/types/product.type";
import Loading from "@/components/commons/loading"; 


interface ListCardCategoryProps {
  filteredProducts?: Product[];
  loading?: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const ListCardCategory = ({ 
  filteredProducts, 
  loading,
  page,
  totalPages,
  setPage 
}: ListCardCategoryProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!filteredProducts?.length && !loading) {
    return (
      <div className="w-full text-center py-10 text-gray-500 text-lg">Không có sản phẩm phù hợp.</div>
    );
  } 

 

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 py-5 lg:py-10">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product) => (
            <CardItem key={product._id} product={product} />
          ))}
      </div>
      <Pagination current={page} pages={totalPages} setPage={setPage} />
    </>
  );
};

export default ListCardCategory;