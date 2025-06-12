import { axiosInstance } from "@/config/axios";
import type { BannerSliderResponse } from "@/services/banner-slider/types/banner-slider.types";

const BANNER_SLIDER_ENDPOINT = {
    GET_ALL_BANNER_SLIDER: "sliders/getAllSliders",
};

const bannerSliderApi = {
    getAllBannerSlider: async (): Promise<BannerSliderResponse> => {
        try {
            const response = await axiosInstance.get(BANNER_SLIDER_ENDPOINT.GET_ALL_BANNER_SLIDER);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default bannerSliderApi;