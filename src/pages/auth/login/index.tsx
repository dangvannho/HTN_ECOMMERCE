import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Tab from "../_components/tab";
import FloatingInput from "@/components/commons/float-input";
import { loginSchema, type LoginFormInputs } from "@/schemas/auth";
import { useAuthStore } from "@/stores/auth.store";
// import Facebook from "@/components/icons/facebook";
import Google from "@/components/icons/google";

const Login = () => {
  const navigate = useNavigate();
  const {
    login,
    loginGoogle,
    // loginFacebook,
    isLoading,
    isAuthenticated,
    fetchUser,
  } = useAuthStore();

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

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (localStorage.getItem("accessToken")) {
      fetchUser();
    }
  }, [isAuthenticated, fetchUser, navigate]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data.email, data.password);
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
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Login"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">LOGIN WITH</span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* <button
            type="button"
            onClick={() => {
              loginFacebook();
            }}
            className="flex-1 flex items-center justify-center gap-1 bg-[#3b5998] text-white py-3 text-base font-medium hover:bg-[#334f88] transition-colors"
          >
            <Facebook className="w-5 h-5" color="#fff" />
            Facebook
          </button> */}

          <button
            type="button"
            onClick={() => {
              loginGoogle();
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#dd4b39] text-white py-3 text-base font-medium hover:bg-[#c23321] transition-colors"
          >
            <Google className="w-5 h-5" color="#fff" />
            Google
          </button>
        </div>

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
