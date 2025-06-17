import { axiosInstance } from '@/config/axios';
import  type {  CategoryResponse } from '../types/category.types';

const CATEGORY_ENDPOINT = {
    GET_ALL_CATEGORIES: '/categories',
};
export const categoryApi = {
  getAllCategories: async (): Promise<CategoryResponse> => {
    try {
      const response = await axiosInstance.get(CATEGORY_ENDPOINT.GET_ALL_CATEGORIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
