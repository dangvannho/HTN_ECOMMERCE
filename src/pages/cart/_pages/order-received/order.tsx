import { Progress } from "@/components/ui/progress"
import { formatToVND } from "@/utils/format"
import addressesApi from "@/services/addresses/api/addresses.api";
import { IAddress } from "@/services/addresses/types/addresses.types";
import { useEffect, useState } from "react";
import orderApi from "@/services/order/api/order.api";
import { Order as OrderType } from "@/services/order/types/order.type";

const Order = () => {
    const [defaultAddress, setDefaultAddress] = useState<IAddress | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch addresses
                const addressResponse = await addressesApi.getMyAddresses();
                const defaultAddr = addressResponse.data.find((addr: IAddress) => addr.isDefault);
                setDefaultAddress(defaultAddr || null);

                // Fetch order details
                const orderId = localStorage.getItem('orderId');
                if (orderId) {
                    const orderResponse = await orderApi.getOrderDetail(orderId);
                    setOrderDetails(orderResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleReturnToCart = () => {
        localStorage.removeItem('orderId');
        window.location.href = '/cart?step=bag';
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (!orderDetails) {
        return <div>Không tìm thấy đơn hàng</div>;
    }

    return (
        <>
            <Progress value={100} className="mb-4 sm:mb-8" />
            <div className="max-w-3xl mx-auto py-4 sm:py-8 px-4 sm:px-0">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 bg-[#B4975A] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-[35px] font-normal mb-2">Đơn hàng của bạn đã hoàn tất!</h2>
                    <p className="text-sm font-normal text-[#767676]">Cảm ơn bạn. Chúng tôi đã nhận được đơn hàng của bạn.</p>
                </div>

                <div className="border border-dashed border-gray-300 p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Mã đơn hàng</p>
                            <p className="text-base font-medium">{orderDetails.orderCode}</p>
                        </div>
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Ngày đặt</p>
                            <p className="text-base font-medium">{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Tổng tiền</p>
                            <p className="text-base font-medium">{formatToVND(orderDetails.finalAmount)}</p>
                        </div>
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Phương thức thanh toán</p>
                            <p className="text-base font-medium">{orderDetails.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-base font-medium mb-8">CHI TIẾT ĐƠN HÀNG</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-4">
                            <p className="text-sm font-medium">SẢN PHẨM</p>
                            <p className="text-sm font-medium">TỔNG TIỀN</p>
                        </div>

                        {orderDetails.items.map((item) => (
                            <div key={item.productName} className="flex justify-between items-center">
                                <div className="basis-1/2 overflow-hidden whitespace-nowrap truncate">
                                    <p className="text-sm font-medium text-[#767676]">
                                        {item.productName} {item.quantity > 1 ? `x${item.quantity}` : ''}
                                    </p>
                                </div>
                                <div className="basis-1/2 text-right">
                                    <p className="text-sm font-medium text-[#767676]">
                                        {formatToVND(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">TỔNG TIỀN HÀNG</p>
                            <p className="text-sm font-medium">{formatToVND(orderDetails.originalTotal)}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">THÔNG TIN GIAO HÀNG</p>
                            <div className="text-sm font-normal text-right">
                                {defaultAddress ? (
                                    <>
                                        <div>
                                            {defaultAddress.address}, {defaultAddress.wardName}, {defaultAddress.provinceName}
                                        </div>
                                        <div>
                                            Người nhận: {defaultAddress.fullname} - {defaultAddress.phoneNumber}
                                        </div>
                                    </>
                                ) : (
                                    <div>Chưa có địa chỉ giao hàng mặc định</div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">PHƯƠNG THỨC THANH TOÁN</p>
                            <p className="text-sm font-medium">{orderDetails.paymentMethod}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">GIẢM GIÁ</p>
                            <p className="text-sm font-medium">{formatToVND(orderDetails.discountAmount)}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">TỔNG THANH TOÁN</p>
                            <p className="text-sm font-medium">{formatToVND(orderDetails.finalAmount)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleReturnToCart}
                        className="bg-[#222] text-white px-8 py-4 rounded hover:bg-[#333] transition-colors duration-200"
                    >
                        Quay lại giỏ hàng
                    </button>
                </div>
            </div>
        </>
    )
}

export default Order