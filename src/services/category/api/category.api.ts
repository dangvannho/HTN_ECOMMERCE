import { axiosInstance } from '@/config/axios';
import { Category, CategoryResponse } from '../types/category.types';

const CATEGORY_ENDPOINT = {
    GET_ALL_CATEGORIES: '/categories',
};
export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await axiosInstance.get<CategoryResponse>(CATEGORY_ENDPOINT.GET_ALL_CATEGORIES);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
