import { axiosInstance } from "@/config/axios";
import type { BannerHomeResponse } from "@/services/banner-home/types/banner-home.types";

const BANNER_HOME_ENDPOINT = {
    GET_ALL_BANNER_HOME: "banners/getAllBanner",
}; 

const bannerHomeApi = {
    getAllBannerHome: async (): Promise<BannerHomeResponse> => {
        try {
            const response = await axiosInstance.get(BANNER_HOME_ENDPOINT.GET_ALL_BANNER_HOME);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default bannerHomeApi;