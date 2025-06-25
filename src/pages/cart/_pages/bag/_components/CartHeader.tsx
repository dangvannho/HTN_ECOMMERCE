const CartHeader = () => {
    return (
        <div className="hidden lg:grid lg:grid-cols-12 border-b py-4">
            <div className="lg:col-span-1 text-sm font-medium">CHỌN</div>
            <div className="lg:col-span-2 text-sm font-medium">SẢN PHẨM</div>
            <div className="lg:col-span-3 text-sm font-medium">THÔNG TIN</div>
            <div className="lg:col-span-2 text-sm font-medium">GIÁ</div>
            <div className="lg:col-span-2 text-sm font-medium ">SỐ LƯỢNG</div>
            <div className="lg:col-span-2 text-sm font-medium ">TỔNG TIỀN</div>
        </div>
    );
};

export default CartHeader; 
