import ButtomCommon from '../../../_common/buttom';
import { formatToVND } from '@/utils/format';

interface CartTotalsProps {
    subtotal: number;
    vat: number;
    total: number;
    selectedShipping: string;
    setSelectedShipping: (shipping: string) => void;
    onProceedToCheckout: () => void;
}

const CartTotals = ({
    subtotal,
    vat,
    total,
    selectedShipping,
    setSelectedShipping,
    onProceedToCheckout
}: CartTotalsProps) => {
    return (
        <div className="w-full lg:w-[35%]">
            <div className="border p-4 sm:p-6">
                <h2 className="text-base font-medium mb-6">CART TOTALS</h2>
                <table className="w-full">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-4 text-sm font-medium">SUBTOTAL</td>
                            <td className="py-4 pl-[100px] text-left text-sm">{formatToVND(subtotal)}</td>
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
                                        <p className="text-sm font-normal text-gray-600">Shipping to AL.</p>
                                        <button className="text-sm font-medium uppercase mt-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-[50%]">
                                            Change address
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-4 text-sm font-medium">VAT</td>
                            <td className="py-4 text-left px-[100px]">{formatToVND(vat)}</td>
                        </tr>

                        <tr>
                            <td className="py-4 text-sm font-medium">TOTAL</td>
                            <td className="py-4 text-left px-[100px]">{formatToVND(total)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ButtomCommon
                title="PROCEED TO CHECKOUT"
                onClick={onProceedToCheckout}
                className="w-full"
            />
        </div>
    );
};

export default CartTotals;
