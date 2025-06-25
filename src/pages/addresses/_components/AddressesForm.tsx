import {
  Province,
  District,
  Ward,
} from "@/services/addresses/types/addresses.types";
import { FC, useEffect, useState } from "react";
import provinces from "./select-provices/vietnam-provinces.json";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressFormInputs } from "@/schemas/addresses";

const vietnamProvinces = provinces as Province[];

interface AddressFormProps {
  initialData?: Partial<AddressFormInputs>;
  onSubmit: (data: AddressFormInputs) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const AddressForm: FC<AddressFormProps> = ({
  initialData,
  onCancel,
  onSubmit,
  isEditing = false,
}) => {
  const [provinces] = useState<Province[]>(vietnamProvinces);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      address: "",
      provinceName: "",
      districtName: "",
      wardName: "",
      isDefault: false,
    },
  });

  // Load districts and wards when initialData is provided
  useEffect(() => {
    console.log("Dữ liệu khởi tạo", initialData);

    if (initialData?.provinceName) {
      const selectedProvince = provinces.find(
        (province) => province.name === initialData.provinceName
      );
      if (selectedProvince) {
        const newDistricts = selectedProvince.districts || [];
        setDistricts(newDistricts);

        if (initialData.districtName) {
          const selectedDistrict = newDistricts.find(
            (district) => district.name === initialData.districtName
          );
          if (selectedDistrict) {
            setWards(selectedDistrict.wards);
          } else {
            setWards([]);
          }
        } else {
          setWards([]);
        }
      } else {
        setDistricts([]);
        setWards([]);
      }
      setIsDataLoaded(true);
    } else {
      setDistricts([]);
      setWards([]);
      setIsDataLoaded(true);
    }
  }, [initialData, provinces]);

  // Fill form with initialData after districts and wards are loaded
  useEffect(() => {
    console.log("Sau khi khởi tạo", initialData);
    if (isDataLoaded && initialData) {
      reset({
        fullname: initialData.fullname || "",
        phoneNumber: initialData.phoneNumber || "",
        address: initialData.address || "",
        provinceName: initialData.provinceName || "",
        districtName: initialData.districtName || "",
        wardName: initialData.wardName || "",
        isDefault: initialData.isDefault ?? false,
      });
      setIsDataLoaded(false);
    } else if (isDataLoaded && !initialData) {
      reset({
        fullname: "",
        phoneNumber: "",
        address: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        isDefault: false,
      });
      setIsDataLoaded(false);
    }
  }, [isDataLoaded, initialData, reset]);

  // Handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceName = e.target.value;
    setValue("provinceName", provinceName, { shouldValidate: true });

    if (provinceName) {
      const selectedProvince = provinces.find(
        (province) => province.name === provinceName
      );
      if (selectedProvince) {
        setDistricts(selectedProvince.districts || []);
        setValue("districtName", "", { shouldValidate: true });
        setValue("wardName", "", { shouldValidate: true });
        setWards([]);
      }
    } else {
      setDistricts([]);
      setValue("districtName", "", { shouldValidate: true });
      setValue("wardName", "", { shouldValidate: true });
      setWards([]);
    }
  };

  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.target.value;
    setValue("districtName", districtName, { shouldValidate: true });

    if (districtName) {
      const selectedDistrict = districts.find(
        (district) => district.name === districtName
      );
      if (selectedDistrict) {
        setWards(selectedDistrict.wards || []);
        setValue("wardName", "", { shouldValidate: true });
      } else {
        setWards([]);
        setValue("wardName", "", { shouldValidate: true });
      }
    } else {
      setWards([]);
      setValue("wardName", "", { shouldValidate: true });
    }
  };

  const handleFormSubmit = handleSubmit((data: AddressFormInputs) => {
    onSubmit(data);
  });

  return (
    <div id="address-form" className="mt-8 border rounded-lg p-8 bg-white shadow-sm transform transition-all duration-500 opacity-0 translate-y-4 animate-slide-up">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? "CHỈNH SỬA ĐỊA CHỈ" : "THÊM MỚI ĐỊA CHỈ"}
      </h3>
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tên Đầy Đủ
            </label>
            <input
              type="text"
              {...register("fullname")}
              className={`w-full px-4 py-2.5 rounded border transition-all duration-200 outline-none ${errors.fullname
                ? "border-red-300 focus:ring-1 focus:ring-red-200 focus:border-red-400"
                : "border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                }`}
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Số Điện Thoại
            </label>
            <input
              type="text"
              {...register("phoneNumber")}
              className={`w-full px-4 py-2.5 rounded border transition-all duration-200 outline-none ${errors.phoneNumber
                ? "border-red-300 focus:ring-1 focus:ring-red-200 focus:border-red-400"
                : "border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                }`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              {...register("address")}
              className={`w-full px-4 py-2.5 rounded border transition-all duration-200 outline-none ${errors.address
                ? "border-red-300 focus:ring-1 focus:ring-red-200 focus:border-red-400"
                : "border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tỉnh/Thành phố
            </label>
            <select
              {...register("provinceName")}
              onChange={handleProvinceChange}
              className={`w-full px-4 py-2.5 rounded border transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400 ${errors.provinceName
                ? "border-red-300 focus:ring-1 focus:ring-red-200 focus:border-red-400"
                : "border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                }`}
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province, index) => (
                <option
                  key={province.code || `province-${index}`}
                  value={province.name}
                >
                  {province.name}
                </option>
              ))}
            </select>
            {errors.provinceName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.provinceName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quận/Huyện
            </label>
            <select
              {...register("districtName")}
              onChange={handleDistrictChange}
              className={`w-full px-4 py-2.5 rounded border transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${errors.districtName
                ? "border-red-300 focus:ring-1 focus:ring-red-200 focus:border-red-400"
                : "border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                }`}
              disabled={!districts.length}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district, index) => (
                <option
                  key={district.code || `district-${index}`}
                  value={district.name}
                >
                  {district.name}
                </option>
              ))}
            </select>
            {errors.districtName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.districtName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phường/Xã
            </label>
            <select
              {...register("wardName")}
              className={`w-full px-4 py-2.5 rounded border transition-all duration-200 outline-none bg-white appearance-none cursor-pointer hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${errors.wardName
                ? "border-red-300 focus:ring-1 focus:ring-red-200 focus:border-red-400"
                : "border-gray-300 focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                }`}
              disabled={!wards.length}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward, index) => (
                <option key={ward.code || `ward-${index}`} value={ward.name}>
                  {ward.name}
                </option>
              ))}
            </select>
            {errors.wardName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.wardName.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("isDefault")}
              id="isDefault"
              className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-1 focus:ring-gray-200 cursor-pointer"
            />
            <label
              htmlFor="isDefault"
              className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
            >
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 font-medium"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                  ? "Cập Nhật Địa Chỉ"
                  : "Lưu Địa Chỉ"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
