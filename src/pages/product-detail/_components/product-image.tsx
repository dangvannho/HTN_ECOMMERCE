import { useState } from "react";
import ImageProduct from "@/assets/images.svg";
import ChevronLeft from "@/components/icons/chevronleft";
import ChevronRight from "@/components/icons/chevronright";

interface ProductImageProps {
  checkSale: boolean;
}

const images = [
  "https://images.unsplash.com/photo-1744877478622-a78c7a3336f6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1744654733851-d9c3276f42b0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1744144501177-5666f17e190c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ProductImage = ({ checkSale }: ProductImageProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex flex-row lg:flex-col gap-2 lg:order-1 order-2 lg:px-0 px-2">
        {images.map((image, index) => (
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
              className="size-full object-cover"
              onError={(e) => (e.currentTarget.src = ImageProduct)}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-max bg-gray-200 relative flex items-center justify-center order-1 lg:order-2">
        <img
          src={images[selectedImageIndex]}
          className="w-full h-[650px] object-cover"
          alt="Selected product"
          onError={(e) => (e.currentTarget.src = ImageProduct)}
        />
        {/* Nút Previous */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-black p-2 rounded-full hover:bg-white w-[45px] h-[45px] flex items-center justify-center"
        >
          <ChevronLeft />
        </button>
        {/* Nút Next */}
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-black p-2 rounded-full hover:bg-white w-[45px] h-[45px] flex items-center justify-center"
        >
          <ChevronRight />
        </button>
        {checkSale && (
          <div className="w-16 h-16 rounded-full bg-[#D6001C] absolute top-6 lg:-right-6 right-2 px-3 flex justify-center items-center">
            <p className="text-center text-white text-sm">ON SALE!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
