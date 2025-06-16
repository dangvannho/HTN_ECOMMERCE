import HeartIcon from "@/components/icons/heart";
import Eye from "@/components/icons/eye";
import Cart from "@/components/icons/cart";
import { Link, useNavigate } from "react-router-dom";
import routePath from "@/config/route";
import { Product } from "@/services/product/types/product.type";
import { formatToVND } from "@/utils/format";

interface CardItemProps {
  product: Product;
}

// item trong section trending
const CardItem = ({ product }: CardItemProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full cursor-pointer">
      <div className="relative bg-[#F3F3F3] aspect-[1/1] group">
        <img
          src={product.avatar}
          alt={product.name}
          className="size-full object-cover transition-transform duration-300"
        />
        {product.tag && (
          <div
            className={`absolute top-3 ${
              product.tag === "New" || product.tag === "Sale"
                ? "left-3"
                : "right-3"
            } ${
              product.tagColor
            } px-3 py-1 text-sm not-italic font-normal md:text-sm`}
          >
            {product.tag}
          </div>
        )}

        {/* hover cart của ảnh */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="size-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <Cart />
          </button>

          <button
            className="size-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            onClick={() =>
              navigate(routePath.productDetail.replace(":slug", product.slug))
            }
          >
            <Eye />
          </button>

          <button className="size-10 rounded-full bg-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
            <HeartIcon />
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
