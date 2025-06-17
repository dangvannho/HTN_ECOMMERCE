import { useState, useEffect } from 'react';
import { ICartItem } from '@/services/cart/types/cart.types';
import { formatToVND } from '@/utils/format';
import { Link } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

interface CartItemProps {
    item: ICartItem;
    onUpdateQuantity: (itemId: string, change: number) => void;
    onRemoveItem: (item: ICartItem) => void;
    onSelectItem: (itemId: string, selected: boolean) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSelectItem }: CartItemProps) => {
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

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
    }, 500);

    const handleQuantityChange = (change: number) => {
        const newQuantity = localQuantity + change;
        if (newQuantity < 1) return;

        // Cập nhật UI ngay lập tức
        setLocalQuantity(newQuantity);
        debouncedUpdate(newQuantity);
    };

    return (
        <div className="border-b relative">
            <div className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Select checkbox */}
                <div className="sm:col-span-1 flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={(e) => onSelectItem(item._id, e.target.checked)}
                        className="w-4 h-4 accent-black cursor-pointer"
                    />
                </div>

                {/* Product image */}
                <div className="sm:col-span-2">
                    <img
                        src={item.product.avatar || '/placeholder-image.jpg'}
                        alt={item.product.name || 'Product'}
                        className='w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover'
                    />
                </div>

                {/* Product info */}
                <div className="sm:col-span-3">
                    <Link
                        to={`/product-detail/${item.product.name}`}
                        className="block text-base font-normal truncate max-w-[200px] sm:max-w-[300px] transition-colors"
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
                </div>

                {/* Price */}
                <div className="sm:col-span-2 flex items-center">
                    <span className="sm:hidden font-medium mr-2">Price:</span>
                    {formatToVND(item.product.price || 0)}
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2">
                    <div className="flex items-center">
                        <button
                            className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50"
                            onClick={() => handleQuantityChange(-1)}
                        >
                            -
                        </button>
                        <div className="w-10 h-8 border-t border-b flex items-center justify-center">
                            {localQuantity}
                        </div>
                        <button
                            className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50"
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 flex items-center justify-between">
                    <span className="sm:hidden font-medium mr-2">Subtotal:</span>
                    <span className="whitespace-nowrap">
                        {formatToVND(item.finalPrice)}
                    </span>
                    <button
                        onClick={() => onRemoveItem(item)}
                        className="text-gray-400 hover:text-gray-600 text-xl ml-4"
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
