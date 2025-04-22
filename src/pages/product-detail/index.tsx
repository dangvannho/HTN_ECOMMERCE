import { useState } from "react";
import ProductImage from "./_components/product-image";
import ProductInfomation from "./_components/product-infomation";
import ProductTabs from "./_components/product-tabs/product-tabs";
import ProductRelated from "./_components/product-related";

const ProductDetail = () => {
  const [checkSale, setCheckSale] = useState(true);
  return (
    <div className="xl:max-w-6xl 2xl:max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-[50px] h-max">
        <ProductImage checkSale={checkSale} />
        <ProductInfomation checkSale={checkSale} />
      </div>

      <ProductTabs />

      <ProductRelated />
    </div>
  );
};

export default ProductDetail;
