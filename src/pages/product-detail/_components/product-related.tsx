import { useState, useEffect } from "react";
import type { Product } from "@/services/product/types/product.type";
import CardItem from "@/components/commons/card-item";
import productApi from "@/services/product/api/product.api";

interface ProductRelatedProps {
  slug: string;
}

const ProductRelated = ({ slug }: ProductRelatedProps) => {
  const [showAll, setShowAll] = useState(false);
  const [productData, setProductData] = useState<Product[]>([]);
  const displayedProducts = showAll ? productData : productData.slice(0, 4);

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  const fetchProductData = async () => {
    try {
      const response = await productApi.getRelatedProducts(slug);
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="mt-14 pb-4">
      <div className="flex justify-between items-center lg:px-0 px-3">
        <h5 className="flex gap-2">
          <span className="text-lg lg:text-[26px]">SẢN PHẨM</span>
          <span className="text-lg lg:text-[26px] font-bold">LIÊN QUAN</span>
        </h5>
        <p
          className="hover:underline cursor-pointer hidden md:block"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Thu gọn" : "Tất cả"}
        </p>
      </div>

      <div className="mt-[34px] grid grid-cols-1 md:grid-cols-4 gap-4 lg:px-0 px-3">
        {productData.length === 0 ? (
          <p className="text-center col-span-4">Không tìm thấy sản phẩm liên quan</p>
        ) : (
          displayedProducts.map((item) => {
            return <CardItem key={item._id} product={item} />;
          })
        )}
      </div>

      <p
        className="underline cursor-pointer text-center block md:hidden"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Thu gọn" : "Tất cả"}
      </p>
    </div>
  );
};

export default ProductRelated;
