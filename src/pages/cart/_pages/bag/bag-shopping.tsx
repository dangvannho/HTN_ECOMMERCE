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
    const [checktotal, setChecktotal] = useState<boolean>(false);
    const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);

    const fetchAndSetCart = async () => {
        const response = await cartApi.getCart();
        const cartData = response?.data.data;
        if (cartData) {
            setCartTotals({
                totalPrice: cartData.totalPrice,
                discountAmount: cartData.discountAmount,
                finalAmount: cartData.finalAmount,
            });
            setAppliedVoucherCode(cartData.voucherInfo?.code);
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

            await cartApi.updateCart({
                productId: item.product._id,
                variantId: item.variant._id,
                quantity: newQuantity
            });


            await fetchAndSetCart();
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    useEffect(() => {
        if (!cartTotals.finalAmount || cartTotals.finalAmount <= 0) {
            setChecktotal(false);
        } else {
            setChecktotal(true);
        }
    }, [cartTotals.finalAmount]);

    const handleProceedToCheckout = () => {
        if (!cartTotals.finalAmount || cartTotals.finalAmount <= 0) {
            return;
        }

        setCartSummary({
            items: cartItems.map(item => ({
                id: item._id,
                name: item.product?.name || 'Product',
                price: item.finalPrice || 0,
                quantity: item.quantity || 0,
                color: item.variant?.color || 'N/A',
                size: item.variant?.size || 'N/A'
            })),
            finalAmount: cartTotals.finalAmount,
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
                productId: item.product._id,
                variantId: item.variant._id
            });
            await fetchAndSetCart();
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
        setIsVoucherDialogOpen(false);
        fetchAndSetCart();
    };

    const handleSelectItem = async (itemId: string, selected: boolean) => {
        try {
            await cartApi.updateSelect({ itemId, selected });
            // Fetch lại cart sau khi update selection
            await fetchAndSetCart();
        } catch (error) {
            console.error('Error selecting item:', error);
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
                                onSelectItem={handleSelectItem}
                            />
                        ))}
                    </div>
                    <CartActions
                        isOpen={isVoucherDialogOpen}
                        onClose={() => setIsVoucherDialogOpen(false)}
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
                    checktotal={checktotal}
                    onVoucherApplied={handleVoucherApplied}
                    appliedVoucherCode={appliedVoucherCode}
                    isVoucherDialogOpen={isVoucherDialogOpen}
                    setIsVoucherDialogOpen={setIsVoucherDialogOpen}
                />


            </div>
        </>
    );
};

export default BagShopping;