export interface IVoucher {
    _id: string;
    code: string;
    name: string;
    discountValue: number;
    startDate: Date;
    endDate: Date;
    quantity: number;
    status: 'active' | 'inactive';
    maxUsagePerUser: number;
}

export interface IVoucherResponse {
    message: string;
    data: IVoucher[];
}

export interface IApplyVoucherRequest {
    voucherCode: string;
    orderValue: number;
}

export interface IApplyVoucherResponse {
    status: number;
    message: string;
    data: {
        voucherId: string;
        code: string;
        discountValue: number;
        discountAmount: number;
        finalAmount: number;
    };
}

export interface IVoucherError {
    success: boolean;
    message: string;
}

export interface ICartItemRaw {
    _id: string;
    productId: string;
    variantId: string;
    quantity: number;
}

export interface ICartRaw {
    _id: string;
    userId: string;
    items: ICartItemRaw[];
    finalAmount: number;
    updatedAt: string;
    __v: number;
    appliedVoucher: null;
}

export interface IRemoveVoucherResponse {
    status: number;
    message: string;
    data: {
        cart: ICartRaw;
        totalPrice: number;
        discountAmount: number;
        finalAmount: number;
    };
}
