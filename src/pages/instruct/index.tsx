const Instruct = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1200px] mx-auto px-4 py-8">
                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        HƯỚNG DẪN ĐẶT HÀNG
                    </h1>



                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 1: ĐĂNG NHẬP TÀI KHOẢN
                            </h2>
                            <div className="space-y-2 text-gray-600 text-[15px]">
                                <p>Đăng nhập vào tài khoản của bạn trên Website THE GMEN</p>
                                <p>Nếu chưa có tài khoản thì bạn chọn Đăng ký và nhập thông tin theo đúng hướng dẫn.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 2: TÌM KIẾM VÀ CHỌN SẢN PHẨM YÊU THÍCH TRÊN WEBSITE
                            </h2>
                            <div className="space-y-3 text-gray-600 text-[15px]">
                                <p>- Bạn có thể tìm kiếm sản phẩm theo 2 cách:</p>
                                <p className="pl-4">1. Gõ tên sản phẩm vào mục tìm kiếm ở thanh menu</p>
                                <p className="pl-4">2. Tìm theo danh mục sản phẩm trên thanh menu (Áo, Quần, Áo khoác, Blazer, Combo,...)</p>
                                <p>- Để chọn được sản phẩm ưng ý bạn có thể tham khảo thêm thông tin</p>
                                <p className="pl-4">Tất cả sản phẩm sẵn phẩm quần áo/quần đều có chọn size nên khi chọn được màu sắc ưng ý bạn hãy chọn size phù hợp với cơ thể mình.</p>
                                <p className="pl-4">Nếu bạn chưa chắc về size bạn bấm vào mục "Hướng dẫn chọn size", bạn có thể tham khảo thêm ở bảng size gợi ý và thông số sản phẩm.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 3: THÊM SẢN PHẨM VÀO GIỎ HÀNG
                            </h2>
                            <div className="space-y-2 text-gray-600 text-[15px]">
                                <p>- Chọn kích thước, màu sắc, và số lượng sản phẩm thêm vào giỏ hàng nếu bạn muốn chọn thêm các sản phẩm khác.</p>
                                <p>- Hoặc bấm chọn mua ngay nếu bạn chỉ muốn mua sản phẩm đang chọn</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 4: TIẾN HÀNH ĐẶT HÀNG VÀ THANH TOÁN ĐƠN HÀNG
                            </h2>
                            <div className="space-y-4 text-gray-600 text-[15px]">
                                <p>Trên trang thanh toán, khách hàng lưu ý điền đầy đủ thông tin bắt buộc cho đơn hàng:</p>

                                <div className="space-y-6">
                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">1. ĐỊA CHỈ NGƯỜI MUA</p>
                                        <div className="space-y-3 pl-4">
                                            <div>
                                                <p className="font-medium">• Đối với khách hàng đã có tài khoản</p>
                                                <p className="pl-4 mt-1">Bạn điền thông tin theo hướng dẫn và tick chọn ô thêm vào số địa chỉ sau khi điền đúng đủ thông tin. Để tiện mua sắm cho lần sau</p>
                                            </div>
                                            <div>
                                                <p className="font-medium">• Đối với khách hàng chưa có tài khoản</p>
                                                <p className="pl-4 mt-1">Xin vui lòng điền đầy đủ thông tin người mua.</p>
                                                <p className="pl-4 mt-2 text-sm italic">*The GMEN khuyến khích khách hàng mua sắm bằng cách đăng ký tài khoản và thegmen.vn để tiết kiệm thời gian và nhận những ưu đãi qua tài khoản. Với tài khoản này bạn sẽ dễ dàng đặt mua sản phẩm mà không cần điền lại thông tin mỗi lần mua hàng</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">2. PHƯƠNG THỨC VẬN CHUYỂN</p>
                                        <p className="text-[#7DDDD1] font-medium pl-4">Miễn phí giao hàng với tất cả đơn hàng có giá trị từ 500.000vnđ trở lên tại tất cả tỉnh thành trên toàn quốc.</p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">3. PHƯƠNG THỨC THANH TOÁN</p>
                                        <div className="space-y-2 pl-4">
                                            <p>Bạn có thể chọn 1 trong 2 phương thức thanh toán cơ bản:</p>
                                            <p>• Thanh toán khi nhận hàng bằng tiền mặt (COD)</p>
                                            <p>• Thanh toán khi đặt hàng bằng các loại thẻ ATM qua địa Internet Banking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 5: XÁC NHẬN ĐƠN HÀNG
                            </h2>
                            <div className="space-y-4 text-gray-600 text-[15px]">
                                <p>• Sau khi hoàn tất quy trình mua hàng trên website The GMEN, nhân viên chăm sóc khách hàng tại The GMEN sẽ liên hệ ngay khách hàng để xác nhận đơn hàng và chốt đơn.</p>

                                <div className="mt-6">
                                    <p className="font-medium text-gray-800 mb-4">MỘT SỐ LƯU Ý KHI MUA SẮM TẠI THE GMEN</p>
                                    <div className="space-y-2 pl-4">
                                        <p>• Tất cả các đơn hàng đều được đóng kiện kỹ lưỡng được thử.</p>
                                        <p>• Khách hàng thanh toán phí ship 35k đối với trường hợp muốn thử hàng hoặc không nhận hàng vì bất cứ lý do gì.</p>
                                        <p>• Trong 10 ngày kể từ ngày nhận hàng bạn được:</p>
                                        <div className="pl-4 space-y-1">
                                            <p>- Đổi size miễn phí</p>
                                            <p>- Đổi hàng miễn phí nếu sản phẩm lỗi từ nhà sản xuất</p>
                                            <p>- Đổi màu, bên và lỗng trả thêm phí 50k/sản phẩm</p>
                                            <p>- Đối với khách hàng thanh viên sẽ nhận được ưu đãi GIẢM 20% vào tháng sinh nhật (áp dụng với khách hàng phát sinh đơn hàng thành công trong vòng 12 tháng)</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="font-medium text-center text-lg text-[#7DDDD1] mt-8">
                                    CHÚC BẠN CÓ TRẢI NGHIỆM MUA SẮM VUI VẺ
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