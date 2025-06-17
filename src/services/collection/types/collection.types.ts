import { Product } from "@/services/product/types/product.type";

export interface Collection {
    _id: string;
    name: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    products?: string[]; // Array of product IDs
}

export interface CollectionResponse {
    data: Collection;
    statusCode: number;
    message: string;
}

export interface CollectionListResponse {
    data: Collection[];
    statusCode: number;
    message: string;
}

export interface CollectionProductsResponse {
    data: Product[];
    statusCode: number;
    message: string;
}