import { useState } from 'react';
import HeartIcon from "@/components/icons/heart"
import Eye from "@/components/icons/eye"
import Cart from "@/components/icons/cart"
import ChevronLeft from "@/components/icons/chevronleft"
import ChevronRight from "@/components/icons/chevronright"


interface Product {
  id: number;
  images: string[];
  category: string;
  name: string;
  price: number;
  discount?: number;
  tag?: string;
  tagColor?: string;
  colors?: string[];
}

interface ItemTrendingProps {
  product: Product;
}

// item trong section trending
const ItemTrending = ({ product }: ItemTrendingProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="w-full cursor-pointer">
      <div className="relative bg-[#F3F3F3] aspect-[1/1] group">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="size-full object-cover transition-transform duration-300"
        />
        {product.tag && (
          <div className={`absolute top-3 ${product.tag === "New" || product.tag === "Sale" ? "left-3" : "right-3"} ${product.tagColor} px-3 py-1 text-sm not-italic font-normal md:text-sm`}>
            {product.tag}
          </div>
        )}

        {/* slider hình ảnh trái */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>

        {/* slider hình ảnh phải */}
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next image"
        >
          <ChevronRight />
        </button>

        {/* hover cart của ảnh */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="size-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <Cart />
          </button>

          <button className="size-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <Eye />
          </button>

          <button className="size-10 rounded-full bg-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
            <HeartIcon />
          </button>
        </div>
      </div>

      <div className="my-3">
        <p className="text-base md:text-sm not-italic font-normal text-[#767676]">{product.category}</p>
        <h3 className="text-lg md:text-base not-italic font-normal text-gray-900">{product.name}</h3>

        {/* price của sản phẩm */}
        <div className="flex items-center gap-2">
          {product.discount ? (
            <>
              <span className="text-lg md:text-base font-normal">${product.discount}</span>
              <span className="text-base md:text-sm text-red-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-lg md:text-base font-normal">${product.price}</span>
          )}
        </div>

        {/* select màu cho sản phẩm */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 mt-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full border ${color === 'black'
                  ? 'bg-black border-black'
                  : color === 'white'
                    ? 'bg-white border-gray-300'
                    : `bg-${color}-500 border-${color}-500`
                  } hover:border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTrending;
