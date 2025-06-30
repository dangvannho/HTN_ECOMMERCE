import { z } from "zod";

import { nameValidate, phoneNumberValidate } from "./auth";

// Schema cho address form
export const addressSchema = z.object({
  fullname: nameValidate,
  phoneNumber: phoneNumberValidate,
  address: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ")
    .min(4, "Địa chỉ phải có ít nhất 4 ký tự")
    .max(100, "Địa chỉ không được vượt quá 100 ký tự")
    .regex(/^[A-Za-zÀ-ỹ0-9\s/]+$/, "Địa chỉ không được chứa ký tự đặc biệt"),
  provinceName: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  districtName: z.string().min(1, "Vui lòng chọn quận/huyện"),
  wardName: z.string().min(1, "Vui lòng chọn phường/xã"),
  isDefault: z.boolean(),
});

// Types cho form inputs
export type AddressFormInputs = z.infer<typeof addressSchema>;

// Schema cho update address (có thể không bắt buộc isDefault)
export const updateAddressSchema = addressSchema.partial({
  isDefault: true,
});

export type UpdateAddressFormInputs = z.infer<typeof updateAddressSchema>;
