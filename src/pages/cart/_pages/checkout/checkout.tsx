import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import ButtomCommon from "../../_common/buttom";
import { CartSummary } from "@/services/cart/types/cart.types";
import { Province, District, Ward, IAddress } from "@/services/addresses/types/addresses.types";
import provinces from "@/pages/addresses/_components/select-provices/vietnam-provinces.json";
import addressesApi from "@/services/addresses/api/addresses.api";
import { formatToVND } from '@/utils/format';
import PopupAdress from './_components/Popup-Adress';
import cartApi from '@/services/cart/api/cart.api';
import orderApi from "@/services/order/api/order.api";
import toast from "react-hot-toast";

interface CheckoutProps {
    setStep: (step: string) => void
    cartSummary: CartSummary
}

const vietnamProvinces = provinces as Province[];

const Checkout = ({ setStep, cartSummary }: CheckoutProps) => {
    const [selectedPayment, setSelectedPayment] = useState("COD");
    const [provinces] = useState<Province[]>(vietnamProvinces);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [myAddresses, setMyAddresses] = useState<IAddress[]>([]);
    const [cartData, setCartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullname: "",
        phoneNumber: "",
        address: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        email: ""
    });

    // Fetch default address
    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await addressesApi.getMyAddresses();
            setMyAddresses(response.data);
            const defaultAddress = response.data.find((addr: any) => addr.isDefault);
            if (defaultAddress) {
                setFormData({
                    fullname: defaultAddress.fullname,
                    phoneNumber: defaultAddress.phoneNumber,
                    address: defaultAddress.address,
                    provinceName: defaultAddress.provinceName,
                    districtName: defaultAddress.districtName,
                    wardName: defaultAddress.wardName,
                    email: ""
                });
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };


    useEffect(() => {
        if (formData.provinceName) {
            const selectedProvince = provinces.find(
                (province) => province.name === formData.provinceName
            );
            if (selectedProvince) {
                setDistricts(selectedProvince.districts || []);
            }
        }
    }, [formData.provinceName, provinces]);


    useEffect(() => {
        if (formData.districtName && districts.length > 0) {
            const selectedDistrict = districts.find(
                (district) => district.name === formData.districtName
            );
            if (selectedDistrict) {
                setWards(selectedDistrict.wards || []);
            }
        }
    }, [formData.districtName, districts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvince = provinces.find(
            (province) => province.name === e.target.value
        );
        setDistricts(selectedProvince?.districts || []);
        setWards([]);
        handleInputChange(e);
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrict = districts.find(
            (district) => district.name === e.target.value
        );
        setWards(selectedDistrict?.wards || []);
        handleInputChange(e);
    };

    const HandelSubmitOrder = async () => {
        // Lấy địa chỉ mặc định (hoặc địa chỉ đang chọn)
        const defaultAddress = myAddresses.find(addr => addr.isDefault);
        if (!defaultAddress) {
            toast.error("Vui lòng chọn địa chỉ giao hàng!");
            return;
        }

        setIsLoading(true); // Start loading
        try {
            const response = await orderApi.createOrder({
                addressId: defaultAddress._id,
                paymentMethod: selectedPayment
            });

            // Save order ID to localStorage
            localStorage.setItem('orderId', response.data._id);
            setStep("order");
        } catch (error) {
            toast.error("Đặt hàng thất bại!");
            console.error(error);
        } finally {
            setIsLoading(false); // End loading regardless of success/failure
        }
    };


    const handleSelectAddress = async (address: IAddress) => {
        try {
            // Cập nhật địa chỉ mặc định
            await addressesApi.updateAddress(address._id, { ...address, isDefault: true });

            // Cập nhật form data với địa chỉ được chọn
            setFormData({
                fullname: address.fullname,
                phoneNumber: address.phoneNumber,
                address: address.address,
                provinceName: address.provinceName,
                districtName: address.districtName,
                wardName: address.wardName,
                email: formData.email // Giữ nguyên email nếu có
            });

            // Cập nhật districts và wards dựa trên địa chỉ được chọn
            const selectedProvince = provinces.find(
                (province) => province.name === address.provinceName
            );
            if (selectedProvince) {
                setDistricts(selectedProvince.districts || []);

                const selectedDistrict = selectedProvince.districts.find(
                    (district) => district.name === address.districtName
                );
                if (selectedDistrict) {
                    setWards(selectedDistrict.wards || []);
                }
            }
            setShowAddressModal(false);
        } catch (error) {
            console.error("Error setting default address:", error);
            toast.error("Không thể cập nhật địa chỉ mặc định!");
        }
    };

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await cartApi.getCart();
                const cartData = response?.data?.data;

                if (cartData) {
                    // Lọc chỉ lấy các items có selected: true
                    const selectedItems = cartData.cart.items.filter(item => item.selected);
                    setCartData({
                        ...cartData,
                        cart: {
                            ...cartData.cart,
                            items: selectedItems
                        },
                        totalPrice: cartData.totalPrice,
                        selectedItemsCount: cartData.selectedItemsCount,
                        discountAmount: cartData.discountAmount,
                        finalAmount: cartData.finalAmount,
                        voucherInfo: cartData.voucherInfo
                    });
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCartData();
    }, []);

    return (
        <>
            <Progress value={66} />
            <div className="py-6 sm:py-[50px] mt-4 sm:mt-10 px-4 sm:px-0">
                <div className="">
                    <div className="flex justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6">CHI TIẾT THANH TOÁN</h2>
                        <button
                            type="button"
                            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setShowAddressModal(true)}
                        >
                            Sổ địa chỉ
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 my-6 sm:my-[34px]">
                        {/* Left column - Billing Form */}
                        <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-[65%]">
                            <div className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Họ và tên</label>
                                    <input
                                        disabled
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Số Điện Thoại</label>
                                    <input
                                        disabled
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Địa Chỉ</label>
                                    <input
                                        disabled
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                                    <select
                                        disabled
                                        name="provinceName"
                                        value={formData.provinceName}
                                        onChange={handleProvinceChange}
                                        className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-[#fafafa] appearance-none"
                                        required
                                    >
                                        <option value="">Chọn Tỉnh/Thành phố</option>
                                        {provinces.map((province) => (
                                            <option key={province.code} value={province.name}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Quận/Huyện</label>
                                    <select
                                        disabled
                                        name="districtName"
                                        value={formData.districtName}
                                        onChange={handleDistrictChange}
                                       className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-[#fafafa] appearance-none"
                                        required
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map((district) => (
                                            <option key={district.code} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Phường/Xã</label>
                                    <select
                                        disabled
                                        name="wardName"
                                        value={formData.wardName}
                                        onChange={handleInputChange}
                                      className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-[#fafafa] appearance-none"
                                        required
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map((ward) => (
                                            <option key={ward.code} value={ward.name}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Order Summary */}
                        <div className="flex flex-col gap-5 w-full lg:w-[35%]">
                            <div className="flex flex-col gap-5 border border-[#222] py-[38px] px-[41px]">
                                <h4 className="text-base font-medium">ĐƠN HÀNG CỦA BẠN</h4>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-sm font-medium">SẢN PHẨM</span>
                                    <span className="text-sm font-medium">TỔNG TIỀN</span>
                                </div>

                                {cartData?.cart?.items?.map((item: any) => (
                                    <div key={item._id} className="flex justify-between gap-10">
                                        <span className="text-sm font-medium text-[#767676]">
                                            {item.product.name}
                                            {item.variant && ` - ${item.variant.size}`}
                                        </span>
                                        <span className="text-sm font-medium text-[#767676]">
                                            {formatToVND(item.finalPrice)}
                                        </span>
                                    </div>
                                ))}

                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-sm font-medium">TỔNG TIỀN HÀNG</span>
                                    <span className="text-sm font-medium">
                                        {formatToVND(cartData?.totalPrice || 0)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">PHÍ VẬN CHUYỂN</span>
                                    <span className="text-sm font-medium">
                                        {cartSummary.selectedShipping === "free" && "Miễn phí vận chuyển"}
                                        {cartSummary.selectedShipping === "flat-rate" && formatToVND(49000)}
                                        {cartSummary.selectedShipping === "local-pickup" && formatToVND(8000)}
                                    </span>
                                </div>

                                {cartData?.discountAmount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">GIẢM GIÁ</span>
                                        <span className="text-sm font-medium text-red-500">
                                            -{formatToVND(cartData.discountAmount)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between border-t pt-2 font-medium">
                                    <span className="text-sm font-medium">TỔNG THANH TOÁN</span>
                                    <span className="text-sm font-medium">
                                        {formatToVND(cartData?.finalAmount || 0)}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex flex-col gap-3 border border-[#E4E4E4] py-[38px] px-[41px]">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="COD"
                                        checked={selectedPayment === "COD"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="accent-[#222]"
                                    />
                                    <span className="text-base font-normal">Thanh toán khi nhận hàng</span>
                                </label>

                                <p className="text-xs">
                                    Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng và hỗ trợ trải nghiệm của bạn trên trang web này, cũng như cho các mục đích khác được mô tả trong{' '}
                                    <a href="#" className="text-[#C32929]">chính sách bảo mật</a> của chúng tôi.
                                </p>
                            </div>

                            <ButtomCommon
                                title="ĐẶT HÀNG"
                                onClick={HandelSubmitOrder}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <PopupAdress
                show={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                addresses={myAddresses}
                onSelect={handleSelectAddress}
            />
        </>
    );
};

export default Checkout;