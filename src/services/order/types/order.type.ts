export type OrderProduct = {
        productName: string; 
        price: number; 
        quantity: number;

}
export type Order = {
    _id: string;
    address: string;
    status: string;
    paymentMethod: string;
    originalTotal: number;
    discountAmount: number;
    finalAmount: number;
    orderCode: string;
    createdAt: string;  
    totalItems: number;
    items: OrderProduct[]
}; 

export type GetOrderResponse = {
    status: number;
    message: string;
    data: Order[]
} 

export type GetOrderDetailResponse = {
    status: number;
    message: string;
    data: Order
}

export type CreateOrderRequest = {
    addressId: string;
    paymentMethod: string;
};

export type CreateOrderResponse = {
    status: number;
    message: string;
    data: {
        _id: string;
    };
};

export interface IBuyNow {
    productId: string;
    variantId: string;
    quantity: number;
}
export interface BuyNowResponse {
    statusCode: number; 
}