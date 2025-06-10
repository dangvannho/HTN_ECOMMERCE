const CartHeader = () => {
    return (
        <div className="hidden sm:grid sm:grid-cols-12 border-b p-4">
            <div className="sm:col-span-3 text-sm font-medium">PRODUCT</div>
            <div className="sm:col-span-3 text-sm font-medium">INFO</div>
            <div className="sm:col-span-2 text-sm font-medium">PRICE</div>
            <div className="sm:col-span-2 text-sm font-medium">QUANTITY</div>
            <div className="sm:col-span-2 text-sm font-medium">SUBTOTAL</div>
        </div>
    );
};

export default CartHeader; 
