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
                        {/* Bước 1 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 1: ĐĂNG NHẬP TÀI KHOẢN
                            </h2>
                            <div className="space-y-2 text-gray-600 text-[15px]">
                                <p>Đăng nhập vào tài khoản của bạn trên Website</p>
                                <p>Nếu chưa có tài khoản, chọn Đăng ký và nhập thông tin theo hướng dẫn.</p>
                            </div>
                        </div>

                        {/* Bước 2 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 2: TÌM KIẾM VÀ CHỌN SẢN PHẨM YÊU THÍCH TRÊN WEBSITE
                            </h2>
                            <div className="space-y-3 text-gray-600 text-[15px]">
                                <p>- Bạn có thể tìm kiếm sản phẩm theo 2 cách:</p>
                                <p className="pl-4">1. Gõ tên sản phẩm vào ô tìm kiếm trên thanh menu</p>
                                <p className="pl-4">2. Tìm kiếm theo danh mục sản phẩm trên thanh menu (Áo, Quần, Áo khoác, Blazer, Combo,...)</p>
                                <p>- Để chọn đúng sản phẩm, bạn có thể tham khảo thêm thông tin</p>
                                <p className="pl-4">Tất cả sản phẩm áo/quần đều có các lựa chọn size, khi chọn màu mong muốn hãy chọn size phù hợp với cơ thể bạn.</p>
                                <p className="pl-4">Nếu chưa chắc chắn về size, hãy nhấn vào "Hướng dẫn chọn size", bạn có thể tham khảo bảng size gợi ý và thông số sản phẩm.</p>
                            </div>
                        </div>

                        {/* Bước 3 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 3: THÊM SẢN PHẨM VÀO GIỎ HÀNG
                            </h2>
                            <div className="space-y-2 text-gray-600 text-[15px]">
                                <p>- Chọn size, màu sắc và số lượng để thêm vào giỏ hàng nếu bạn muốn chọn thêm sản phẩm khác.</p>
                                <p>- Hoặc nhấn mua ngay nếu bạn chỉ muốn mua sản phẩm đang chọn.</p>
                            </div>
                        </div>

                        {/* Bước 4 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 4: TIẾN HÀNH ĐẶT HÀNG VÀ THANH TOÁN
                            </h2>
                            <div className="space-y-4 text-gray-600 text-[15px]">
                                <p>Tại trang thanh toán, quý khách vui lòng điền đầy đủ các thông tin cần thiết cho đơn hàng:</p>

                                <div className="space-y-6">
                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">1. ĐỊA CHỈ NGƯỜI MUA</p>
                                        <div className="space-y-3 pl-4">
                                            <div>
                                                <p className="font-medium">• Đối với khách hàng đã có tài khoản</p>
                                                <p className="pl-4 mt-1">Điền thông tin theo hướng dẫn và tick vào ô thêm vào danh sách địa chỉ sau khi nhập đầy đủ thông tin. Điều này giúp việc mua sắm lần sau tiện lợi hơn.</p>
                                            </div>
                                            <div>
                                                <p className="font-medium">• Đối với khách hàng chưa có tài khoản</p>
                                                <p className="pl-4 mt-1">Vui lòng điền đầy đủ thông tin người mua.</p>
                                                <p className="pl-4 mt-2 text-sm italic">*UOM khuyến khích khách hàng mua sắm bằng cách đăng ký tài khoản tại thegmen.vn để tiết kiệm thời gian và nhận ưu đãi. Với tài khoản này, bạn có thể dễ dàng đặt hàng mà không cần nhập lại thông tin mỗi lần mua sắm.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">2. PHƯƠNG THỨC GIAO HÀNG</p>
                                        <p className="text-[#7DDDD1] font-medium pl-4">Miễn phí giao hàng cho mọi đơn từ 500.000đ trở lên trên toàn quốc.</p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">3. PHƯƠNG THỨC THANH TOÁN</p>
                                        <div className="space-y-2 pl-4">
                                            <p>Bạn có thể chọn 1 trong 2 phương thức thanh toán cơ bản:</p>
                                            <p>• Thanh toán khi nhận hàng (COD)</p>
                                            <p>• Thanh toán khi đặt hàng bằng thẻ ATM qua Internet Banking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bước 5 */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                BƯỚC 5: XÁC NHẬN ĐƠN HÀNG
                            </h2>
                            <div className="space-y-4 text-gray-600 text-[15px]">
                                <p>• Sau khi hoàn tất quá trình mua hàng trên website, nhân viên CSKH sẽ liên hệ ngay để xác nhận và chốt đơn hàng cho bạn.</p>

                                <div className="mt-6">
                                    <p className="font-medium text-gray-800 mb-4">LƯU Ý KHI MUA SẮM</p>
                                    <div className="space-y-2 pl-4">
                                        <p>• Tất cả đơn hàng đều được đóng gói và kiểm tra cẩn thận.</p>
                                        <p>• Khách hàng thanh toán phí vận chuyển 35k nếu thử hàng hoặc không nhận hàng vì bất kỳ lý do nào.</p>
                                        <p>• Trong vòng 10 ngày kể từ ngày nhận hàng, bạn có thể:</p>
                                        <div className="pl-4 space-y-1">
                                            <p>- Đổi size miễn phí</p>
                                            <p>- Đổi sản phẩm miễn phí nếu có lỗi từ nhà sản xuất</p>
                                            <p>- Đổi màu sản phẩm với phụ phí 50k/sản phẩm</p>
                                            <p>- Thành viên sẽ nhận ưu đãi GIẢM 20% trong tháng sinh nhật (áp dụng cho khách hàng có đơn thành công trong 12 tháng)</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="font-medium text-center text-lg text-[#7DDDD1] mt-8">
                                    CHÚC QUÝ KHÁCH CÓ TRẢI NGHIỆM MUA SẮM VUI VẺ
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