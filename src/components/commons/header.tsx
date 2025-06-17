import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../icons/user";
import ShoppingBag from "../icons/shopping-bag";
import Menu from "../icons/menu";
import Search from "../icons/search";
import X from "../icons/x";
import ChevronRight from "../icons/chevronright";
import routePath from "@/config/route";
import Account from "./account";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import useCollection from "@/services/collection/hooks/useCollection";

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
  const [isCollectionHovered, setIsCollectionHovered] = useState(false);
  const { user, isAuthenticated, fetchUser, logout } = useAuthStore();
  const { cartItemsCount, fetchCart } = useCartStore();
  const { collections } = useCollection();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
      fetchCart();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate(routePath.home);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

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
            <div key={item.name} className="relative">
              {item.name === "COLLECTION" ? (
                <div
                  className="text-sm font-medium text-[#222] relative group cursor-pointer"
                  onMouseEnter={() => setIsCollectionHovered(true)}
                  onMouseLeave={() => setIsCollectionHovered(false)}
                >
                  <div className="flex items-center gap-1">
                    {item.name}
                    <ChevronRight className="transition-transform duration-500 rotate-90 ml-1 group-hover:-rotate-90" />
                  </div>
                  <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/2"></span>

                  {/* Collection Dropdown */}
                  <div
                    className={`absolute top-full left-0 w-full h-2 bg-transparent transition-opacity duration-500 ${
                      isCollectionHovered
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                    onMouseEnter={() => setIsCollectionHovered(true)}
                  />
                  <div
                    className={`absolute top-[calc(100%+0.5rem)] left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50 transition-all duration-500 ${
                      isCollectionHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => setIsCollectionHovered(true)}
                    onMouseLeave={() => setIsCollectionHovered(false)}
                  >
                    {collections.map((collection) => (
                      <Link
                        key={collection._id}
                        to={`/collections/${collection.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className="text-sm font-medium text-[#222] relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/2"></span>
                </Link>
              )}
            </div>
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

          <Account
            isAuthenticated={isAuthenticated}
            user={user}
            handleLogout={handleLogout}
          />
          <Link to={routePath.cart} className="relative cursor-pointer">
            <ShoppingBag className="size-5" />
            {user && (
              <span className="absolute -bottom-1 -right-1 bg-[#d4a373] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center pt-[1px]">
                {cartItemsCount}
              </span>
            )}
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

        <div className="flex items-center gap-3">
          <Account
            isAuthenticated={isAuthenticated}
            user={user}
            handleLogout={handleLogout}
          />
          <Link to={routePath.cart} className="relative cursor-pointer">
            <ShoppingBag className="size-5" />
            {user && (
              <span className="absolute -bottom-1 -right-1 bg-[#d4a373] text-white text-[10px] pts-[1px] rounded-full w-3 h-3 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
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
          {LINKS.map((item) => {
            return (
              <div
                className="flex items-center justify-between"
                key={item.name}
              >
                {item.name === "COLLECTION" ? (
                  <div className="w-full ">
                    <div
                      className="text-base font-medium text-[#222] relative group flex items-center justify-between "
                      onClick={() =>
                        setIsCollectionHovered(!isCollectionHovered)
                      }
                    >
                      {item.name}
                      <ChevronRight
                        className={`transition-transform duration-500 ${
                          isCollectionHovered ? "rotate-90" : ""
                        }`}
                      />
                      <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/6"></span>
                    </div>

                    {/* Mobile Collection Dropdown */}
                    <div
                      className={`mt-2 ml-4 transition-all duration-500 ${
                        isCollectionHovered
                          ? "opacity-100 max-h-[500px]"
                          : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      {collections.map((collection) => (
                        <Link
                          key={collection._id}
                          to={`/collections/${collection.slug}`}
                          onClick={handleLinkClick}
                          className="block py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {collection.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={handleLinkClick}
                    className="text-base font-medium text-[#222] relative group w-max"
                  >
                    {item.name}
                    <span className="absolute -bottom-[3px] left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-1/2"></span>
                  </Link>
                )}

                {/* <ChevronRight /> */}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-[#E4E4E4] py-3 flex items-center">
          <Link
            to={routePath.accountDetail}
            onClick={handleLinkClick}
            className="uppercase flex gap-2 text-sm font-medium"
          >
            <User className="size-5" />
            <span className="mt-1"> My account</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
