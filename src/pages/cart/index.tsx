import ProgressStepper from "@/pages/cart/_common/progress-stepper"
import BagShopping from "./_pages/bag/bag-shopping"
import { useState, useEffect } from "react"
import Checkout from "@/pages/cart/_pages/checkout/checkout"
import Order from "./_pages/order-received/order"
import { CartSummary } from "@/services/cart/types/cart.types"
import { useSearchParams, useNavigate } from "react-router-dom"

const CartLayout = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState("bag")
    const [cartSummary, setCartSummary] = useState<CartSummary>({
        items: [],
        finalAmount: 0,
        selectedShipping: "",
        shippingCost: 0,
        totalPrice: 0,
        discountAmount: 0
    })

    useEffect(() => {
        const currentStep = searchParams.get("step");
        if (!currentStep) {
            navigate('/cart?step=bag', { replace: true });
        } else {
            setStep(currentStep);
        }
    }, [searchParams]);

    const handleSetStep = (newStep: string) => {
        if (step === "order" && newStep === "bag") {
            window.location.href = '/cart?step=bag';
            return;
        }
        setSearchParams({ step: newStep });
    };

    return (
        <div className=" xl:max-w-5xl 2xl:max-w-7xl mx-auto py-[33px] items-center px-4 xl:px-0">
            <h2 className="text-2xl sm:text-[35px] not-italic font-bold px-4 sm:px-0">
                {step === "bag" && "CART"}
                {step === "checkout" && "SHIPPING AND CHECKOUT"}
                {step === "order" && "ORDER RECEIVED"}
            </h2>
            {<ProgressStepper step={step} setStep={handleSetStep} />}
            <main>
                {step === "bag" && <BagShopping setStep={handleSetStep} setCartSummary={setCartSummary} />}
                {step === "checkout" && <Checkout setStep={handleSetStep} cartSummary={cartSummary} />}
                {step === "order" && <Order />}
            </main>
        </div>
    )
};

export default CartLayout;