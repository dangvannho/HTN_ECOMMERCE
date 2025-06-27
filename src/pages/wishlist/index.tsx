import { useState, useEffect } from "react";
import X from "@/components/icons/x";
import type { Product } from "@/services/product/types/product.type";
import favoriteApi from "@/services/favorite/api/favorite.api";
import CardItem from "@/components/commons/card-item";
import toast from "react-hot-toast";
import SkeletonCardItem from "@/components/commons/skeleton-card-item";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await favoriteApi.getFavorites();
      if (response.statusCode == 201) {
        setWishlist(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await favoriteApi.deleteFavorite(productId);
      if (response.statusCode == 200) {
        toast.success(response.message);
        fetchWishlist();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h4 className="heading-element">Danh sách yêu thích</h4>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 container max-w-7xl mx-auto mt-[34px]">
          {[...Array(3)].map((_, index) => (
            <SkeletonCardItem key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlist?.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              Không tìm thấy sản phẩm yêu thích.
            </div>
          ) : (
            wishlist.map((product) => (
              <div className="relative group">
                <CardItem key={product._id} product={product} />
                <button
                  className="absolute top-3 right-3 p-2 rounded bg-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                >
                  <X className="size-3" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Wishlist;
