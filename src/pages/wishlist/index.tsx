import { useState, useEffect } from "react";
import X from "@/components/icons/x";
import type { Product } from "@/services/product/types/product.type";
import favoriteApi from "@/services/favorite/api/favorite.api";
import CardItem from "@/components/commons/card-item";



const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>();

  const fetchWishlist = async () => {
    try {
      const response = await favoriteApi.getFavorites();
      console.log(response);
      if (response.status === 200) {
        setWishlist(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <h4 className=" text-[30px] lg:text-[35px] font-bold uppercase absolute lg:left-0 left-3 top-0 lg:-top-[90px]">
        wishlist
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wishlist?.map((product) => (
          <div className="relative group">
            <CardItem key={product._id} product={product} />
            <button className="absolute top-3 left-3 p-2 rounded bg-white opacity-0 group-hover:opacity-100 transition-all duration-200">
              <X className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;