import ButtomCommon from '../../../_common/buttom';
import { formatToVND } from '@/utils/format';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import addressesApi from "@/services/addresses/api/addresses.api";
import { IAddress } from "@/services/addresses/types/addresses.types";
import { IVoucher } from "@/services/vourcher/types/vourcher.types";
import voucherApi from "@/services/vourcher/api/vourcher.api";


interface CartTotalsProps {
    totalPrice?: number;
    finalAmount?: number;
    selectedShipping: string;
    setSelectedShipping: (shipping: string) => void;
    onProceedToCheckout: () => void;
    discountAmount?: number;
    checktotal: boolean;
    onVoucherApplied: (data: {
        finalAmount: number;
        discountAmount: number;
        totalPrice: number;
    } | null) => void;
    appliedVoucherCode?: string;
    isVoucherDialogOpen: boolean;
    setIsVoucherDialogOpen: (open: boolean) => void;
}

const CartTotals = ({
    totalPrice,
    finalAmount,
    selectedShipping,
    setSelectedShipping,
    onProceedToCheckout,
    discountAmount,
    checktotal,
    appliedVoucherCode,
    setIsVoucherDialogOpen
}: CartTotalsProps) => {
    const navigate = useNavigate();
    const [defaultAddress, setDefaultAddress] = useState<IAddress | null>(null);
    const [appliedVoucherInfo, setAppliedVoucherInfo] = useState<IVoucher | null>(null);

    useEffect(() => {
        const fetchDefaultAddress = async () => {
            try {
                const response = await addressesApi.getMyAddresses();
                const defaultAddr = response.data.find((addr: IAddress) => addr.isDefault);
                setDefaultAddress(defaultAddr || null);
            } catch (error) {
                console.error("Error fetching default address:", error);
            }
        };

        fetchDefaultAddress();
    }, []);

    useEffect(() => {
        const fetchVoucherInfo = async () => {
            if (appliedVoucherCode) {
                try {
                    const response = await voucherApi.getAllVouchers();
                    const voucher = response.data.find(v => v.code === appliedVoucherCode);
                    if (voucher) {
                        setAppliedVoucherInfo(voucher);
                    }
                } catch (error) {
                    console.error('Error fetching voucher info:', error);
                }
            } else {
                setAppliedVoucherInfo(null);
            }
        };

        fetchVoucherInfo();
    }, [appliedVoucherCode]);

    const handleChangeAddress = () => {
        navigate('/address');
    };

    const formatAddress = (address: IAddress) => {
        return `${address.address}, ${address.wardName}, ${address.provinceName}`;
    };

    return (
        <div className="w-full lg:w-[35%]">
            <div className="border p-4 sm:p-6">
                <div className="flex justify-between">
                    <h2 className="text-base font-medium mb-6">CART TOTALS</h2>
                    <button
                        onClick={() => setIsVoucherDialogOpen(true)}
                        className="block text-sm font-medium uppercase mt-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-[50%] mb-6"
                    >
                        Select Voucher
                    </button>

                </div>
                <table className="w-full">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-4 text-sm font-medium">SUBTOTAL</td>
                            <td className="py-4 pl-[100px] text-left text-sm">
                                {totalPrice && formatToVND(totalPrice)}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-4 align-top text-sm font-medium">SHIPPING</td>
                            <td className="py-4 pl-[100px]">
                                <div className="space-y-3">
                                    <label className="flex items-center text-gray-600 text-sm font-normal">
                                        <input
                                            type="radio"
                                            className="mr-3 w-4 h-4"
                                            checked={selectedShipping === "free"}
                                            onChange={() => setSelectedShipping("free")}
                                        />
                                        Free shipping
                                    </label>
                                    <label className="flex items-center text-sm font-normal text-gray-600">
                                        <input
                                            type="radio"
                                            className="mr-3 w-4 h-4"
                                            checked={selectedShipping === "flat-rate"}
                                            onChange={() => setSelectedShipping("flat-rate")}
                                        />
                                        Flat rate: {formatToVND(49000)}
                                    </label>
                                    <label className="flex items-center text-sm font-normal text-gray-600">
                                        <input
                                            type="radio"
                                            className="mr-3 w-4 h-4"
                                            checked={selectedShipping === "local-pickup"}
                                            onChange={() => setSelectedShipping("local-pickup")}
                                        />
                                        Local pickup: {formatToVND(8000)}
                                    </label>
                                    <div className="pt-2 border-t">
                                        {defaultAddress ? (
                                            <div>
                                                <p className="text-sm font-normal text-gray-600">
                                                    Shipping to: {formatAddress(defaultAddress)}
                                                </p>
                                                <p className="text-sm font-normal text-gray-600">
                                                    Receiver: {defaultAddress.fullname} - {defaultAddress.phoneNumber}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-sm font-normal text-gray-600">
                                                No default shipping address set
                                            </p>
                                        )}
                                        <button
                                            onClick={handleChangeAddress}
                                            className="text-sm font-medium uppercase mt-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-[50%]"
                                        >
                                            Change address
                                        </button>

                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td className='py-4 text-sm font-medium'>VOUCHER</td>
                            <td className='py-4 text-left pl-[100px]'>
                                {appliedVoucherInfo ? (
                                    <p className="text-sm font-normal text-gray-600">
                                        {appliedVoucherInfo.name} - {appliedVoucherInfo.discountValue}%
                                    </p>
                                ) : (
                                    <p className="text-sm font-normal text-gray-500">
                                        No vouchers have been applied yet
                                    </p>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-4 text-sm font-medium ">DISCOUNT</td>
                            <td className='py-4 text-left pl-[100px] flex flex-col'>
                                {discountAmount && discountAmount > 0 && (
                                    <td className="py-4 text-left ">
                                        {formatToVND(discountAmount)}
                                    </td>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-4 text-sm font-medium">TOTAL</td>
                            <td className="py-4 text-left pl-[100px] flex flex-col">
                                {discountAmount && discountAmount > 0 ? (
                                    <>
                                        <span className="line-through text-gray-400 mr-2">
                                            {totalPrice && formatToVND(totalPrice)}
                                        </span>
                                        {finalAmount && formatToVND(finalAmount)}
                                    </>
                                ) : (
                                    finalAmount && formatToVND(finalAmount)
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ButtomCommon
                title="PROCEED TO CHECKOUT"
                onClick={onProceedToCheckout}
                className="w-full"
                disabled={!checktotal}
            />
        </div>
    );
};

export default CartTotals;
