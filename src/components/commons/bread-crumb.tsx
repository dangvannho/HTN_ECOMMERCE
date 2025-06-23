import { Link } from "react-router-dom";
import routePath from "@/config/route";
const BreadCrumb = () => {
  return (
    <div className="text-sm uppercase text-[#222] font-medium flex gap-1">
      <Link to={routePath.home} className="hover:underline">
        Home
      </Link>
      <span>/</span>
      <Link to="/shop/all" className="hover:underline">
        The Shop
      </Link>
    </div>
  );
};

export default BreadCrumb;
