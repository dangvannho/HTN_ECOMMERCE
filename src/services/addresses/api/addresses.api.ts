import { IAddressFormData } from "../types/addresses.types";
import { axiosInstance } from "@/config/axios";

const addressesApi = {
    createAddress: async (data: IAddressFormData) => {
        try {
            const response = await axiosInstance.post("/address/createAddress", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getMyAddresses: async () => {
        try {
            const response = await axiosInstance.get("/address");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateAddress: async (id: string, data: IAddressFormData) => {
        try {
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