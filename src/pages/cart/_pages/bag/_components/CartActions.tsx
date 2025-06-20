import { useState, useEffect } from 'react';
import voucherApi from '@/services/vourcher/api/vourcher.api';
import { IVoucher } from '@/services/vourcher/types/vourcher.types';
import toast from 'react-hot-toast';


interface CartActionsProps {
    totalPrice?: number;
    onVoucherApplied: (data: {
        finalAmount: number;
        discountAmount: number;
        totalPrice: number;
    } | null) => void;
    appliedVoucherCode?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const CartActions = ({ totalPrice = 0, onVoucherApplied, appliedVoucherCode, isOpen, onClose }: CartActionsProps) => {
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<string>('');

    useEffect(() => {
        fetchVouchers();
    }, []);

    useEffect(() => {
        if (appliedVoucherCode) {
            setSelectedVoucher(appliedVoucherCode);
        }
    }, [appliedVoucherCode]);

    const fetchVouchers = async () => {
        try {
            const response = await voucherApi.getAllVouchers();
            setVouchers(response.data);
        } catch (error) {
            toast.error('Failed to fetch vouchers');
        }
    };

    const handleApplyVoucherApi = async (voucherCode: string) => {
        const response = await voucherApi.applyVoucher(voucherCode, totalPrice);
        const voucherData = response.data;
        onVoucherApplied({
            finalAmount: voucherData.finalAmount,
            discountAmount: voucherData.discountAmount,
            totalPrice: totalPrice
        });
        return response;
    };

    const handleRemoveVoucher = async () => {
        try {
            await voucherApi.removeVoucher();
            setSelectedVoucher('');
            onVoucherApplied(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to remove voucher');
        }
    };

    if (!isOpen) return null;

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('vi-VN');
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-full sm:w-[90%] md:w-[80%] max-w-xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg sm:text-2xl font-semibold">Chọn Voucher</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl p-2"
                    >
                        ✕
                    </button>
                </div>

                {/* Voucher List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {vouchers.map((voucher) => (
                        <div
                            key={voucher._id}
                            className={`border rounded-lg overflow-hidden ${selectedVoucher === voucher.code ? 'border-[#7DDDD1]' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex min-h-[100px] sm:h-28">
                                {/* Discount Section */}
                                <div className="bg-[#7DDDD1] w-[25%] sm:w-[20%] flex flex-col justify-center items-center text-white p-2">
                                    <span className="text-xs sm:text-sm font-medium">GIẢM</span>
                                    <span className="text-xl sm:text-2xl font-bold">{voucher.discountValue}%</span>
                                </div>

                                {/* Voucher Info Section */}
                                <div className="flex-1 p-3 sm:p-4">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1">
                                            <p className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                                                {voucher.name}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                                <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                                    Còn {voucher.quantity} lượt
                                                </span>
                                                <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                                                    Tối đa {voucher.maxUsagePerUser} lần/người
                                                </span>
                                            </div>
                                            <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                                                HSD: {formatDate(voucher.endDate)}
                                            </p>
                                        </div>
                                        <input
                                            type="radio"
                                            name="voucher"
                                            value={voucher.code}
                                            checked={selectedVoucher === voucher.code}
                                            onChange={async () => {
                                                if (selectedVoucher !== voucher.code) {
                                                    setSelectedVoucher(voucher.code);
                                                    try {
                                                        await handleApplyVoucherApi(voucher.code);
                                                    } catch (error: any) {
                                                        toast.error(error.response?.data?.message || 'Failed to apply voucher');
                                                    }
                                                }
                                            }}
                                            onClick={async (e) => {
                                                if (selectedVoucher === voucher.code) {
                                                    await handleRemoveVoucher();
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="size-4 sm:size-5 mt-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartActions;
