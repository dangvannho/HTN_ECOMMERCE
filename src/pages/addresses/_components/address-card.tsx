import { AddressCardProps } from "@/services/addresses/types/addresses.types";
import addressesApi from "@/services/addresses/api/addresses.api";
import toast from 'react-hot-toast';
import { useState } from 'react';
import DeleteConfirmModal from '@/pages/addresses/_components/popup-delete';

const AddressCard = ({ address, onRefresh, onEdit }: AddressCardProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleEdit = () => {
        onEdit({
            fullname: address.fullname,
            phoneNumber: address.phoneNumber,
            address: address.address,
            provinceName: address.provinceName,
            districtName: address.districtName,
            wardName: address.wardName,
            isDefault: address.isDefault,
            _id: address._id
        });

    };

    const handleDelete = async () => {
        try {
            const response = await addressesApi.deleteAddress(address._id as string);
            toast.success(response.message);
            onRefresh();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Failed to delete address');
        }
    };

    return (
        <>
            <div className={`bg-gray-50 rounded p-3 sm:p-6 mb-8 sm:mb-4 ${address.isDefault}`}>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <h5 className="font-medium text-base">
                            {address.fullname}
                        </h5>
                        {address.isDefault && (
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                                Mặc định
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <button
                            onClick={handleEdit}
                            className="text-blue-600 hover:underline"
                        >
                            Chỉnh sửa
                        </button>
                        {
                            !address.isDefault && <button
                                onClick={() => setShowDeleteModal(true)}
                                className="text-red-500 hover:underline"
                            >
                                Xóa
                            </button>
                        }

                    </div>
                </div>

                <div className="text-gray-600 text-sm space-y-1">
                    <p>{address.address}</p>
                    <p>
                        <span className="text-gray-500">Địa Chỉ: </span>
                        {address.wardName}, {address.districtName}, {address.provinceName}
                    </p>
                    <p className="mt-3">
                        <span className="text-gray-500">Số Điện Thoại: </span>
                        {address.phoneNumber}
                    </p>
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default AddressCard;
