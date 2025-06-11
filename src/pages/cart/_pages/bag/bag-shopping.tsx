'use client'
import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

import { CartSummary, ICartItem } from '@/services/cart/types/cart.types';
import cartApi from '@/services/cart/api/cart.api';
import { useCartStore } from '@/stores/cart.store';

// Import components
import CartHeader from './_components/CartHeader';
import CartItem from './_components/CartItem';
import CartActions from './_components/CartActions';
import CartTotals from './_components/CartTotals';

interface BagShoppingProps {
    setStep: (step: string) => void
    setCartSummary: React.Dispatch<React.SetStateAction<CartSummary>>;
}

const BagShopping = ({ setStep, setCartSummary }: BagShoppingProps) => {
    const [selectedShipping, setSelectedShipping] = useState<string>("");
    const { cartItems, fetchCart } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const getShippingCost = (method: string) => {
        switch (method) {
            case "flat-rate":
                return 49;
            case "local-pickup":
                return 8;
            default:
                return 0;
        }
    };

    // Sửa lại cách tính subtotal với kiểm tra null
    const subtotal = cartItems.reduce((sum, item) => {
        if (!item?.productId?.finalPrice || !item.quantity) return sum;
        return sum + (item.productId.finalPrice * item.quantity);
    }, 0);

    const shippingCost = getShippingCost(selectedShipping);
    const vat = 19;
    const total = subtotal + vat + shippingCost;

    const updateQuantity = async (itemId: string, change: number) => {
        try {
            const item = cartItems.find((item) => item._id === itemId);
            if (!item) return;

            // Tính toán quantity mới
            const newQuantity = item.quantity + change;

            // Không cho phép quantity < 1
            if (newQuantity < 1) return;

            // Gọi API update cart
            await cartApi.updateCart({
                productId: item.productId._id,
                variantId: item.variantId._id,
                quantity: newQuantity
            });

            // Fetch lại cart để cập nhật UI
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleProceedToCheckout = () => {
        if (!cartItems.length) return;

        setCartSummary({
            items: cartItems.map(item => ({
                id: item._id,
                name: item.productId?.name || 'Product',
                price: item.productId?.finalPrice || 0,
                quantity: item.quantity || 0,
                color: item.variantId?.color || 'N/A',
                size: item.variantId?.size || 'N/A'
            })),
            subtotal,
            vat,
            total,
            selectedShipping,
            shippingCost
        });
        setStep("checkout");
    };

    const handleRemoveItem = async (item: ICartItem) => {
        try {
            await cartApi.removeCart({
                productId: item.productId._id,
                variantId: item.variantId._id
            });

            // Fetch lại cart để cập nhật UI
            await fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <>
            <Progress value={33} />
            <div className="flex flex-col lg:flex-row gap-8 py-6 sm:py-[50px] mt-4 sm:mt-10">
                <div className="w-full lg:w-[65%]">
                    <div className="w-full">
                        <CartHeader />
                        {cartItems.map(item => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemoveItem={handleRemoveItem}
                            />
                        ))}
                    </div>
                    <CartActions />
                </div>

                <CartTotals
                    subtotal={subtotal}
                    total={total}
                    selectedShipping={selectedShipping}
                    setSelectedShipping={setSelectedShipping}
                    onProceedToCheckout={handleProceedToCheckout}
                />
            </div>
        </>
    );
};

export default BagShopping;