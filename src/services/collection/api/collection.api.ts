import { axiosInstance } from '@/config/axios';
import { CollectionResponse, CollectionListResponse, CollectionProductsResponse } from '@/services/collection/types/collection.types';

const COLLECTION_ENDPOINT = {
    GET_ALL_COLLECTIONS: '/collections',
    GET_COLLECTION_BY_SLUG: '/collections/:slug',
    GET_PRODUCTS_BY_COLLECTION_SLUG: '/collections/products/:slug',
};

export const collectionApi = {
    getAllCollections: async (): Promise<CollectionListResponse> => {
        const response = await axiosInstance.get<CollectionListResponse>(COLLECTION_ENDPOINT.GET_ALL_COLLECTIONS);
        return response.data;
    },
    getCollectionBySlug: async (slug: string): Promise<CollectionResponse> => {
        const response = await axiosInstance.get<CollectionResponse>(COLLECTION_ENDPOINT.GET_COLLECTION_BY_SLUG.replace(':slug', slug));
        return response.data;
    },
    getProductsByCollectionSlug: async (slug: string, pageSize?: number, currentPage?: number): Promise<CollectionProductsResponse> => {
        const response = await axiosInstance.get<CollectionProductsResponse>(
            COLLECTION_ENDPOINT.GET_PRODUCTS_BY_COLLECTION_SLUG.replace(':slug', slug),
            {
                params: {
                    pageSize,
                    currentPage
                }
            }
        );
        return response.data;
    },
};