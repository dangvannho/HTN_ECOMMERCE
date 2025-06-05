import FloatingInput from "@/components/commons/float-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ResetPasswordFormInputs,
  resetPasswordSchema,
} from "@/schemas/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import routePath from "@/config/route";
import authApi from "@/services/auth/api/auth.api";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    const { password } = data;

    if (!token) {
      toast.error("Invalid reset password link");
      return;
    }

    try {
      const response = await authApi.resetPassword(password, token);
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.data.EM);
        navigate(routePath.login);
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
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password to reset password
          </p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <FloatingInput
              type="password"
              label="New password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <FloatingInput
              type="password"
              label="Confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-[#FFF] text-sm not-italic font-medium leading-[24px] py-[15px] hover:bg-primary-dark uppercase w-full mt-4"
          >
            Reset
          </button>

          <Link
            to={routePath.login}
            className="block text-center underline mt-5"
          >
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
