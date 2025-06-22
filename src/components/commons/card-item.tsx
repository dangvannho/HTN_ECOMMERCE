import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "@/components/icons/heart";
import Eye from "@/components/icons/eye";
import routePath from "@/config/route";
import { Product } from "@/services/product/types/product.type";
import { formatToVND } from "@/utils/format";
import favoriteApi from "@/services/favorite/api/favorite.api";
import { toast } from "react-hot-toast";

interface CardItemProps {
  product: Product;
}

// item trong section trending
const CardItem = ({ product }: CardItemProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      // Không nên dùng product.isFavorite ở đây, thừa, có thể dùng ở dòng 17
      //   const [isFavorite, setIsFavorite] = useState(product.isFavorite);
      setIsFavorite(product.isFavorite);
    }
  }, [product]);

  const handleFavorite = async () => {
    // function này nên xử dụng debounce, để user có thể click nhiều lần, và chỉ nhận lần cuối cùng rồi gọi api thôi
    if (isFavorite) {
      try {
        const response = await favoriteApi.deleteFavorite(product?._id || "");
        toast.success(response.message);
        setIsFavorite(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const response = await favoriteApi.addFavorite(product?._id || "");
        toast.success(response.message);
        setIsFavorite(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full cursor-pointer">
      <div className="relative bg-[#F3F3F3] aspect-[1/1] group">
        <img
          src={product.avatar}
          alt={product.name}
          className="size-full object-cover transition-transform duration-300"
          onClick={() =>
            navigate(routePath.productDetail.replace(":slug", product.slug))
          }
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-3 bg-red-500 text-white px-2 rounded-sm">
            -{product.discount}%
          </div>
        )}

        {/* hover cart của ảnh */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* <button className="size-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <Cart />
          </button> */}

          <button
            className="size-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            onClick={() =>
              navigate(routePath.productDetail.replace(":slug", product.slug))
            }
          >
            <Eye />
          </button>

          <button
            className={`size-10 rounded-full ${
              isFavorite ? "bg-red-500" : "bg-white"
            } flex items-center justify-center hover:bg-red-600  transition-colors`}
            onClick={() => handleFavorite()}
          >
            <HeartIcon fill={isFavorite ? "white" : "black"} />
          </button>
        </div>
      </div>

      <div className="my-3">
        <p className="text-base md:text-sm not-italic font-normal text-[#767676]">
          {product.categories?.map((item) => item.name).join(", ")}
        </p>
        <Link
          to={routePath.productDetail.replace(":slug", product.slug)}
          className="text-lg md:text-base not-italic font-normal text-gray-900 hover:underline line-clamp-2"
        >
          {product.name}
        </Link>

        {/* price của sản phẩm */}
        <div className="flex items-center gap-2">
          {product.discount ? (
            <>
              <span className="text-lg md:text-base font-normal">
                {formatToVND(product.finalPrice)}
              </span>
              <span className="text-base md:text-sm text-red-500 line-through">
                {formatToVND(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg md:text-base font-normal">
              {formatToVND(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
