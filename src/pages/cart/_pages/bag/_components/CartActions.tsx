
const CartActions = () => {
    return (
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
    );
};

export default CartActions;
