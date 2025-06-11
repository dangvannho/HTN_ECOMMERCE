import { ICartItem } from '@/services/cart/types/cart.types';
import { formatToVND } from '@/utils/format';
import { Link } from 'react-router-dom';

interface CartItemProps {
    item: ICartItem;
    onUpdateQuantity: (itemId: string, change: number) => void;
    onRemoveItem: (item: ICartItem) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
    return (
        <div className="border-b relative">
            <div className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Product image */}
                <div className="sm:col-span-3">
                    <img
                        src={item.variantId?.images?.[0] || '/placeholder-image.jpg'}
                        alt={item.productId?.name || 'Product'}
                        className='w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover'
                    />
                </div>

                {/* Product info */}
                <div className="sm:col-span-3">
                    <Link
                        to={`/product-detail/${item.productId?.slug}`}
                        className="block text-base font-normal truncate max-w-[200px] sm:max-w-[300px]  transition-colors"
                    >
                        {item.productId?.name || 'Product'}
                    </Link>
                    <p className="text-sm text-[#767676] flex items-center gap-2">
                        Color:
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white"
                            style={{ backgroundColor: item.variantId?.color || 'N/A' }}
                        ></div>
                    </p>
                    <p className="text-sm text-[#767676]">
                        Size: {item.variantId?.size || 'N/A'}
                    </p>
                </div>

                {/* Price */}
                <div className="sm:col-span-2 flex items-center">
                    <span className="sm:hidden font-medium mr-2">Price:</span>
                    {formatToVND(item.productId?.finalPrice || 0)}
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2">
                    <div className="flex items-center">
                        <button
                            className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50"
                            onClick={() => onUpdateQuantity(item._id, -1)}
                        >
                            -
                        </button>
                        <div className="w-10 h-8 border-t border-b flex items-center justify-center">
                            {item.quantity}
                        </div>
                        <button
                            className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50"
                            onClick={() => onUpdateQuantity(item._id, 1)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Subtotal */}
                <div className="sm:col-span-2 flex items-center justify-between">
                    <span className="sm:hidden font-medium mr-2">Subtotal:</span>
                    <span className="whitespace-nowrap">
                        {formatToVND((item.productId?.finalPrice || 0) * (item.quantity || 1))}
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
