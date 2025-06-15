import ProgressStepper from "@/pages/cart/_common/progress-stepper"
import BagShopping from "./_pages/bag/bag-shopping"
import { useState } from "react"
import Checkout from "@/pages/cart/_pages/checkout/checkout"
import Order from "./_pages/order-received/order"
import { CartSummary } from "@/services/cart/types/cart.types"

const CartLayout = () => {
    const [step, setStep] = useState("bag")
    const [cartSummary, setCartSummary] = useState<CartSummary>({
        items: [],
        finalAmount: 0,
        selectedShipping: "",
        shippingCost: 0,
    })

    return (
        <div className="container mx-auto lg:max-w-7xl mt-8 sm:mt-14 mb-12 sm:mb-24">
            <h2 className="text-2xl sm:text-[35px] not-italic font-bold px-4 sm:px-0">
                {step === "bag" && "CART"}
                {step === "checkout" && "SHIPPING AND CHECKOUT"}
                {step === "order" && "ORDER RECEIVED"}
            </h2>
            {<ProgressStepper step={step} setStep={setStep} />}
            <main>
                {step === "bag" && <BagShopping setStep={setStep} setCartSummary={setCartSummary} />}
                {step === "checkout" && <Checkout setStep={setStep} cartSummary={cartSummary} />}
                {step === "order" && <Order />}
            </main>
        </div>
    )
}

export default CartLayout