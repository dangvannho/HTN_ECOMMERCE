
import { IAddress } from "@/services/addresses/types/addresses.types";
import { Link } from "react-router-dom";

interface PopupAdressProps {
    show: boolean;
    onClose: () => void;
    addresses: IAddress[];
    onSelect: (address: IAddress) => void;
}

const PopupAdress = ({ show, onClose, addresses, onSelect }: PopupAdressProps) => {
    if (!show) return null;

    // Sắp xếp địa chỉ: địa chỉ mặc định lên đầu
    const sortedAddresses = [...addresses].sort((a, b) => {
        if (a.isDefault === b.isDefault) return 0;
        return a.isDefault ? -1 : 1;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative w-full max-w-[700px] bg-white rounded-[8px] shadow-lg px-0 py-0">
                {/* Nút đóng */}
                <button
                    className="absolute top-5 right-6 text-2xl text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    ×
                </button>
                {/* Tiêu đề */}
                <div className="px-10 pt-8 pb-2">
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">SỔ ĐỊA CHỈ</h3>
                    <div className="border-b border-gray-200 mb-2"></div>
                </div>
                {/* Danh sách địa chỉ */}
                <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto px-10 pb-8">
                    {sortedAddresses.map((addr) => (
                        <div
                            key={addr._id}
                            className="bg-[#faf9f7] rounded-[6px] px-6 py-4 flex items-center shadow-sm"
                        >
                            <div className="flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-800 uppercase">{addr.fullname}</span>
                                    {addr.isDefault && (
                                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                                            Mặc định
                                        </span>
                                    )}
                                </div>
                                <span className="text-[15px] text-gray-600 mb-1">
                                    Địa chỉ: {addr.address}, {addr.wardName}, {addr.districtName}, {addr.provinceName}
                                </span>
                                <span className="text-[15px] text-gray-600 mb-2">
                                    Điện thoại: {addr.phoneNumber}
                                </span>
                            </div>
                            <div>
                                <button
                                    className="text-[#bfa16b] text-base font-semibold hover:underline px-2 py-1"
                                    onClick={() => onSelect(addr)}
                                >
                                    Chọn
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Thêm địa chỉ mới */}
                    <Link
                        to="/address"
                        className="flex items-center justify-center py-3 mt-2 text-[#bfa16b] font-semibold hover:underline border-t border-gray-200"
                        onClick={onClose}
                    >
                        Thêm địa chỉ mới
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PopupAdress;
