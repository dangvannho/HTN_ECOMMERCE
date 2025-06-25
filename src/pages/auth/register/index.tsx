import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tab from "../_components/tab";
import FloatingInput from "@/components/commons/float-input";
import { registerSchema, type RegisterFormInputs } from "@/schemas/auth";
import authApi from "@/services/auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import routePath from "@/config/route";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { name, phoneNumber, email, password } = data;
    try {
      const response = await authApi.register(
        email,
        name,
        phoneNumber,
        password
      );
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate(routePath.login);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-[97px] mb-[202px] px-4 md:px-0">
      <Tab />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FloatingInput label="Họ và tên" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <FloatingInput
            label="số điện thoại"
            type="text"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <FloatingInput
            label="Email"
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <FloatingInput
            label="Mật khẩu"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <FloatingInput
            label="Xác nhận mật khẩu"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <p className="text-[#767676] text-sm not-italic font-normal leading-[24px] ">
          Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn trên toàn bộ
          trang web này, để quản lý quyền truy cập vào tài khoản của bạn và cho các mục đích khác
          được mô tả trong chính sách bảo mật của chúng tôi.
        </p>
        <button
          type="submit"
          className="bg-primary text-[#FFF] text-sm not-italic font-medium leading-[24px] py-[15px] hover:bg-primary-dark uppercase"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
