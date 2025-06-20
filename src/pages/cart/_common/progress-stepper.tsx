interface ProgressStepperProps {
    step: string;
    setStep: (step: string) => void;
}

const ProgressStepper = ({ step, setStep }: ProgressStepperProps) => {
    return (
        <div className="mt-6 sm:mt-12 px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-4 mb-4">
                {/* Shopping Bag Step */}
                <div
                    className={`flex gap-3 ${(step === "checkout" || step === "order") ? "cursor-pointer" : ""}`}
                    onClick={() => (step === "checkout" || step === "order") && setStep("bag")}
                >
                    <div className="flex justify-center">
                        <p className="text-base sm:text-lg font-medium">01</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm sm:text-lg font-medium">SHOPPING BAG</p>
                        <p className="text-[11px] sm:text-sm font-normal text-[#767676]">Manage Your Items List</p>
                    </div>
                </div>

                {/* Shipping and Checkout Step */}
                <div className="flex gap-3">
                    <div className="flex justify-center">
                        <p className={`text-base sm:text-lg font-medium ${step === "bag" ? "text-[#767676]" : ""}`}>02</p>
                    </div>
                    <div className="flex flex-col">
                        <p className={`text-sm sm:text-lg font-medium ${step === "bag" ? "text-[#767676]" : ""}`}>
                            <span className="sm:hidden">CHECKOUT</span>
                            <span className="hidden sm:inline">SHIPPING AND CHECKOUT</span>
                        </p>
                        <p className="text-[11px] sm:text-sm font-normal text-[#767676]">Checkout Your Items List</p>
                    </div>
                </div>

                {/* Confirmation Step */}
                <div className="flex gap-3">
                    <div className="flex justify-center">
                        <p className={`text-base sm:text-lg font-medium ${step === "order" ? "" : "text-[#767676]"}`}>03</p>
                    </div>
                    <div className="flex flex-col">
                        <p className={`text-sm sm:text-lg font-medium ${step === "order" ? "" : "text-[#767676]"}`}>CONFIRMATION</p>
                        <p className="text-[11px] sm:text-sm font-normal text-[#767676]">Review Your Order</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressStepper