import { useState } from "react";
import { Link } from "react-router-dom";
import User from "../icons/user";
import ShoppingBag from "../icons/shopping-bag";
import Menu from "../icons/menu";
import Search from "../icons/search";
import X from "../icons/x";
import ChevronRight from "../icons/chevronright";
import routePath from "@/config/route";

const LINKS = [
  { name: "HOME", href: routePath.home },
  { name: "SHOP", href: routePath.shop },
  { name: "COLLECTION", href: "/" },
  { name: "JOURNAL", href: "/" },
  { name: "LOOKBOOK", href: "/" },
  { name: "PAGES", href: "/" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed left-0 top-0 w-full bg-white z-50">
      {/* Desktop Header */}
      <div className="hidden lg:flex max-w-7xl mx-auto py-[33px] items-center ">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="" />
        </div>
        <nav className="flex gap-4 ml-[55px] items-center">
          {LINKS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-[#222] relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
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
          <div className="cursor-pointer">
            <User className="size-5" />
          </div>
          <div className="relative cursor-pointer">
            <ShoppingBag className="size-5" />
            <span className="absolute -bottom-1 -right-1 bg-[#d4a373] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
              3
            </span>
          </div>
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
        <div className="relative">
          <ShoppingBag className="size-5" />
          <span className="absolute -bottom-1 -right-1 bg-[#d4a373] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
            3
          </span>
        </div>
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
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
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
