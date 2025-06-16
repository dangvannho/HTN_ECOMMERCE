import { axiosInstance } from "@/config/axios";
import {
  GetFavoriteResponse,
  AddFavoriteResponse,
  DeleteFavoriteResponse,
} from "../types/favorite.type";

const FAVORITE_ENDPOINT = {
  ADD_FAVORITE: "/favorites/:id",
  DELETE_FAVORITE: "/favorites/:id",
  GET_FAVORITES: "/favorites",
};

const favoriteApi = {
  addFavorite: async (id: string): Promise<AddFavoriteResponse> => {
    try {
      const response = await axiosInstance.post(
        FAVORITE_ENDPOINT.ADD_FAVORITE.replace(":id", id)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteFavorite: async (id: string): Promise<DeleteFavoriteResponse> => {
    try {
      const response = await axiosInstance.delete(
        FAVORITE_ENDPOINT.DELETE_FAVORITE.replace(":id", id)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getFavorites: async (): Promise<GetFavoriteResponse> => {
    try {
      const response = await axiosInstance.get(FAVORITE_ENDPOINT.GET_FAVORITES);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default favoriteApi;
