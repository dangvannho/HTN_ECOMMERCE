import FloatingInput from "@/components/commons/float-input"
import { Progress } from "@/components/ui/progress"
import { useState } from "react";
import ButtomCommon from "../../_common/buttom";
import { CartSummary } from "@/services/cart/types/cart.types";


interface checkoutProps {
    // setStep: React.Dispatch<React.SetStateAction<string>>
    setStep: (step: string) => void
    cartSummary: CartSummary
}
const Checkout = ({ setStep, cartSummary }: checkoutProps) => {
    const [fistname, setFistName] = useState("");
    const [lastname, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [street, setStreet] = useState("");
    const [town, setTown] = useState("");
    const [code, setCode] = useState("");
    const [province, setProvince] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("bank");

    const getPaymentMethodText = (value: string) => {
        const paymentMethods: { [key: string]: string } = {
            bank: "Direct bank transfer",
            check: "Check payments",
            cash: "Cash on delivery",
            paypal: "PayPal"
        };
        return paymentMethods[value];
    };

    const HandelSubmitOrder = () => {
        const orderData = {
            cartSummary,
            paymentMethod: getPaymentMethodText(selectedPayment),
            billingDetails: {
                firstName: fistname,
                lastName: lastname,
                orderNumber: `ORD${Math.floor(Math.random() * 100000)}`,
                date: new Date().toLocaleDateString()
            }
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
        setStep("order");
    }
    return (
        <>
            <Progress value={66} />
            <div className="py-6 sm:py-[50px] mt-4 sm:mt-10 px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Checkout</h2>
                <div className="mt-6 sm:mt-10">
                    <h3 className="text-base font-medium">BILLING DETAILS</h3>
                    <div className="flex flex-col lg:flex-row gap-8 my-6 sm:my-[34px]">
                        {/* Left column - Billing Form */}
                        <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-[65%]">
                            {/* firstName lastName */}
                            <div className="grid grid-cols-2 gap-4">
                                <FloatingInput
                                    label="First Name"
                                   
                                    onChange={(e) => setFistName(e.target.value)}
                                />
                                <FloatingInput
                                    label="Last Name"
                                   
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>


                            <FloatingInput
                                label="Company Name"
                                
                                onChange={(e) => setCompany(e.target.value)}
                            />

                            {/* dropdown input */}
                            <select className="text-sm text-[#222] w-full p-2 border rounded border-gray-300">
                                <option value="">Country / Region *</option>
                                <option value="turkey">Turkey</option>
                                {/* Add more countries */}
                            </select>

                            <FloatingInput
                                label="Street Address"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <FloatingInput
                                label="Town / City"
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
                            />
                            <FloatingInput
                                label="Postcode / ZIP"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <FloatingInput
                                label="Province"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                            <FloatingInput
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <FloatingInput
                                label="Your Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {/* text box */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" />
                                    <span className="text-sm font-medium">CREATE AN ACCOUNT?</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" />
                                    <span className="text-sm font-medium">SHIP TO A DIFFERENT ADDRESS?</span>
                                </label>
                            </div>
                            <textarea
                                placeholder="Order Notes (optional)"
                                className="w-full p-2 border rounded h-32 border-gray-300 text-sm "
                            />
                        </div>

                        {/* Right column - Order Summary */}
                        <div className="flex flex-col gap-5 w-full lg:w-[35%]">
                            <div className="flex flex-col gap-5 border border-[#222] py-[38px] px-[41px]">
                                <h4 className="text-base font-medium">YOUR ORDER</h4>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-sm font-medium">PRODUCT</span>
                                    <span className="text-sm font-medium">SUBTOTAL</span>
                                </div>

                                {/* Render cart items dynamically */}
                                {cartSummary.items.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span className="text-sm font-medium text-[#767676]">
                                            {item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}
                                        </span>
                                        <span className="text-sm font-medium text-[#767676]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-sm font-medium">SUBTOTAL</span>
                                    <span className="text-sm font-medium">${cartSummary.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">SHIPPING</span>
                                    <span className="text-sm font-medium">
                                        {cartSummary.selectedShipping === "free" && "Free shipping"}
                                        {cartSummary.selectedShipping === "flat-rate" && `Flat rate`}
                                        {cartSummary.selectedShipping === "local-pickup" && `Local pickup`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">VAT</span>
                                    <span className="text-sm font-medium">${cartSummary.vat.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 font-medium">
                                    <span className="text-sm font-medium">TOTAL</span>
                                    <span className="text-sm font-medium">${cartSummary.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex flex-col gap-3 border border-[#E4E4E4] py-[38px] px-[41px]">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank"
                                        checked={selectedPayment === "bank"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="accent-[#222]"
                                    />
                                    <span className="text-base font-normal">Direct bank transfer</span>
                                </label>
                                <p className="text-sm font-normal">
                                    Make your payment directly into our bank account. Please use your Order ID as the
                                    payment reference. Your order will not be shipped until the funds have cleared in our account.
                                </p>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="check"
                                        checked={selectedPayment === "check"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="accent-[#222]"
                                    />
                                    <span className="text-base font-normal">Check payments</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        checked={selectedPayment === "cash"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="accent-[#222]"
                                    />
                                    <span className="text-base font-normal">Cash on delivery</span>
                                </label>
                                {/* <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="paypal"
                                        checked={selectedPayment === "paypal"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="accent-[#222]"
                                    />
                                    <span className="text-base font-normal">PayPal</span>
                                </label> */}
                                <p className="text-xs">
                                    Your personal data will be used to process your order, support your
                                    experience throughout this website, and for other purposes
                                    described in our <a href="#" className="text-[#C32929]">privacy policy</a>.
                                </p>
                            </div>

                            <ButtomCommon title="PLACE ORDER" onClick={HandelSubmitOrder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout