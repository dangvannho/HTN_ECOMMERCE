import { axiosInstance } from "@/config/axios";
import { GetOrderResponse, GetOrderDetailResponse, CreateOrderRequest, CreateOrderResponse, IBuyNow, BuyNowResponse } from "../types/order.type";


const ORDER_ENDPOINT = {
  GET_ORDER: "order/listOrder",
  GET_ORDER_DETAIL: "order/detailOrder/:id",
  CREATE_ORDER: "order/createOrder",
  BUY_NOW: "/order/buyNow",
};

const orderApi = {
  getListOrder: async (): Promise<GetOrderResponse> => {
    try {
      const response = await axiosInstance.get(ORDER_ENDPOINT.GET_ORDER);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getOrderDetail: async (id: string): Promise<GetOrderDetailResponse> => {
    try {
      const response = await axiosInstance.get(
        ORDER_ENDPOINT.GET_ORDER_DETAIL.replace(":id", id)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
      const response = await axiosInstance.post(ORDER_ENDPOINT.CREATE_ORDER, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  buyNow: async (data: IBuyNow): Promise<BuyNowResponse> => {
    try {
        const response = await axiosInstance.post(ORDER_ENDPOINT.BUY_NOW, data);
        return response.data;
    } catch (error) {
        throw error;
    }
},
};

export default orderApi;
