import { axiosInstance } from "@/config/axios";
import { IVoucher, IApplyVoucherResponse, IRemoveVoucherResponse } from "../types/vourcher.types";

const VOUCHER_ENDPOINT = {
    GET_ALL: "/vouchers",
    APPLY: "/vouchers/apply_voucher_to_cart",
    REMOVE_VOUCHER: "/vouchers/remove_voucher_from_cart"
};

const voucherApi = {
    getAllVouchers: async (): Promise<{ data: IVoucher[] }> => {
        try {
            const response = await axiosInstance.get(VOUCHER_ENDPOINT.GET_ALL);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    applyVoucher: async (code: string, orderValue: number): Promise<IApplyVoucherResponse> => {
        try {
            const response = await axiosInstance.post(VOUCHER_ENDPOINT.APPLY, {
                code,
                orderValue,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    removeVoucher: async (): Promise<IRemoveVoucherResponse> => {
        try {
            const response = await axiosInstance.post(VOUCHER_ENDPOINT.REMOVE_VOUCHER);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default voucherApi;