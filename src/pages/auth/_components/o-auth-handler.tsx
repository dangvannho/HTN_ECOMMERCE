import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

const OAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const handleOauth = async () => {
      const params = new URLSearchParams(location.search);
      const accessToken = params.get("accessToken");
      if (accessToken) {
        fetchUser();
        localStorage.setItem("accessToken", accessToken);
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        await navigate(redirectPath);
        localStorage.removeItem("redirectPath");
      }
    };
    handleOauth();
  }, [location, fetchUser, navigate]);

  return null;
};

export default OAuthHandler;
