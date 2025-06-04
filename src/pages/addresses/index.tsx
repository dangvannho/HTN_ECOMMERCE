import { useState, useEffect } from "react";
import { IAddressFormData, IAddress } from "@/services/addresses/types/addresses.types";
import AddressForm from "@/pages/addresses/_components/AddressesForm";
import AddressCard from "@/pages/addresses/_components/address-card";
import addressesApi from "@/services/addresses/api/addresses.api";
import toast from 'react-hot-toast';

const Addresses = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<IAddressFormData>({
    fullname: "",
    phoneNumber: "",
    address: "",
    provinceName: "",
    districtName: "",
    wardName: "",
    isDefault: false
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (address: IAddress) => {
    setFormData({
      fullname: address.fullname,
      phoneNumber: address.phoneNumber,
      address: address.address,
      provinceName: address.provinceName,
      districtName: address.districtName,
      wardName: address.wardName,
      isDefault: address.isDefault
    });
    setEditingId(address._id as string);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await addressesApi.updateAddress(editingId, {
          fullname: formData.fullname,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          provinceName: formData.provinceName,
          districtName: formData.districtName,
          wardName: formData.wardName,
          isDefault: formData.isDefault
        });
        toast.success('Address updated successfully!');
      } else {
        await addressesApi.createAddress(formData);
        toast.success('Address added successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        fullname: "",
        phoneNumber: "",
        address: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        isDefault: false
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(editingId ? 'Failed to update address' : 'Failed to add address');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      fullname: "",
      phoneNumber: "",
      address: "",
      provinceName: "",
      districtName: "",
      wardName: "",
      isDefault: false
    });
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
              onClick={() => setShowForm(true)}
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
            formData={formData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onChange={handleInputChange}
            isEditing={!!editingId}
          />
        )}
      </div>
    </>
  );
};

export default Addresses;
