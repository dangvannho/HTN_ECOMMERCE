import { useState, useEffect } from "react";
import { IAddress } from "@/services/addresses/types/addresses.types";
import AddressForm from "@/pages/addresses/_components/AddressesForm";
import AddressCard from "@/pages/addresses/_components/address-card";
import addressesApi from "@/services/addresses/api/addresses.api";
import { AddressFormInputs } from "@/schemas/addresses";
import toast from 'react-hot-toast';

const Addresses = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<AddressFormInputs> | undefined>(undefined);

  const fetchAddresses = async () => {
    try {
      const response = await addressesApi.getMyAddresses();
      const sortedAddresses = response.data.sort((a: IAddress, b: IAddress) => {
        if (a.isDefault === b.isDefault) return 0;
        return a.isDefault ? -1 : 1;
      });
      setAddresses(sortedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
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
      isDefault: address.isDefault
    };
    setEditingData(editData);
    setEditingId(address._id as string);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (data: AddressFormInputs) => {
    try {
      if (editingId) {
        await addressesApi.updateAddress(editingId, data);
        toast.success('Address updated successfully!');
      } else {
        await addressesApi.createAddress(data);
        toast.success('Address added successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setEditingData(undefined);
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(editingId ? 'Failed to update address' : 'Failed to add address');
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
  };

  return (
    <>
      <h4 className="text-[30px] lg:text-[35px] font-bold uppercase absolute lg:left-0 left-3 top-0 lg:-top-[90px]">
        My Addresses
      </h4>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[#222] text-sm not-italic font-normal leading-[24px]">
            The following addresses will be used on the checkout page by default.
          </p>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="bg-[#222] text-white px-4 py-2 rounded hover:bg-[#333]"
            >
              Add New Address
            </button>
          )}
        </div>

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
                No addresses found. Please add a new address.
              </div>
            )}
          </div>
        </div>

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
