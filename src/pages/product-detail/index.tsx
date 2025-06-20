import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "./_components/product-image";
import ProductInfomation from "./_components/product-infomation";
import ProductTabs from "./_components/product-tabs/product-tabs";
import ProductRelated from "./_components/product-related";
import type { Product } from "@/services/product/types/product.type";
import productApi from "@/services/product/api/product.api";
import "./style.css";

const ProductDetail = () => {
  const { slug } = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]); 
  
  

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  useEffect(() => {
    if (productData?.variants && productData.variants.length > 0) {
      // Set initial images from first variant
      setCurrentImages(productData.variants[0].images);
    }
  }, [productData]);

  const fetchProductData = async () => {
    try {
      const response = await productApi.getProductDetail(slug || "");
      setProductData(response.data.product);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleColorChange = (images: string[]) => {
    setCurrentImages(images);
  };

  return (
    <div className="xl:max-w-6xl 2xl:max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-[50px] h-max">
        <ProductImage productData={productData} images={currentImages} />
        <ProductInfomation
          productData={productData}
          onColorChange={handleColorChange}
        />
      </div>

      <ProductTabs productData={productData} />

      <ProductRelated slug={slug || ""} />
    </div>
  );
};

export default ProductDetail;
