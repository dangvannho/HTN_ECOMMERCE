import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import ChevronLeft from "@/components/icons/chevronleft";
import ChevronRight from "@/components/icons/chevronright";
import Heart from "@/components/icons/heart";
import Share from "@/components/icons/share";
import BreadCrumb from "@/components/commons/bread-crumb";
import SizeGuideModal from "./size-guide-modal";
import type { Product } from "@/services/product/types/product.type";
import { formatToVND } from "@/utils/format";
import favoriteApi from "@/services/favorite/api/favorite.api";
import toast from "react-hot-toast";

interface ProductInfomationProps {
  productData: Product | null;
  onColorChange?: (images: string[]) => void;
}

const ProductInfomation = ({
  productData,
  onColorChange,
}: ProductInfomationProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentSku, setCurrentSku] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const variants = productData?.variants || [];

  // Helper function to find next available size
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findNextAvailableSize = (sizes: any[]) => {
    const availableSize = sizes.find((size) => size.stock > 0);
    return availableSize || sizes[0]; // Return first size if none available
  };

  useEffect(() => {
    if (productData) {
      setIsFavorite(productData.isFavorite);
    }
  }, [productData]);

  useEffect(() => {
    if (variants.length > 0 && !selectedColor) {
      // Set default color to first variant only if no color is selected
      setSelectedColor(variants[0].color);
      // Set default size to first available size of first variant
      if (variants[0].sizes.length > 0) {
        const nextAvailableSize = findNextAvailableSize(variants[0].sizes);
        setSelectedSize(nextAvailableSize.size);
        setCurrentSku(nextAvailableSize.sku);
        setCurrentId(nextAvailableSize.id);
      }
      // Set default images
      onColorChange?.(variants[0].images);
    }
  }, [variants, onColorChange, selectedColor]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(""); // Reset size when changing color

    const selectedVariant = variants.find((v) => v.color === color);
    if (selectedVariant) {
      // Update images
      onColorChange?.(selectedVariant.images);
      // Set first available size and SKU of new color
      if (selectedVariant.sizes.length > 0) {
        const nextAvailableSize = findNextAvailableSize(selectedVariant.sizes);
        setSelectedSize(nextAvailableSize.size);
        setCurrentSku(nextAvailableSize.sku);
        setCurrentId(nextAvailableSize.id);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    // Update SKU when size changes
    const selectedVariant = variants.find((v) => v.color === selectedColor);
    if (selectedVariant) {
      const sizeInfo = selectedVariant.sizes.find((s) => s.size === size);
      if (sizeInfo) {
        setCurrentSku(sizeInfo.sku);
        setCurrentId(sizeInfo.id);
      }
    }
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      try {
        const response = await favoriteApi.deleteFavorite(
          productData?._id || ""
        );
        toast.success(response.message);
        setIsFavorite(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const response = await favoriteApi.addFavorite(productData?._id || "");
        toast.success(response.message);
        setIsFavorite(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="lg:px-0 px-4">
      <div className="hidden xl:flex justify-between items-center">
        <BreadCrumb />
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
        {productData?.name}
      </h3>
      <div className="mt-[7px]">
        {productData && productData.discount > 0 ? (
          <div className="flex items-center gap-3">
            <p className="text-[16px] text-[#767676] line-through">
              {formatToVND(productData.price || 0)}
            </p>
            <p className="text-[22px] font-medium text-[#D6001C]">
              {formatToVND(productData.finalPrice || 0)}
            </p>
          </div>
        ) : (
          <p className="text-xl font-medium text-[#222]">
            {formatToVND(productData?.price || 0)}
          </p>
        )}
      </div>
      <p className="text-[#222] mt-[25px] text-[14px] leading-[24px]">
        {productData?.description_short}
      </p>

      {/* Size Selector */}
      <div className="flex items-center gap-3 mt-[30px]">
        <p className="font-medium text-sm">SIZES</p>
        <div className="flex gap-2 ml-[20px] md:ml-[50px]">
          {variants
            .find((variant) => variant.color === selectedColor)
            ?.sizes.map((sizeItem) => (
              <button
                key={sizeItem.size}
                onClick={() =>
                  sizeItem.stock > 0 && handleSizeChange(sizeItem.size)
                }
                disabled={sizeItem.stock === 0}
                className={`h-[30px] w-auto px-3 py-1 border text-sm font-normal relative ${
                  sizeItem.stock === 0 && "text-gray-400 cursor-not-allowed"
                } ${
                  selectedSize === sizeItem.size && sizeItem.stock > 0
                    ? "border-1 border-black"
                    : ""
                }`}
              >
                {sizeItem.size}
                {sizeItem.stock === 0 && (
                  <>
                    <span className="absolute h-[1px] w-[128%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[43deg] bg-gray-400"></span>
                    <span className="absolute h-[1px] w-[128%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[43deg] bg-gray-400"></span>
                  </>
                )}
              </button>
            ))}
        </div>
        <p
          className="ml-1 md:ml-20 text-[10px] md:text-sm font-medium text-[#222] group relative cursor-pointer"
          onClick={() => {
            setIsSizeGuideOpen(true);
          }}
        >
          SIZE GUIDE
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
        </p>
      </div>

      {/* Color Selector */}
      <div className="mt-[30px] flex item-center">
        <p className="font-medium text-sm self-center">COLOR</p>
        <div className="flex ml-5 md:ml-[50px] gap-2">
          {variants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => handleColorChange(variant.color)}
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                selectedColor === variant.color
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  selectedColor === variant.color ? "border-2 border-white" : ""
                }`}
                style={{ backgroundColor: variant.color.toLowerCase() }}
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
          onClick={() => handleFavorite()}
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
          <span className="font-medium text-[#222]">{currentSku || "N/A"}</span>
        </div>
        <div className="flex gap-1">
          <p className="text-[#767676]">CATEGORIES:</p>
          <span className="font-medium text-[#222]">
            {productData?.categories
              .map((item) => {
                return item.name;
              })
              .join(", ")}
          </span>
        </div>
        {/* <div className="flex gap-1">
          <p className="text-[#767676]">TAGS: </p>
          <span className="font-medium text-[#222]">
            biker, black, bomber, leather, jackets
          </span>
        </div> */}
      </div>

      <SizeGuideModal
        open={isSizeGuideOpen}
        onOpenChange={setIsSizeGuideOpen}
        image={productData?.sizeGuide || ""}
      />
    </div>
  );
};

export default ProductInfomation;
