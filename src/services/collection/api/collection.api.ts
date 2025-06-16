import { axiosInstance } from '@/config/axios';
import { CollectionResponse } from '@/services/collection/types/collection.types';



const COLLECTION_ENDPOINT = {
    GET_ALL_COLLECTIONS: '/collections',
};

export const collectionApi = {
    getAllCollections: async (): Promise<CollectionResponse> => {
        const response = await axiosInstance.get<CollectionResponse>(COLLECTION_ENDPOINT.GET_ALL_COLLECTIONS);
        return response.data;
    },
};