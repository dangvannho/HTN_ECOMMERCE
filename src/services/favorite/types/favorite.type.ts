import { Product } from "@/services/product/types/product.type";
export type AddFavoriteResponse = {
  statusCode: number;
  message: string;
};

export type DeleteFavoriteResponse = AddFavoriteResponse;

export type GetFavoriteResponse = {
  statusCode: number;
  productId: Product;
};
