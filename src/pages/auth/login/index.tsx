import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Tab from "../_components/tab";
import FloatingInput from "@/components/commons/float-input";
import { loginSchema, type LoginFormInputs } from "@/schemas/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form submitted:", data);
    // Thêm logic gửi dữ liệu form đến API tại đây (ví dụ: gọi axiosInstance)
  };

  return (
    <div className="max-w-lg mx-auto mt-[97px] mb-[202px] px-4 md:px-0">
      <Tab />
      <form
        className="flex flex-col space-y-4 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <FloatingInput
            label="Username or email address *"
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <FloatingInput
            label="Password *"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-[8px]">
            <input type="checkbox" id="check" />
            <label
              htmlFor="check"
              className="text-[#767676] text-sm not-italic font-normal leading-[24px]"
            >
              Remember me
            </label>
          </div>

          <div>
            <Link
              className="underline text-[#222] text-sm not-italic font-normal leading-[24px]"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-[#FFF] text-sm not-italic font-medium leading-[24px] py-[15px] hover:bg-primary-dark uppercase"
        >
          Login
        </button>

        <p className="text-[#767676] text-sm not-italic font-normal leading-[24px] text-center">
          No account yet?{" "}
          <Link
            className="underline text-[#222] text-sm not-italic font-normal leading-[24px]"
            to="/register"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
