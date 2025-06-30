import { useState, useEffect, useRef } from 'react';
import { ICartItem } from '@/services/cart/types/cart.types';
import { formatToVND } from '@/utils/format';
import { Link } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-hot-toast';

interface CartItemProps {
    item: ICartItem;
    onUpdateQuantity: (itemId: string, change: number) => void;
    onRemoveItem: (item: ICartItem) => void;
    onSelectItem: (itemId: string, selected: boolean) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSelectItem }: CartItemProps) => {
    const [localQuantity, setLocalQuantity] = useState(item.quantity);
    const [isUpdating, setIsUpdating] = useState(false);
    const previousQuantityRef = useRef(item.quantity);
    const isMaxStock = localQuantity >= item.variant.stock;

    // Cập nhật localQuantity khi item.quantity thay đổi từ props và không trong quá trình update
    useEffect(() => {
        if (!isUpdating && item.quantity !== previousQuantityRef.current) {
            setLocalQuantity(item.quantity);
            previousQuantityRef.current = item.quantity;
        }
    }, [item.quantity, isUpdating]);

    // Debounce update quantity cho cả input và buttons
    const debouncedUpdate = useDebounce(async (newQuantity: number) => {
        try {
            setIsUpdating(true);
            const change = newQuantity - previousQuantityRef.current;
            if (change !== 0) {
                await onUpdateQuantity(item._id, change);
                previousQuantityRef.current = newQuantity;
            }
        } finally {
            setIsUpdating(false);
        }
    }, 500);

    // Xử lý thay đổi số lượng từ buttons
    const handleQuantityChange = (change: number) => {
        const newQuantity = localQuantity + change;

        // Kiểm tra số lượng tối thiểu
        if (newQuantity < 1) {
            toast.error('Số lượng tối thiểu là 1');
            return;
        }

        // Kiểm tra số lượng không vượt quá stock
        if (newQuantity > item.variant.stock) {
            toast.error(`Số lượng đã đạt tối đa ${item.variant.stock} sản phẩm`);
            return;
        }

        // Cập nhật UI ngay lập tức
        setLocalQuantity(newQuantity);
        debouncedUpdate(newQuantity);
    };

    // Xử lý thay đổi số lượng từ input
    const handleInputChange = (value: string) => {
        if (value === "") {
            setLocalQuantity(0);
            return;
        }

        const numValue = parseInt(value);
        if (!isNaN(numValue)) {
            if (numValue <= 0) {
                setLocalQuantity(1);
                debouncedUpdate(1);
            } else if (numValue <= item.variant.stock) {
                setLocalQuantity(numValue);
                debouncedUpdate(numValue);
            } else {
                toast.error(`Chỉ còn ${item.variant.stock} sản phẩm trong kho`);
                setLocalQuantity(item.variant.stock);
                debouncedUpdate(item.variant.stock);
            }
        }
    };

    // Xử lý khi input mất focus
    const handleInputBlur = (value: string) => {
        if (value === "" || localQuantity === 0) {
            setLocalQuantity(previousQuantityRef.current);
        }
    };

    return (
        <div className="border-b">
            <div className="py-4 px-3 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center">
                {/* Product image and info container */}
                <div className="flex items-center gap-5 sm:gap-9 sm:pl-0 sm:col-span-3">
                    <div className="sm:static sm:col-span-1 flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) => onSelectItem(item._id, e.target.checked)}
                            className="w-4 h-4 accent-black cursor-pointer"
                            disabled={item.variant.stock === 0}
                        />
                    </div>
                    {/* Product image */}
                    <div className="flex-shrink-0">
                        <img
                            src={item.product.avatar || '/placeholder-image.jpg'}
                            alt={item.product.name || 'Product'}
                            className="w-[80px] h-[80px] object-cover"
                        />
                    </div>

                    {/* Product info */}
                    <div className="flex flex-col gap-2">
                        <Link
                            to={`/product-detail/${item.product.slug}`}
                            className="text-sm font-normal truncate max-w-[150px] sm:max-w-[100px] transition-colors underline-offset-4 hover:underline"
                        >
                            {item.product.name || 'Product'}
                        </Link>
                        <div className="text-xs text-[#767676] flex items-center gap-2">
                            Color:
                            <div
                                className="w-3 h-3 rounded-full border border-gray-200"
                                style={{ backgroundColor: item.variant.color || 'N/A' }}
                            ></div>
                        </div>
                        <p className="text-xs text-[#767676]">
                            Size: {item.variant.size || 'N/A'}
                        </p>
                        {isMaxStock && (
                            <p className="text-xs text-red-500">
                                Hết hàng
                            </p>
                        )}
                    </div>
                </div>

                {/* Empty space */}
                <div className="hidden sm:block sm:col-span-2"></div>

                {/* Price */}
                <div className="w-full sm:w-auto sm:col-span-2 sm:ml-auto flex items-center justify-between sm:justify-end">
                    <span className="text-sm font-medium sm:hidden">Giá:</span>
                    <span className="text-sm">{formatToVND(item.product.price || 0)}</span>
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-auto sm:ml-[100px] sm:col-span-2  flex items-center justify-between sm:justify-end">
                    <span className="text-sm font-medium sm:hidden">Số lượng:</span>
                    <div className="flex items-center">
                        <button
                            className="size-6 border flex items-center justify-center hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={localQuantity <= 1 || isUpdating}
                        >
                            -
                        </button>

                        <input
                            type="number"
                            value={localQuantity === 0 ? "" : localQuantity}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={(e) => handleInputBlur(e.target.value)}
                            disabled={isUpdating}
                            className="w-8 text-center outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:bg-gray-50"
                            min="1"
                            max={item.variant.stock}
                        />

                        <button
                            className="size-6 border flex items-center justify-center hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            onClick={() => handleQuantityChange(1)}
                            disabled={isMaxStock || isUpdating}
                            title={isMaxStock ? `Đã đạt số lượng tối đa` : undefined}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Subtotal and Remove button */}
                <div className="w-full sm:w-auto sm:col-span-3 sm:ml-[100px] flex items-center justify-between sm:justify-end">
                    <span className="text-sm font-medium sm:hidden">Tổng tiền:</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm whitespace-nowrap">
                            {formatToVND(item.finalPrice)}
                        </span>
                        <button
                            onClick={() => onRemoveItem(item)}
                            className="text-gray-400 hover:text-gray-600 text-lg pl-2"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
