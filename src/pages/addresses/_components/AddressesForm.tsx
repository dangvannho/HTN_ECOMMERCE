import { Province, District, Ward, AddressFormProps } from "@/services/addresses/types/addresses.types";
import { FC, useEffect, useState } from "react";
import provinces from "./select-provices/vietnam-provinces.json";


const vietnamProvinces = provinces as Province[];

const AddressForm: FC<AddressFormProps> = ({
    formData,
    onCancel,
    onChange,
    onSubmit,
    isEditing
}) => {
    const [provinces] = useState<Province[]>(vietnamProvinces);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    // load lại select provinceName
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

    // load lại select districts
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

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvince = provinces.find(
            (province) => province.name === e.target.value
        );
        setDistricts(selectedProvince?.districts || []);
        setWards([]);
        onChange(e);
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrict = districts.find(
            (district) => district.name === e.target.value
        );
        setWards(selectedDistrict?.wards || []);
        onChange(e);
    };

    const handleDefaultAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        onChange({
            ...e,
            target: {
                ...e.target,
                name,
                value: !formData.isDefault
            }
        });
    };

    return (
        <div className="mt-8 border rounded-lg p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditing ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
            </h3>
            <form onSubmit={onSubmit}>
                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={onChange}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={onChange}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={onChange}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Province/City</label>
                        <select
                            name="provinceName"
                            value={formData.provinceName}
                            onChange={handleProvinceChange}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400"
                            required
                        >
                            <option value="">Province/City</option>
                            {provinces.map((province) => (
                                <option
                                    key={province.code}
                                    value={province.name}
                                >
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">District</label>
                        <select
                            name="districtName"
                            value={formData.districtName}
                            onChange={handleDistrictChange}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            required
                            disabled={!formData.provinceName}
                        >
                            <option value="">District</option>
                            {districts.map((district) => (
                                <option
                                    key={district.code}
                                    value={district.name}
                                >
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Ward</label>
                        <select
                            name="wardName"
                            value={formData.wardName}
                            onChange={onChange}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            required
                            disabled={!formData.districtName}
                        >
                            <option value="">Ward</option>
                            {wards.map((ward) => (
                                <option
                                    key={ward.code}
                                    value={ward.name}
                                >
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleDefaultAddressChange}
                            className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-1 focus:ring-gray-200 cursor-pointer"
                        />
                        <label
                            htmlFor="isDefault"
                            className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
                        >
                            Set as default address
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                        >
                            {isEditing ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;