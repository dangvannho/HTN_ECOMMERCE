import { useState } from "react";
import ImageProduct from "@/assets/images.svg";
import ChevronLeft from "@/components/icons/chevronleft";
import ChevronRight from "@/components/icons/chevronright";
import type { Product } from "@/services/product/types/product.type";

interface ProductImageProps {
  productData: Product | null;
  images?: string[];
}

const ProductImage = ({ productData, images }: ProductImageProps) => {
  const defaultImages =
    productData?.images && productData.images.length > 0
      ? productData.images
      : [ImageProduct];

  const displayImages = images || defaultImages;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex flex-row lg:flex-col gap-2 lg:order-1 order-2 lg:px-0 px-2">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`flex-1 lg:flex-none lg:w-16 lg:h-16 md:h-36 h-28 bg-gray-200 flex items-center justify-center cursor-pointer  ${
              selectedImageIndex === index ? "border-2 border-gray-800" : ""
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="size-full object-cover hover:scale-100"
              onError={(e) => (e.currentTarget.src = ImageProduct)}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-max bg-gray-200 relative flex items-center justify-center order-1 lg:order-2">
        <img
          src={displayImages[selectedImageIndex] || ImageProduct}
          className="w-full h-[650px] object-cover"
          alt=""
          onError={(e) => (e.currentTarget.src = ImageProduct)}
        />
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-black p-2 rounded-full hover:bg-white w-[45px] h-[45px] flex items-center justify-center"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-black p-2 rounded-full hover:bg-white w-[45px] h-[45px] flex items-center justify-center"
        >
          <ChevronRight />
        </button>
        {productData && !!productData?.discount && (
          <div className="w-16 h-16 rounded-full bg-[#D6001C] absolute top-6 lg:-right-6 right-2 px-3 flex justify-center items-center">
            <p className="text-center text-white text-sm">
              Sale {productData?.discount}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
