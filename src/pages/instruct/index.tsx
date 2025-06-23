const Instruct = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1200px] mx-auto px-4 py-8">
                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        ORDER INSTRUCTIONS
                    </h1>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                STEP 1: LOGIN TO YOUR ACCOUNT
                            </h2>
                            <div className="space-y-2 text-gray-600 text-[15px]">
                                <p>Log in to your account on the Website</p>
                                <p>If you don't have an account, select Register and enter your information as instructed.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                STEP 2: SEARCH AND CHOOSE YOUR FAVORITE PRODUCTS ON THE WEBSITE
                            </h2>
                            <div className="space-y-3 text-gray-600 text-[15px]">
                                <p>- You can search for products in 2 ways:</p>
                                <p className="pl-4">1. Type the product name in the search box on the menu bar</p>
                                <p className="pl-4">2. Search by product category on the menu bar (Shirts, Pants, Jackets, Blazers, Combos,...)</p>
                                <p>- To choose the right product, you can refer to additional information</p>
                                <p className="pl-4">All clothing/pants products have size options, so when you choose your desired color, select the size that fits your body.</p>
                                <p className="pl-4">If you're unsure about the size, click on "Size Guide", you can refer to the suggested size chart and product specifications.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                STEP 3: ADD PRODUCTS TO CART
                            </h2>
                            <div className="space-y-2 text-gray-600 text-[15px]">
                                <p>- Select the size, color, and quantity to add to cart if you want to choose more products.</p>
                                <p>- Or click buy now if you only want to purchase the currently selected product</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                STEP 4: PROCEED TO ORDER AND PAYMENT
                            </h2>
                            <div className="space-y-4 text-gray-600 text-[15px]">
                                <p>On the checkout page, customers please note to fill in all required information for the order:</p>

                                <div className="space-y-6">
                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">1. BUYER'S ADDRESS</p>
                                        <div className="space-y-3 pl-4">
                                            <div>
                                                <p className="font-medium">• For customers with an account</p>
                                                <p className="pl-4 mt-1">Fill in your information as guided and tick the box to add to address list after entering complete information. This makes future shopping more convenient</p>
                                            </div>
                                            <div>
                                                <p className="font-medium">• For customers without an account</p>
                                                <p className="pl-4 mt-1">Please fill in all buyer information.</p>
                                                <p className="pl-4 mt-2 text-sm italic">*UOM encourages customers to shop by registering an account at thegmen.vn to save time and receive account benefits. With this account, you can easily order products without re-entering information each time you shop</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">2. SHIPPING METHOD</p>
                                        <p className="text-[#7DDDD1] font-medium pl-4">Free shipping for all orders valued from 500,000 VND or more nationwide.</p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">3. PAYMENT METHOD</p>
                                        <div className="space-y-2 pl-4">
                                            <p>You can choose 1 of 2 basic payment methods:</p>
                                            <p>• Cash on delivery (COD)</p>
                                            <p>• Payment when ordering using ATM cards via Internet Banking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                STEP 5: ORDER CONFIRMATION
                            </h2>
                            <div className="space-y-4 text-gray-600 text-[15px]">
                                <p>• After completing the purchase process on the website, our customer service staff will contact you immediately to confirm and finalize the order.</p>

                                <div className="mt-6">
                                    <p className="font-medium text-gray-800 mb-4">SHOPPING NOTES</p>
                                    <div className="space-y-2 pl-4">
                                        <p>• All orders are carefully packaged and tested.</p>
                                        <p>• Customers pay a 35k shipping fee for trying items or not accepting delivery for any reason.</p>
                                        <p>• Within 10 days from the delivery date, you can:</p>
                                        <div className="pl-4 space-y-1">
                                            <p>- Free size exchange</p>
                                            <p>- Free product exchange if there are manufacturer defects</p>
                                            <p>- Color exchange with an additional fee of 50k/product</p>
                                            <p>- Members will receive a 20% DISCOUNT in their birthday month (applies to customers with successful orders within 12 months)</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="font-medium text-center text-lg text-[#7DDDD1] mt-8">
                                    HAVE A PLEASANT SHOPPING EXPERIENCE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instruct;