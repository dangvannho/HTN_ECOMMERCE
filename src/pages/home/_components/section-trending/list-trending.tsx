import CardItem from "@/components/commons/card-item";
import { useEffect, useState } from "react";
import productApi from "@/services/product/api/product.api";
import { Product } from "@/services/product/types/product.type";
import { toast } from "react-hot-toast";

interface ListTrendingProps {
  type: string;
}

const ListTrending = ({ type }: ListTrendingProps) => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setLoading(true);
      try {
        const filterType = type === "ALL" ? undefined : type;
        const response = await productApi.getTrendingProducts(filterType);
        if (response.statusCode === 200) {
          setTrendingProducts(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching trending products:", error);
        toast.error("Failed to fetch trending products");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, [type]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 container max-w-7xl mx-auto">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-[1/1] rounded-lg"></div>
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (trendingProducts.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg text-gray-500">Hiện tại chưa có sản phẩm thịnh hành.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 container max-w-7xl mx-auto">
      {trendingProducts.map((product) => (
        <CardItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ListTrending;
