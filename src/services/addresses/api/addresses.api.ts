import { IAddressFormData } from "../types/addresses.types";
import { axiosInstance } from "@/config/axios";


const ADDRESSES_ENDPOINT = {
    CREATE_ADDRESS: "/address/createAddress",
    GET_MY_ADDRESSES: "/address",
}
const addressesApi = {
    createAddress: async (data: IAddressFormData) => {
        try {
            const response = await axiosInstance.post(ADDRESSES_ENDPOINT.CREATE_ADDRESS, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getMyAddresses: async () => {
        try {
            const response = await axiosInstance.get(ADDRESSES_ENDPOINT.GET_MY_ADDRESSES);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateAddress: async (id: string, data: IAddressFormData) => {
        try {
            // const response = await axiosInstance.put(`/address/${id}`, data);
            const response = await axiosInstance.put(`/address/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteAddress: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`/address/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
};

export default addressesApi;