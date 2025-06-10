import { axiosInstance } from "@/config/axios";
import { ProductDetailResponse } from "../types/product.type";

const PRODUCT_ENDPOINT = {
  GET_PRODUCT_DETAIL: "/products",
};

const productApi = {
  getProductDetail: async (slug: string): Promise<ProductDetailResponse> => {
    try {
      const response = await axiosInstance.get(
        `${PRODUCT_ENDPOINT.GET_PRODUCT_DETAIL}/${slug}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default productApi;
