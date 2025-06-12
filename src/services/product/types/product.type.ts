export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type VariantSize = {
  id: string;
  size: string;
  stock: number;
  sku: string;
};

export type Variant = {
  color: string;
  sizes: VariantSize[];
  images: string[];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  description_short: string;
  additional_info: string;
  slug: string;
  avatar: string;
  images: string[];
  sizeGuide: string;
  price: number;
  finalPrice: number;
  discountType: "PERCENTAGE" | null;
  discount: number;
  UNISEXTYPE: string;
  variants: Variant[];
  featured: boolean;
  categories: Category[];
  isFavorite: boolean;
  //needAdd
  tag: string;
  tagColor: string;
};

export type ProductDetailResponse = {
  statusCode: number;
  data: {
    product: Product;
  };
};

export type ProductResponse = {
  meta: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
  };
  result: Product[];
}

export type FilterProductParams = {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  type?: string;
  limit?: number;
  currentPage?: number;
  pageSize?: number;
};

export type FilterProductResponse = {
  EC: number;
  EM: string;
  data: {
    data: {
      meta: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      };
      result: Product[];
    };

    }
};
