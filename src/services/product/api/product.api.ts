import { axiosInstance } from "@/config/axios";
import {
  ProductDetailResponse,
  ProductResponse,
  FilterProductParams,
  FilterProductResponse,
  RelatedProductResponse,
  TrendingProductResponse,
} from "../types/product.type";

const PRODUCT_ENDPOINT = {
  GET_PRODUCT_DETAIL: "/products/:slug",
  GET_ALL_PRODUCTS: "/products",
  FILTER_PRODUCTS: "/products/filter",
  GET_RELATED_PRODUCTS: "products/related/:slug",
  GET_TRENDING_PRODUCTS: "/products/trending",
};

const productApi = {
  getProductDetail: async (slug: string): Promise<ProductDetailResponse> => {
    try {
      const response = await axiosInstance.get(
        PRODUCT_ENDPOINT.GET_PRODUCT_DETAIL.replace(":slug", slug)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAllProducts: async (
    pageSize: number,
    currentPage: number
  ): Promise<ProductResponse> => {
    try {
      const response = await axiosInstance.get(
        PRODUCT_ENDPOINT.GET_ALL_PRODUCTS,
        {
          params: {
            pageSize,
            currentPage,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  filterProducts: async (
    params: FilterProductParams
  ): Promise<FilterProductResponse> => {
    try {
      const response = await axiosInstance.get(
        PRODUCT_ENDPOINT.FILTER_PRODUCTS,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering products:", error);
      throw error;  
    }
  },

  getRelatedProducts: async (slug: string): Promise<RelatedProductResponse> => {
    try {
      const response = await axiosInstance.get(
        PRODUCT_ENDPOINT.GET_RELATED_PRODUCTS.replace(":slug", slug)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  },

  getTrendingProducts: async (type?: string): Promise<TrendingProductResponse> => {
    try {
      const response = await axiosInstance.get(PRODUCT_ENDPOINT.GET_TRENDING_PRODUCTS, {
        params: { type }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching trending products:", error);
      throw error;
    }
  },
};

export default productApi;
