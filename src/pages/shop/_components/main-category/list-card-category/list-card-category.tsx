import React, { useState, useEffect } from "react";
import Pagination from "./pagination-category";
import productApi from "@/services/product/api/product.api";
import CardItem from "@/components/commons/card-item";
import { Product } from "@/services/product/types/product.type";
// import Image from "next/image";

interface ListCardCategoryProps {
  filteredProducts?: Product[];
  onReset?: () => void;
}

const ListCardCategory: React.FC<ListCardCategoryProps> = ({ filteredProducts, onReset }) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 8;

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAllProducts(productsPerPage, page);
      const safeProducts: Product[] = Array.isArray(response.result)
        ? response.result.map((item: any, idx: number) => ({
            ...item,
            id: item._id ?? String(idx), 
            category: item.categories?.[0]?.name || "",
          }))
        : [];
      setProducts(safeProducts);
      setTotalPages(response.meta?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filteredProducts) {
      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
      return;
    }

    fetchAllProducts();
  }, [page, filteredProducts]);

  // Reset to original product list
  useEffect(() => {
    if (onReset) {
      fetchAllProducts();
    }
  }, [onReset]);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 py-5 lg:py-10">
        {Array.isArray(products) &&
          products.map((product) => (
            <CardItem key={product._id} product={product} />
          ))}
      </div>
      <Pagination current={page} pages={totalPages} setPage={setPage} />
    </>
  );
};

export default ListCardCategory;