import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import ChevronLeft from "@/components/icons/chevronleft";
import ChevronRight from "@/components/icons/chevronright";
import Heart from "@/components/icons/heart";
import Share from "@/components/icons/share";

interface ProductInfomationProps {
  checkSale: boolean;
}
const ProductInfomation = ({ checkSale }: ProductInfomationProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState("red-500");
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["black", "red-500", "[#E4E4E4]"];

  return (
    <div className="lg:px-0 px-4">
      <div className="hidden xl:flex justify-between items-center">
        <div className="text-sm uppercase text-[#222] font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:underline">
            The Shop
          </Link>
        </div>
        <div className="flex gap-4 text-sm uppercase font-medium ">
          <div className="flex items-center gap-1">
            <ChevronLeft className="size-3" />
            <a href="#" className="text-black hover:underline">
              PREV
            </a>
          </div>
          <div className="flex items-center gap-1">
            <a href="#" className="text-black hover:underline">
              NEXT
            </a>
            <ChevronRight className="size-3" />
          </div>
        </div>
      </div>
      <h3 className="text-xl lg:text-[26px] font-normal text-[#222] mt-0 lg:mt-10">
        Lightweight Puffer Jacket With A Hood
      </h3>
      <div className="mt-[7px]">
        {checkSale ? (
          <div className="flex items-center gap-3">
            <p className="text-[16px] text-[#767676] line-through">$769</p>
            <p className="text-[22px] font-medium text-[#D6001C]">$249</p>
          </div>
        ) : (
          <p className="text-xl font-medium text-[#222]">$249</p>
        )}
      </div>
      <p className="text-[#222] mt-[25px] text-[14px] leading-[24px]">
        Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum
        gravida nec dui. Aenean aliquam quis ipsum, non ultricies tellus sodales
        eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.
      </p>

      {/* Size Selector */}
      <div className="flex items-center gap-3 mt-[30px]">
        <p className="font-medium text-sm">SIZES</p>
        <div className="flex gap-2 ml-[20px] md:ml-[50px]">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-[30px] w-auto px-3 py-1 border text-sm font-normal ${
                selectedSize === size ? "border-1 border-black" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <a
          href="#"
          className="ml-1 md:ml-20 text-[10px] md:text-sm font-medium text-[#222] group relative"
        >
          SIZE GUIDE
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* Color Selector */}
      <div className="mt-[30px] flex item-center">
        <p className="font-medium text-sm self-center">COLOR</p>
        <div className="flex ml-5 md:ml-[50px] gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                selectedColor === color ? "border-black" : "border-transparent"
              }`}
            >
              <div
                className={`w-4 h-4 bg-${color} rounded-full ${
                  selectedColor === color ? "border-2 border-white" : ""
                }`}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex gap-4 mt-[33px] h-[60px]">
        <div className="flex items-center border">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2"
            disabled={quantity <= 1}
          >
            <Minus className="size-3" />
          </button>
          <p className="min-w-5 text-center">{quantity}</p>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2"
          >
            <Plus className="size-3" />
          </button>
        </div>
        <button className="bg-black text-white px-6 py-2 w-[280px] text-sm ">
          ADD TO CART
        </button>
      </div>

      {/* Wishlist and Share */}
      <div className="flex gap-4 mt-[35px]">
        <button
          className="flex items-center gap-2 relative group pb-1"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="size-4" fill={isFavorite ? "red" : "black"} />
          <span className="text-[13px] font-medium">ADD TO WISHLIST</span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button className="flex items-center pb-1  gap-2 relative group">
          <span>
            <Share className="size-4" />
          </span>
          <span className="text-[13px] font-medium">SHARE</span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>

      {/* Additional Info */}
      <div className="text-sm space-y-1 mt-[26px]">
        <div className="flex gap-1">
          <p className="text-[#767676]">SKU:</p>
          <span className="font-medium text-[#222]"> N/A</span>
        </div>
        <div className="flex gap-1">
          <p className="text-[#767676]">CATEGORIES:</p>
          <span className="font-medium text-[#222]">
            {" "}
            Casual & Urban Wear, Jackets, Men
          </span>
        </div>
        <div className="flex gap-1">
          <p className="text-[#767676]">TAGS: </p>
          <span className="font-medium text-[#222]">
            {" "}
            biker, black, bomber, leather, jackets
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfomation;
