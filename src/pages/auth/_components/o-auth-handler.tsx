import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

const OAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      // Khúc này chưa rõ lắm, nếu api lỗi thì cũng redirect về trang chủ hay sao
      fetchUser().then(() => {
        navigate("/", { replace: true });
      });
    }
  }, [location, fetchUser, navigate]);

  return null;
};

export default OAuthHandler;
