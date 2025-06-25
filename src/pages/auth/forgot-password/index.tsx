import FloatingInput from "@/components/commons/float-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ForgotPasswordFormInputs,
  forgotPasswordSchema,
} from "@/schemas/auth";
import { Link } from "react-router-dom";
import routePath from "@/config/route";
import authApi from "@/services/auth/api/auth.api";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    const { email } = data;
    try {
      const response = await authApi.forgotPassword(email);
      if (response.statusCode === 200) {
        toast.success(response.data.EM);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Quên mật khẩu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <FloatingInput type="email" label="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="bg-primary text-[#FFF] text-sm not-italic font-medium leading-[24px] py-[15px] hover:bg-primary-dark uppercase w-full mt-4"
          >
            Gửi
          </button>

          <Link
            to={routePath.login}
            className="block text-center underline mt-5"
          >
            Quay lại trang đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
