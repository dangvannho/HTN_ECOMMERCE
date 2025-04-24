import { useState } from 'react';
import images from "@/assets/images.svg"
import { Progress } from '@/components/ui/progress';
import ButtomCommon from '../../_common/buttom';
import { CartItem, CartSummary } from "@/pages/cart/types/types-cart";

interface BagShoppingProps {
    // setStep: React.Dispatch<React.SetStateAction<string>>;
    setStep: (step: string) => void
    setCartSummary: React.Dispatch<React.SetStateAction<CartSummary>>;
}

const BagShopping = ({ setStep, setCartSummary }: BagShoppingProps) => {
    const [selectedShipping, setSelectedShipping] = useState<string>("");
    const [products, setProducts] = useState<CartItem[]>([
        {
            id: 1,
            name: "Zessi Dresses",
            price: 99,
            quantity: 1,
        },
        {
            id: 2,
            name: "Kirby T-Shirt",
            price: 99,
            quantity: 1,
            color: "Yellow",
            size: "L"
        },
        {
            id: 3,
            name: "Cableknit Shawl",
            price: 99,
            quantity: 1
        }
    ]);

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

    const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const shippingCost = getShippingCost(selectedShipping);
    const vat = 19;
    const total = subtotal + vat + shippingCost;

    const updateQuantity = (id: number, change: number) => {
        setProducts(products.map(product =>
            product.id === id
                ? { ...product, quantity: Math.max(0, product.quantity + change) }
                : product
        ));
    };

    const handleProceedToCheckout = () => {
        setCartSummary({
            items: products,
            subtotal,
            vat,
            total,
            selectedShipping,
            shippingCost
        });
        setStep("checkout");
    };

    return (
        <>
            <Progress value={33} />
            <div className="flex flex-col lg:flex-row gap-8 py-6 sm:py-[50px] mt-4 sm:mt-10">
                {/* Left column for product details */}
                <div className="w-full lg:w-[65%]">
                    {/* Mobile product list */}
                    <div className="block lg:hidden">
                        {products.map(product => (
                            <div key={product.id} className="border-b mb-4 pb-4">
                                <div className="flex gap-4">
                                    <img src={images} alt="" className='w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]' />
                                    <div className="flex-1">
                                        <h3 className="text-base font-normal">{product.name}</h3>
                                        {product.color && <p className="text-sm text-[#767676]">Color: {product.color}</p>}
                                        {product.size && <p className="text-sm text-[#767676]">Size: {product.size}</p>}
                                        <p className="text-sm mt-2">${product.price}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="w-8 h-8 border flex items-center justify-center"
                                                onClick={() => updateQuantity(product.id, -1)}
                                            >
                                                -
                                            </button>
                                            <div className="w-10 h-8 border-t border-b flex items-center justify-center">
                                                {product.quantity}
                                            </div>
                                            <button
                                                className="w-8 h-8 border flex items-center justify-center"
                                                onClick={() => updateQuantity(product.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="mt-2">Subtotal: ${product.price * product.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop table */}
                    <table className="w-full hidden lg:table">
                        <thead>
                            <tr className="border-b">
                                <th className="text-sm font-medium  text-left p-4">PRODUCT</th>
                                <th className="text-sm font-medium text-left p-4 ">PRICE</th>
                                <th className="text-sm font-medium text-left p-4 ">QUANTITY</th>
                                <th className="text-sm font-medium text-left p-4 ">SUBTOTAL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b">
                                    <td className="py-6">
                                        <div className="flex items-center gap-4">
                                            <img src={images} alt="" className='w-[120px] h-[120px]' />
                                            <div>
                                                <h3 className="text-base font-normal">{product.name}</h3>
                                                {product.color && <p className="text-sm not-italic font-normal text-[#767676]">Color: {product.color}</p>}
                                                {product.size && <p className="text-sm not-italic font-normal text-[#767676]">Size: {product.size}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">${product.price}</td>
                                    <td className="py-6">
                                        <div className="flex items-center">
                                            <button
                                                className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50"
                                                onClick={() => updateQuantity(product.id, -1)}
                                            >
                                                -
                                            </button>
                                            <div className="w-10 h-8 border-t border-b flex items-center justify-center text-sm">
                                                {product.quantity}
                                            </div>
                                            <button
                                                className="w-8 h-8 border flex items-center justify-center hover:bg-gray-50"
                                                onClick={() => updateQuantity(product.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">${product.price * product.quantity}</td>
                                    <td className="p-4">
                                        <button className="text-gray-400">×</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                        <div className="flex gap-4">
                            <button className="border px-4 sm:px-6 py-2 bg-white text-sm font-medium w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    className="w-full sm:w-60 px-2 sm:px-6 py-2 outline-none"
                                />
                                APPLY COUPON
                            </button>
                        </div>
                        <button className="border px-4 sm:px-[55px] py-4 sm:py-[22px] bg-[#E4E4E4] text-sm font-medium hover:bg-gray-300 w-full sm:w-auto">
                            UPDATE CART
                        </button>
                    </div>
                </div>

                {/* Right column for cart totals */}
                <div className="w-full lg:w-[35%]">
                    <div className="border p-4 sm:p-6">
                        <h2 className="text-base font-medium mb-6">CART TOTALS</h2>

                        <table className="w-full">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4 text-sm font-medium">SUBTOTAL</td>
                                    <td className="py-4 pl-[120px] text-left text-sm">${subtotal}</td>
                                </tr>

                                <tr>
                                    <td className="py-4 align-top text-sm font-medium">SHIPPING</td>
                                    <td className="py-4 pl-[120px]">
                                        <div className="space-y-3">
                                            <label className="flex items-center text-gray-600 text-sm font-normal">
                                                <input
                                                    type="checkbox"
                                                    className="mr-3 w-4 h-4"
                                                    checked={selectedShipping === "free"}
                                                    onChange={() => setSelectedShipping("free")}
                                                />
                                                Free shipping
                                            </label>
                                            <label className="flex items-center text-sm font-normal text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    className="mr-3 w-4 h-4"
                                                    checked={selectedShipping === "flat-rate"}
                                                    onChange={() => setSelectedShipping("flat-rate")}
                                                />
                                                Flat rate: $49
                                            </label>
                                            <label className="flex items-center text-sm font-normal text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    className="mr-3 w-4 h-4"
                                                    checked={selectedShipping === "local-pickup"}
                                                    onChange={() => setSelectedShipping("local-pickup")}
                                                />
                                                Local pickup: $8
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
                                    <td className="py-4 text-left px-[120px]">${vat}</td>
                                </tr>

                                <tr>
                                    <td className="py-4 text-sm font-medium">TOTAL</td>
                                    <td className="py-4 text-left px-[120px]">${total}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <ButtomCommon
                        title="PROCEED TO CHECKOUT"
                        onClick={handleProceedToCheckout}
                        className="w-full"
                    />
                </div>
            </div>
        </>
    )
}

export default BagShopping