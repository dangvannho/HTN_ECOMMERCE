import { NavLink } from "react-router-dom";
import routePath from "@/config/route";

const SIDEBAR_ITEMS = [
  { name: "ORDERS", href: routePath.orders },
  { name: "ACCOUNT DETAIL", href: routePath.accountDetail },
  { name: "WHISHLIST", href: routePath.wishlist },
  { name: "LOGOUT", href: "/" },
];

const SidebarAccount = () => {
  return (
    <aside className="flex lg:flex-col gap-6 lg:mt-0 mt-[80px]">
      {SIDEBAR_ITEMS.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) =>
            `text-sm font-medium relative group w-max ${
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
    </aside>
  );
};

export default SidebarAccount;
