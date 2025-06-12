import React from "react";
import Pagination from "./pagination-category";
import CardItem from "@/components/commons/card-item";
import { Product } from "@/services/product/types/product.type";

interface ListCardCategoryProps {
  filteredProducts?: Product[];
  loading?: boolean;
  onReset?: () => void;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const ListCardCategory: React.FC<ListCardCategoryProps> = ({ 
  filteredProducts, 
  loading,
  onReset,
  page,
  totalPages,
  setPage 
}) => {
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
          <div
            className="absolute inset-0 rounded-full border-4 border-[#C32929] border-t-transparent animate-spin"
            style={{ width: 80, height: 80 }}
          ></div>
          <img
            src="/logo.svg"
            alt="Loading..."
            width={50}
            height={28}
            className="animate-pulse z-10"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    );
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