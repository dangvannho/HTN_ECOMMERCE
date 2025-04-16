import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="relative">
      {/* Desktop Header */}
      <div className="hidden md:flex max-w-7xl mx-auto py-[33px] items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="" />
        </div>
        <nav className="flex gap-4 ml-[55px] items-center">
          {["HOME", "SHOP", "COLLECTION", "JOURNAL", "LOOKBOOK", "PAGES"].map(
            (item) => (
              <Link
                key={item}
                to=""
                className="text-sm font-medium text-[#222] relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </nav>
        <div className="flex ml-auto gap-4 items-center">
          <div>
            <Search className="size-5" />
          </div>
          <div>
            <User className="size-5" />
          </div>
          <div>
            <Heart className="size-5" />
          </div>
          <div className="relative">
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
      <div className="md:hidden flex items-center justify-between py-4 px-4">
        <button onClick={toggleMenu}>
          <Menu className="size-6" />
        </button>
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="relative">
          <ShoppingBag className="size-6" />
          <span className="absolute -bottom-1 -right-1 bg-[#d4a373] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
            3
          </span>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <div className="flex items-center justify-between p-4">
          <img src="/logo.svg" alt="" />
          <button onClick={toggleMenu}>
            <X className="size-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-6 items-center">
          {["HOME", "SHOP", "COLLECTION", "JOURNAL", "LOOKBOOK", "PAGES"].map(
            (item) => (
              <Link
                key={item}
                to=""
                className="text-sm font-medium text-[#222] relative group w-max"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
