import { useState, useEffect } from "react";
import { IAddress } from "@/services/addresses/types/addresses.types";
import AddressForm from "@/pages/addresses/_components/AddressesForm";
import AddressCard from "@/pages/addresses/_components/address-card";
import addressesApi from "@/services/addresses/api/addresses.api";
import { AddressFormInputs } from "@/schemas/addresses";
import toast from "react-hot-toast";

const Addresses = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<
    Partial<AddressFormInputs> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await addressesApi.getMyAddresses();
      const sortedAddresses = response.data.sort((a: IAddress, b: IAddress) => {
        if (a.isDefault === b.isDefault) return 0;
        return a.isDefault ? -1 : 1;
      });
      setAddresses(sortedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address: IAddress) => {
    const editData = {
      fullname: address.fullname,
      phoneNumber: address.phoneNumber,
      address: address.address,
      provinceName: address.provinceName,
      districtName: address.districtName,
      wardName: address.wardName,
      isDefault: address.isDefault,
    };
    setEditingData(editData);
    setEditingId(address._id as string);
    setShowForm(true);

    setTimeout(() => {
      const formElement = document.getElementById("address-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleSubmit = async (data: AddressFormInputs) => {
    try {
      if (editingId) {
        await addressesApi.updateAddress(editingId, data);
        toast.success("Address updated successfully!");
      } else {
        await addressesApi.createAddress(data);
        toast.success("Address added successfully!");
      }
      setShowForm(false);
      setEditingId(null);
      setEditingData(undefined);
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(
        editingId ? "Failed to update address" : "Failed to add address"
      );
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingData(undefined);
  };

  const handleAddNew = () => {
    setEditingData(undefined);
    setEditingId(null);
    setShowForm(true);

    setTimeout(() => {
      const formElement = document.getElementById("address-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <>
      <h4 className="heading-element">Sổ địa chỉ</h4>
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="flex-1 text-[#222] text-xs sm:text-sm not-italic font-normal">
            Các địa chỉ sau đây sẽ được sử dụng trên trang thanh toán theo mặc
            định.
          </p>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="bg-[#222] text-white px-2 sm:px-4 text-[10px] sm:text-[14px] py-2 rounded hover:bg-[#333]"
            >
              Thêm Địa Chỉ Mới
            </button>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2 "></div>
          </div>
        ) : (
          <div className="block lg:flex gap-[92px]">
            <div className="flex-1">
              {addresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onRefresh={fetchAddresses}
                  onEdit={handleEdit}
                />
              ))}

              {addresses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Không tìm thấy địa chỉ nào. Vui lòng thêm địa chỉ mới.
                </div>
              )}
            </div>
          </div>
        )}

        {showForm && (
          <AddressForm
            initialData={editingData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={!!editingId}
          />
        )}
      </div>
    </>
  );
};

export default Addresses;
