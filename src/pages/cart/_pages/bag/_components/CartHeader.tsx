const CartHeader = () => {
    return (
        <div className="hidden lg:grid lg:grid-cols-12 border-b py-4">
            <div className="lg:col-span-1 text-sm font-medium">SELECT</div>
            <div className="lg:col-span-2 text-sm font-medium">PRODUCT</div>
            <div className="lg:col-span-3 text-sm font-medium">INFO</div>
            <div className="lg:col-span-2 text-sm font-medium">PRICE</div>
            <div className="lg:col-span-2 text-sm font-medium ">QUANTITY</div>
            <div className="lg:col-span-2 text-sm font-medium ">SUBTOTAL</div>
        </div>
    );
};

export default CartHeader; 
