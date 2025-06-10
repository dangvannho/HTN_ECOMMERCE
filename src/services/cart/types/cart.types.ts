export interface IProduct {
    _id: string;
    name: string;
    slug: string;
    avatar: string;
    price: number;
    finalPrice: number;
    discountType: string | null;
    discount: number;
    UNISEXTYPE: string;
    color: null;
    size: null;
    variants: string[];
}

export interface IVariant {
    _id: string;
    color: string;
    size: string;
    sku: string;
    Products: string;
    images: string[];
}

export interface ICartItem {
    _id: string;
    productId: IProduct;
    variantId: IVariant;
    quantity: number;
}

export interface ICart {
    _id: string;
    userId: string;
    items: ICartItem[];
    updatedAt: string;
    __v: number;
}

export interface ICartResponse {
    data:{
        data: {
            cart: ICart;
            totalQuantity: number;
            totalPrice: number;
        };
    }
}

export interface CartSummary {
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        color: string;
        size: string;
    }>;
    subtotal: number;
    vat: number;
    total: number;
    selectedShipping: string;
    shippingCost: number;
}

export interface IAddToCartData {
    productId: string;
    variantId: string;
    quantity: number;
}

export interface IUpdateCartData {
    productId: string;
    variantId?: string;
    quantity: number;
}

export interface IRemoveCartData {
    productId: string;
    variantId: string;
} 

export interface AddToCartResponse {
   statusCode: number; 
   message: string;
}


