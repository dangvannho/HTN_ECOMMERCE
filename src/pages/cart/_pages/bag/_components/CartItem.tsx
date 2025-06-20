import { useState, useEffect } from 'react';
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
    const isMaxStock = localQuantity >= item.variant.stock;

    // Cập nhật localQuantity khi item.quantity thay đổi từ props
    useEffect(() => {
        setLocalQuantity(item.quantity);
    }, [item.quantity]);

    // Debounce update quantity
    const debouncedUpdate = useDebounce((newQuantity: number) => {
        const change = newQuantity - item.quantity;
        if (change !== 0) {
            onUpdateQuantity(item._id, change);
        }
    }, 1000);

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

    return (
        <div className="border-b relative">
            <div className="p-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center">
                {/* Select checkbox */}

                {/* Product image and info container */}
                <div className="flex items-center gap-4 sm:pl-0 sm:col-span-5">
                    <div className="sm:static sm:col-span-1 flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) => onSelectItem(item._id, e.target.checked)}
                            className="w-4 h-4 accent-black cursor-pointer"
                        />
                    </div>
                    {/* Product image */}
                    <div className="flex-shrink-0">
                        <img
                            src={item.product.avatar || '/placeholder-image.jpg'}
                            alt={item.product.name || 'Product'}
                            className="w-[100px] h-[100px] object-cover"
                        />
                    </div>

                    {/* Product info */}
                    <div className="flex flex-col gap-2">
                        <Link
                            to={`/product-detail/${item.product.slug}`}
                            className="text-base font-normal truncate max-w-[200px] transition-colors hover:text-gray-600"
                        >
                            {item.product.name || 'Product'}
                        </Link>
                        <div className="text-sm text-[#767676] flex items-center gap-2">
                            Color:
                            <div
                                className="w-4 h-4 rounded-full border-2 border-white"
                                style={{ backgroundColor: item.variant.color || 'N/A' }}
                            ></div>
                        </div>
                        <p className="text-sm text-[#767676]">
                            Size: {item.variant.size || 'N/A'}
                        </p>
                        {isMaxStock && (
                            <p className="text-xs text-red-500">
                                Đã đạt số lượng tối đa trong kho ({item.variant.stock})
                            </p>
                        )}
                    </div>
                </div>

                {/* Price */}
                <div className="w-full sm:w-auto sm:col-span-2 flex items-center justify-between sm:justify-start mt-4 sm:mt-0">
                    <span className="text-sm font-medium sm:hidden">Giá:</span>
                    <span className="text-sm">{formatToVND(item.product.price || 0)}</span>
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-auto sm:col-span-2 flex items-center justify-between sm:justify-start mt-4 sm:mt-0">
                    <span className="text-sm font-medium sm:hidden">Số lượng:</span>
                    <div className="flex items-center">
                        <button
                            className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={localQuantity <= 1}
                        >
                            -
                        </button>

                        <input
                            type="number"
                            value={localQuantity === 0 ? "" : localQuantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                    setLocalQuantity(0);
                                } else {
                                    const numValue = parseInt(value);
                                    if (!isNaN(numValue) && numValue > 0) {
                                        if (numValue <= item.variant.stock) {
                                            setLocalQuantity(numValue);
                                            // Tính toán sự thay đổi số lượng
                                            const change = numValue - item.quantity;
                                            if (change !== 0) {
                                                onUpdateQuantity(item._id, change);
                                            }
                                        } else {
                                            toast.error(`chỉ còn ${item.variant.stock} sản phẩm trong kho trong kho`);
                                            setLocalQuantity(item.variant.stock);
                                        }
                                    }
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    setLocalQuantity(item.quantity);
                                }
                            }}
                            className="w-8 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="1"
                            max={item.variant.stock}
                        />

                        <button
                            className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            onClick={() => handleQuantityChange(1)}
                            disabled={isMaxStock}
                            title={isMaxStock ? `Đã đạt số lượng tối đa (${item.variant.stock})` : undefined}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Subtotal and Remove button */}
                <div className="w-full sm:w-auto sm:col-span-2 flex items-center justify-between mt-4 sm:mt-0">
                    <span className="text-sm font-medium sm:hidden">Tổng tiền:</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm whitespace-nowrap">
                            {formatToVND(item.finalPrice)}
                        </span>
                        <button
                            onClick={() => onRemoveItem(item)}
                            className="text-gray-400 hover:text-gray-600 text-xl"
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
