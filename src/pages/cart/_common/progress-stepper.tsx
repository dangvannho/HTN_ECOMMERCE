interface ProgressStepperProps {
    step: string;
    setStep: (step: string) => void;
}

const ProgressStepper = ({ step, setStep }: ProgressStepperProps) => {
    return (
        <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
                <div className={`flex gap-3 ${(step === "checkout" || step === "order") ? "cursor-pointer" : ""}`}
                    onClick={() => (step === "checkout" || step === "order") && setStep("bag")}>
                    <p className="text-lg font-medium">01</p>
                    <div className="flex flex-col">
                        <p className="text-lg font-medium">SHOPPING BAG</p>
                        <p className="text-sm font-normal text-[#767676]">Manage Your Items List</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <p className={`text-lg font-medium ${step === "bag" ? "text-[#767676]" : ""}`}>02</p>
                    <div className="flex flex-col">
                        <p className={`text-lg font-medium ${step === "bag" ? "text-[#767676]" : ""}`}>SHIPPING AND CHECKOUT</p>
                        <p className="text-sm font-normal text-[#767676]">Checkout Your Items List</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <p className={`text-lg font-medium ${step === "order" ? "" : "text-[#767676]"}`}>03</p>
                    <div className="flex flex-col">
                        <p className={`text-lg font-medium ${step === "order" ? "" : "text-[#767676]"}`}>CONFIRMATION</p>
                        <p className="text-sm font-normal text-[#767676]">Review And Submit Your Order</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressStepper