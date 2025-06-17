export interface IProduct {
    _id: string;
    name: string;
    price: number;
    avatar: string;
}

export interface IVariant {
    _id: string;
    color: string;
    size: string;
}

export interface ICartItem {
    _id: string;
    selected: boolean;
    quantity: number;
    product: IProduct;
    variant: IVariant;
    finalPrice: number;
}

export interface ICart {
    _id: string;
    items: ICartItem[];
}

export interface IVoucherInfo {
    voucherId: string;
    code: string;
    discountValue: number;
}

export interface ICartResponse {
    data:{
        statusCode: number;
        message: string;
        data: {
            cart: ICart;
            item: number;
            totalPrice: number;
            selectedItemsCount: number;
            discountAmount: number;
            finalAmount: number;
            voucherInfo: IVoucherInfo | null;
        }
        
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
    finalAmount: number;
    selectedShipping: string;
    shippingCost: number;
    totalPrice: number;
    discountAmount: number;
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

export interface ResponseUpdateCart {
    statusCode: number;
    message: string;
    data: {
        totalPrice: number;
        discountAmount: number;
        finalAmount: number;
    }
}

export interface IRemoveCartData {
    productId: string;
    variantId: string;
} 

export interface AddToCartResponse {
    statusCode: number; 
    message: string;
}

export interface ICartAppliedVoucher {
    voucherId: string;
    code: string;
    discountValue: number;
}

export interface IUpdateItemSelectionData {
    itemId: string;
    selected: boolean;
}

export interface IUpdateItemSelectionResponse {
    data: {
        cart: {
            _id: string;
            items: Array<{
                _id: string;
                selected: boolean;
            }>;
        };
        selectedItemIds: string[];
        selectedItemsCount: number;
        totalPrice: number;
        discountAmount: number;
        finalAmount: number;
        voucherInfo: IVoucherInfo | null;
    }
}


