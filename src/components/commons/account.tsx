import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import UserIcon from "../icons/user";
import Container from "../icons/container";
import Notebook from "../icons/notebook";
import HeartPlus from "../icons/heart-plus";
import UserPenRound from "../icons/user-pen-round";
import routePath from "@/config/route";
import type { User } from "@/services/auth/types/auth.type";

interface AccountProps {
  isAuthenticated: boolean;
  user: User | null;
  handleLogout: () => void;
}

const AVATAR_DEFAULT =
  "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80";

const LINKS_ACCOUNT = [
  { name: "ĐƠN HÀNG", href: routePath.orders, icon: Container },
  { name: "SỔ ĐỊA CHỈ", href: routePath.address, icon: Notebook },
  {
    name: "THÔNG TIN TÀI KHOẢN",
    href: routePath.accountDetail,
    icon: UserIcon,
  },
  { name: "DANH SÁCH YÊU THÍCH", href: routePath.wishlist, icon: HeartPlus },
];

const Account = ({ isAuthenticated, user, handleLogout }: AccountProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button className="focus:outline-none" onClick={handleToggle}>
        {isAuthenticated ? (
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={user?.avatar || AVATAR_DEFAULT}
              alt="User avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = AVATAR_DEFAULT;
              }}
            />
          </div>
        ) : (
          <UserIcon className="w-5 h-5" />
        )}
      </button>
      {isAuthenticated ? (
        <div
          className={`absolute top-full -left-[170px] md:-left-[160px] lg:-left-[170px] xl:left-1/2 xl:transform xl:-translate-x-1/2 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10 transition-all duration-200 ease-in-out ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col">
            {LINKS_ACCOUNT.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
                onClick={() => setOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              ĐĂNG XUẤT
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`absolute top-full -left-[92px] md:-left-[95px] lg:-left-[92px] xl:left-1/2 xl:transform xl:-translate-x-1/2 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10 transition-all duration-200 ease-in-out ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col">
            <Link
              to={routePath.login}
              className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              Đăng Nhập
            </Link>
            <Link
              to={routePath.register}
              className="flex items-center gap-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              <UserPenRound className="w-5 h-5" />
              Đăng Kí
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
