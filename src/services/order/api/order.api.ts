import { axiosInstance } from "@/config/axios";
import { GetOrderResponse, GetOrderDetailResponse } from "../types/order.type";

const ORDER_ENDPOINT = {
  GET_ORDER: "order/listOrder",
  GET_ORDER_DETAIL: "order/detailOrder/:id",
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
};

export default orderApi;
