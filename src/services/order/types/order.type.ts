
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
    totalAmount: number;
    discount: number;
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