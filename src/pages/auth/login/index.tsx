import React, { useState } from "react";
import Tab from "../_components/tab";
import FloatingInput from "@/components/commons/float-input";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="max-w-lg mx-auto mt-[97px] mb-[202px] px-4 md:px-0">
      <Tab />
      <form className="flex flex-col space-y-4  ">
        <FloatingInput
          label="Username or email address "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FloatingInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between">
          <div className="flex items-center gap-[8px]">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="text-[#767676] text-sm not-italic font-normal leading-[24px]">Remember me</label>
          </div>

          <div>
            <Link className="underline text-[#222] text-sm not-italic font-normal leading-[24px]" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-[#FFF] text-sm not-italic font-medium leading-[24px]  py-[15px] hover:bg-primary-dark "
        >
          Login
        </button>

        <p className="text-[#767676] text-sm not-italic font-normal leading-[24px] text-center">
            No account yet?{" "}
          <Link className="underline text-[#222] text-sm not-italic font-normal leading-[24px]" to="/register">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
