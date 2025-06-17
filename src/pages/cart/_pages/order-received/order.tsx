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
        // Clear the orderId from localStorage
        localStorage.removeItem('orderId');
        // Navigate to cart page with step=bag and reload the page
        window.location.href = '/cart?step=bag';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!orderDetails) {
        return <div>Order not found</div>;
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
                    <h2 className="text-[35px] font-normal mb-2">Your order is completed!</h2>
                    <p className="text-sm font-normal text-[#767676]">Thank you. Your order has been received.</p>
                </div>

                <div className="border border-dashed border-gray-300 p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Order Number</p>
                            <p className="text-base font-medium">{orderDetails.orderCode}</p>
                        </div>
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Date</p>
                            <p className="text-base font-medium">{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Total</p>
                            <p className="text-base font-medium">{formatToVND(orderDetails.finalAmount)}</p>
                        </div>
                        <div>
                            <p className="text-[#767676] text-sm font-medium">Payment Method</p>
                            <p className="text-base font-medium">{orderDetails.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-base font-medium mb-8">ORDER DETAILS</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-4">
                            <p className="text-sm font-medium">PRODUCT</p>
                            <p className="text-sm font-medium">SUBTOTAL</p>
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
                            <p className="text-sm font-medium">SUBTOTAL</p>
                            <p className="text-sm font-medium">{formatToVND(orderDetails.originalTotal)}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">SHIPPING</p>
                            <div className="text-sm font-normal text-right">
                                {defaultAddress ? (
                                    <>
                                        <div>
                                            {defaultAddress.address}, {defaultAddress.wardName}, {defaultAddress.provinceName}
                                        </div>
                                        <div>
                                            Receiver: {defaultAddress.fullname} - {defaultAddress.phoneNumber}
                                        </div>
                                    </>
                                ) : (
                                    <div>No default shipping address set</div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">PAYMENT METHOD</p>
                            <p className="text-sm font-medium">{orderDetails.paymentMethod}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">DISCOUNT</p>
                            <p className="text-sm font-medium">{formatToVND(orderDetails.discountAmount)}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-5">
                            <p className="text-sm font-medium">TOTAL</p>
                            <p className="text-sm font-medium">{formatToVND(orderDetails.finalAmount)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleReturnToCart}
                        className="bg-[#222] text-white px-8 py-4 rounded hover:bg-[#333] transition-colors duration-200"
                    >
                        Return to Cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default Order