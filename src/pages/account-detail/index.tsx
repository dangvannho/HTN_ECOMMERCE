import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatingInput from "@/components/commons/float-input";
import {
  accountDetailSchema,
  changePasswordSchema,
  type AccountDetailFormInputs,
  type ChangePasswordFormInputs,
} from "@/schemas/account";
import type { User } from "@/services/auth/types/auth.type";
import type { ChangePasswordRequest } from "@/services/account/types/account.type";
import authApi from "@/services/auth/api/auth.api";
import accountApi from "@/services/account/api/account.api";
import toast from "react-hot-toast";

const AccountDetail = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const profileForm = useForm<AccountDetailFormInputs>({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const passwordForm = useForm<ChangePasswordFormInputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        displayName: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const fetchUser = async () => {
    try {
      const response = await authApi.getMe();
      setProfile(response.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const onSubmitProfile = async (data: AccountDetailFormInputs) => {
    const { displayName: name } = data;
    try {
      const response = await accountApi.updateUser(name);
      if (response.status === 200) {
        toast.success(response.message);
        profileForm.reset({
          displayName: response.user.name,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const onSubmitPassword = async (data: ChangePasswordFormInputs) => {
    const dataRequest: ChangePasswordRequest = {
      oldPassword: data.currentPassword || "",
      newPassword: data.newPassword || "",
    };

    try {
      const response = await accountApi.changePassword(dataRequest);
      if (response.status === 200) {
        toast.success(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Tiêu đề */}
      <h4 className="heading-element">THÔNG TIN TÀI KHOẢN</h4>

      {/* Form thông tin người dùng */}
      <div>
        <h5 className="text-xl font-medium mb-4">Thông tin cá nhân</h5>
        <form
          onSubmit={profileForm.handleSubmit(onSubmitProfile)}
          className="w-full flex flex-col gap-6"
        >
          <div>
            <FloatingInput
              label="Họ và tên"
              type="text"
              value={profileForm.watch("displayName")}
              {...profileForm.register("displayName")}
            />
            {profileForm.formState.errors.displayName && (
              <p className="text-red-500 text-sm mt-1">
                {profileForm.formState.errors.displayName.message}
              </p>
            )}
          </div>
          <div>
            <FloatingInput
              label="Địa chỉ email"
              type="text"
              value={profileForm.watch("email")}
              {...profileForm.register("email")}
              disabled={true}
            />
            {profileForm.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {profileForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <FloatingInput
              label="Số điện thoại"
              type="text"
              value={profileForm.watch("phoneNumber")}
              {...profileForm.register("phoneNumber")}
              disabled={true}
            />
            {profileForm.formState.errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {profileForm.formState.errors.phoneNumber.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-20 py-4 text-sm bg-[#222] text-white w-max"
          >
            Lưu Thông Tin
          </button>
        </form>
      </div>

      {/* Form thay đổi mật khẩu */}
      <div>
        <h5 className="text-xl font-medium mb-4">Thay Đổi Mật Khẩu</h5>
        <form
          onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
          className="w-full flex flex-col gap-6"
        >
          <div>
            <FloatingInput
              label="Mật khẩu hiện tại (để trống nếu không thay đổi)"
              type="password"
              {...passwordForm.register("currentPassword")}
            />
            {passwordForm.formState.errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordForm.formState.errors.currentPassword.message}
              </p>
            )}
          </div>
          <div>
            <FloatingInput
              label="Mật khẩu mới (để trống nếu không thay đổi)"
              type="password"
              {...passwordForm.register("newPassword")}
            />
            {passwordForm.formState.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <FloatingInput
              label="Nhắc lại mật khẩu mới"
              type="password"
              {...passwordForm.register("confirmPassword")}
            />
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-20 py-4 text-sm bg-[#222] text-white w-max"
          >
            Thay Đổi Mật Khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountDetail;
