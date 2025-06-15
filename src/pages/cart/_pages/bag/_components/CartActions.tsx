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
}

const CartActions = ({ totalPrice = 0, onVoucherApplied, appliedVoucherCode }: CartActionsProps) => {
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchVouchers();
    }, []);

    useEffect(() => {
        if (appliedVoucherCode) {
            setSelectedVoucher(appliedVoucherCode);
        }
    }, [appliedVoucherCode]);

    useEffect(() => {
        setLoading(false);
    }, [appliedVoucherCode]);

    const fetchVouchers = async () => {
        try {
            const response = await voucherApi.getAllVouchers();
            setVouchers(response.data);
        } catch (error) {
            toast.error('Failed to fetch vouchers');
        }
    };

    const handleApplyVoucher = async () => {
        if (!selectedVoucher) {
            toast.error('Please select a voucher');
            return;
        }


        try {
            const response = await voucherApi.applyVoucher(selectedVoucher, totalPrice);


            const voucherData = response.data;


            onVoucherApplied({
                finalAmount: voucherData.finalAmount,
                discountAmount: voucherData.discountAmount,
                totalPrice: totalPrice
            });
            toast.success('Voucher applied successfully');
        } catch (error: any) {
            console.error('Error applying voucher:', error);
            toast.error(error.response?.data?.message || 'Failed to apply voucher');
        }
    };

    const handleRemoveVoucher = async () => {
        setLoading(true);
        try {
            await voucherApi.removeVoucher();
            setSelectedVoucher('');
            onVoucherApplied(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to remove voucher');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 mt-6">
            <div className="border p-4">
                <h3 className="text-sm font-medium mb-4">Available Vouchers</h3>
                <div className="space-y-3">
                    {vouchers.map((voucher) => (
                        <label key={voucher._id} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="voucher"
                                value={voucher.code}
                                checked={selectedVoucher === voucher.code}
                                onChange={async () => {
                                    if (selectedVoucher !== voucher.code) {
                                        setLoading(true);
                                        setSelectedVoucher(voucher.code);
                                        try {
                                            const response = await voucherApi.applyVoucher(voucher.code, totalPrice);
                                            const voucherData = response.data;
                                            onVoucherApplied({
                                                finalAmount: voucherData.finalAmount,
                                                discountAmount: voucherData.discountAmount,
                                                totalPrice: totalPrice
                                            });
                                        } catch (error: any) {
                                            toast.error(error.response?.data?.message || 'Failed to apply voucher');
                                        } finally {
                                            setLoading(false);
                                        }
                                    }
                                }}
                                onClick={async (e) => {
                                    if (selectedVoucher === voucher.code) {
                                        await handleRemoveVoucher();
                                        e.preventDefault();
                                    }
                                }}
                                className="w-4 h-4"
                            />

                            <span className="text-sm">
                                {voucher.name} - {voucher.discountValue}%
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );  
};

export default CartActions;
