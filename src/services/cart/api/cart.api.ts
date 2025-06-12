import { IAddToCartData, ICartResponse, IUpdateCartData, IRemoveCartData, AddToCartResponse } from "../types/cart.types";
import { axiosInstance } from "@/config/axios";

const CART_ENDPOINT = {
    GET_CART: "/cart/get-cart",
    ADD_TO_CART: "/cart/add-to-cart",
    REMOVE_CART: "/cart/remove-item",
    UPDATE_CART: "/cart/update-cart",
}

const cartApi = {
    getCart: async (): Promise<ICartResponse> => {
        try {
            const response = await axiosInstance.get(CART_ENDPOINT.GET_CART);
            return response;
        } catch (error) {
            throw error;
        }
    },

    addToCart: async (data: IAddToCartData): Promise<AddToCartResponse> => {
        try {
            const response = await axiosInstance.post(CART_ENDPOINT.ADD_TO_CART, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCart: async (data: IUpdateCartData) => {
        try {
            const response = await axiosInstance.put(CART_ENDPOINT.UPDATE_CART, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    removeCart : async (data: IRemoveCartData) => {
        try {
            const response = await axiosInstance.delete(CART_ENDPOINT.REMOVE_CART, {data: data});
            return response.data;
        } catch (error) {
            throw error;
        }
    },


};

export default cartApi;
