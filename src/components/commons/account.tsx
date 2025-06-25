import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { User } from "@/services/auth/types/auth.type";
import UserIcon from "../icons/user";
import Container from "../icons/container";
import Notebook from "../icons/notebook";
import HeartPlus from "../icons/heart-plus";
import UserPenRound from "../icons/user-pen-round";
import { LogIn, LogOut } from "lucide-react";
import routePath from "@/config/route";

interface AccountProps {
  isAuthenticated: boolean;
  user: User | null;
  handleLogout: () => void;
}

const AVATAR_DEFAULT =
  "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80";

const LINKS_ACCOUNT = [
  {
    name: "ĐƠN HÀNG",
    href: routePath.orders,
    icon: Container,
  },
  {
    name: "ĐỊA CHỈ",
    href: routePath.address,
    icon: Notebook,
  },
  {
    name: "THÔNG TIN TÀI KHOẢN",
    href: routePath.accountDetail,
    icon: UserIcon,
  },
  { name: "DANH SÁCH YÊU THÍCH", href: routePath.wishlist, icon: HeartPlus },
];
const Account = ({ isAuthenticated, user, handleLogout }: AccountProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
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
            <UserIcon className="size-5" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isAuthenticated ? (
            <div className="py-2 flex flex-col">
              {LINKS_ACCOUNT.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
                >
                  <item.icon className="size-5" />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => handleLogout()}
                className="flex items-center gap-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
              >
                <LogOut className="size-5" />
                ĐĂNG XUẤT
              </button>
            </div>
          ) : (
            <>
              <Link
                to={routePath.login}
                className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
              >
                <LogIn className="size-5" />
                Đăng Nhập
              </Link>
              <Link
                to={routePath.register}
                className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
              >
                <UserPenRound className="size-5" />
                Đăng Ký
              </Link>
            </>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Account;
