import { useState } from "react";
import { Link } from "react-router-dom";
import User from "../icons/user";
import ShoppingBag from "../icons/shopping-bag";
import Menu from "../icons/menu";
import Search from "../icons/search";
import X from "../icons/x";
import ChevronRight from "../icons/chevronright";
import UserPenRound from "../icons/user-pen-round";
import Container from "../icons/container";
import Notebook from "../icons/notebook";
import HeartPlus from "../icons/heart-plus";

import routePath from "@/config/route";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

const LINKS = [
  { name: "HOME", href: routePath.home },
  { name: "SHOP", href: routePath.shop },
  { name: "COLLECTION", href: "/" },
  { name: "JOURNAL", href: "/" },
  { name: "LOOKBOOK", href: "/" },
  { name: "PAGES", href: "/" },
];

const LINKS_ACCOUNT = [
  {
    name: "ORDERS",
    href: routePath.orders,
    icon: Container,
  },
  {
    name: "ADDRESSES",
    href: routePath.address,
    icon: Notebook,
  },
  {
    name: "ACCOUNT DETAIL",
    href: routePath.accountDetail,
    icon: User,
  },
  { name: "WHISHLIST", href: routePath.wishlist, icon: HeartPlus },
];

const AVATAR_DEFAULT =
  "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed left-0 top-0 w-full bg-white z-50">
      {/* Desktop Header */}
      <div className="hidden lg:flex xl:max-w-5xl 2xl:max-w-7xl mx-auto py-[33px] items-center ">
        <div className="flex items-center space-x-2">
          <Link to={routePath.home}>
            <img src="/logo.svg" alt="" />
          </Link>
        </div>
        <nav className="flex gap-4 ml-[55px] items-center">
          {LINKS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-[#222] relative group"
            >
              {item.name}
              <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/2"></span>
            </Link>
          ))}
        </nav>
        <div className="flex ml-auto gap-4 items-center">
          <div className="relative h-full">
            <input
              type="text"
              className="w-[300px] bg-white py-1 pl-3 pr-8 border rounded-[3px] outline-none text-sm "
              placeholder="Search products..."
            />
            <Search className="size-4 absolute top-1/2 -translate-y-1/2 right-2" />
          </div>

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
                  <User className="size-5" />
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
                      onClick={logout}
                      className="flex items-center gap-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
                    >
                      <LogOut className="size-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to={routePath.login}
                      className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
                    >
                      <LogIn className="size-5" />
                      Login
                    </Link>
                    <Link
                      to={routePath.register}
                      className="flex items-center gap-2 mb-2 p-2 rounded-md text-sm text-[#222] uppercase hover:text-[#d4a373] hover:bg-[#f5f5f5] transition-all duration-200"
                    >
                      <UserPenRound className="size-5" />
                      Register
                    </Link>
                  </>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link to={routePath.cart} className="relative cursor-pointer">
            <ShoppingBag className="size-5" />
            <span className="absolute -bottom-1 -right-2 bg-[#d4a373] text-white text-[10px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
              3
            </span>
          </Link>
          <div>
            <Menu className="size-5" />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between py-4 px-4">
        <button onClick={toggleMenu}>
          {isOpen ? <X className="size-4" /> : <Menu className="size-6" />}
        </button>
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="" />
        </div>
        <Link to={routePath.cart} className="relative cursor-pointer">
          <ShoppingBag className="size-5" />
          <span className="absolute -bottom-1 -right-1 bg-[#d4a373] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
            100
          </span>
        </Link>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed w-full top-14 left-0 h-[94vh] bg-white shadow-lg z-10 lg:hidden p-4 border-t flex flex-col ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative">
          <input
            type="text"
            className="w-full bg-white py-2 pl-3 pr-8 border rounded-[3px] outline-none text-sm "
            placeholder="Search products..."
          />
          <Search className="size-4 absolute top-1/2 -translate-y-1/2 right-2" />
        </div>

        <nav className="flex flex-col space-y-6 mt-6 flex-1">
          {["HOME", "SHOP", "COLLECTION", "JOURNAL", "LOOKBOOK", "PAGES"].map(
            (item) => {
              return (
                <div className="flex items-center justify-between" key={item}>
                  <Link
                    to=""
                    className="text-base font-medium text-[#222] relative group w-max"
                  >
                    {item}
                    <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/2"></span>
                  </Link>

                  <ChevronRight />
                </div>
              );
            }
          )}
        </nav>

        <div className="border-t border-[#E4E4E4] py-3 flex items-center">
          <Link to="" className="uppercase flex gap-2 text-sm font-medium">
            <User className="size-5" />
            <span className="mt-1"> My account</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
