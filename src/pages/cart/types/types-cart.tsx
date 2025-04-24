export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
}

export interface CartSummary {
    items: CartItem[];
    subtotal: number;
    vat: number;
    total: number;
    selectedShipping: string;
    shippingCost: number;
}
