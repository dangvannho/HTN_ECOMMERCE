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
    const [selectedShipping, setSelectedShipping] = useState<string>("free");
    const { cartItems, fetchCart } = useCartStore();
    const [cartTotals, setCartTotals] = useState<{
        totalPrice?: number;
        discountAmount?: number;
        finalAmount?: number;
    }>({});
    const [appliedVoucherCode, setAppliedVoucherCode] = useState<string | undefined>(undefined);

    const fetchAndSetCart = async () => {
        const response = await cartApi.getCart();
        const cartData = response?.data?.data;
        if (cartData) {
            setCartTotals({
                totalPrice: cartData.totalPrice,
                discountAmount: cartData.discountAmount,
                finalAmount: cartData.finalAmount,
            });
            setAppliedVoucherCode(cartData.cart?.appliedVoucher?.code);
        }
        await fetchCart();
    };

    useEffect(() => {
        fetchAndSetCart();
    }, []);

    const getShippingCost = (method: string) => {
        switch (method) {
            case "flat-rate":
                return 49000;
            case "local-pickup":
                return 8000;
            default:
                return 0;
        }
    };

    const shippingCost = getShippingCost(selectedShipping);

    const updateQuantity = async (itemId: string, change: number) => {
        try {
            const item = cartItems.find((item) => item._id === itemId);
            if (!item) return;

            const newQuantity = item.quantity + change;
            if (newQuantity < 1) return;


            const response = await cartApi.updateCart({
                productId: item.productId._id,
                variantId: item.variantId._id,
                quantity: newQuantity
            });

            setCartTotals({
                totalPrice: response.totalPrice,
                discountAmount: response.discountAmount,
                finalAmount: response.finalAmount,
            });

        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleProceedToCheckout = () => {
        if (!cartItems.length || !cartTotals.finalAmount) return;

        setCartSummary({
            items: cartItems.map(item => ({
                id: item._id,
                name: item.productId?.name || 'Product',
                price: item.productId?.finalPrice || 0,
                quantity: item.quantity || 0,
                color: item.variantId?.color || 'N/A',
                size: item.variantId?.size || 'N/A'
            })),
            finalAmount: cartTotals.finalAmount!,
            selectedShipping,
            shippingCost,
            totalPrice: cartTotals.totalPrice!,
            discountAmount: cartTotals.discountAmount!
        });
        setStep("checkout");
    };

    const handleRemoveItem = async (item: ICartItem) => {
        try {
            await cartApi.removeCart({
                productId: item.productId._id,
                variantId: item.variantId._id
            });
            await fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleVoucherApplied = (data: { finalAmount: number; discountAmount: number; totalPrice: number } | null) => {
        if (data === null) {
            fetchAndSetCart();
            return;
        }
        setCartTotals({
            finalAmount: data.finalAmount,
            discountAmount: data.discountAmount,
            totalPrice: data.totalPrice
        });
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
                    <CartActions
                        totalPrice={cartTotals.totalPrice}
                        onVoucherApplied={handleVoucherApplied}
                        appliedVoucherCode={appliedVoucherCode}
                    />
                </div>

                <CartTotals
                    totalPrice={cartTotals.totalPrice}
                    finalAmount={cartTotals.finalAmount}
                    discountAmount={cartTotals.discountAmount}
                    selectedShipping={selectedShipping}
                    setSelectedShipping={setSelectedShipping}
                    onProceedToCheckout={handleProceedToCheckout}
                />
            </div>

        </>

    );
};

export default BagShopping;