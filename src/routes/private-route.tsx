import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routePath from "@/config/route";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || token === "undefined") {
      navigate(routePath.login, { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
