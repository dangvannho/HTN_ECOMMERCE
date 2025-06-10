import { axiosInstance } from "@/config/axios";
import { ProductDetailResponse, ProductResponse } from "../types/product.type";

const PRODUCT_ENDPOINT = {
  GET_PRODUCT_DETAIL: "/products",
  GET_ALL_PRODUCTS: "/products",
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

  getAllProducts: async (pageSize: number, currentPage: number): Promise<ProductResponse> => {
    try {
      const response = await axiosInstance.get(PRODUCT_ENDPOINT.GET_ALL_PRODUCTS, {
        params: {
          pageSize,
          currentPage
        }
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }
};

export default productApi;
