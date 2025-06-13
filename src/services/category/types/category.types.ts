export interface Category {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  products?: any[]; // Since we don't have the product type defined yet
}

export interface CategoryResponse {
  data: Category[];
  message?: string;
}
