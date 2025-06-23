import { NavLink } from "react-router-dom";
import routePath from "@/config/route";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "ORDERS", href: routePath.orders },
  { name: "ADDRESSES", href: routePath.address },
  { name: "ACCOUNT DETAIL", href: routePath.accountDetail },
  { name: "WHISHLIST", href: routePath.wishlist },
];

const SidebarAccount = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(routePath.home);
  };
  return (
    <aside className="flex lg:flex-col md:justify-start justify-between gap-0 md:gap-6 lg:mt-0 mt-[80px]">
      {SIDEBAR_ITEMS.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) =>
            `text-[11px] md:text-sm font-medium relative group w-max ${
              isActive ? "text-[#C32929]" : "text-[#222] hover:text-[#C32929]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.name}
              <span
                className={`absolute -bottom-[3px] left-0 h-[2px] bg-[#C32929] transition-all duration-300 ${
                  isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
      <button
        className="text-[11px] md:text-sm font-medium relative group w-max hover:text-[#C32929]"
        onClick={handleLogout}
      >
        LOGOUT
        <span className="absolute -bottom-[3px] left-0 h-[2px] bg-[#C32929] transition-all duration-300 w-0 group-hover:w-1/2"></span>
      </button>
    </aside>
  );
};

export default SidebarAccount;
