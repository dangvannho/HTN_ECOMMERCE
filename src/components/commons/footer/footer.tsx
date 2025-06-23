import routePath from "@/config/route";
import BannerFooter from "./banner-footer";
import LinkFooter from "./link-footer";
import SubscribeFooter from "./subscribe-footer";


const LINKS : { name: string; href: string }[] = [
  // { name: "New Arrivals", href: "/" },
  { name: "Trousers", href: routePath.shop.replace(":category", "trousers")},
  { name: "Jumpers and Cardigans", href: routePath.shop.replace(":category", "jumpers-and-cardigans") },
  { name: "Dresses", href: routePath.shop.replace(":category", "dresses") },
  // { name: "Sản phẩm", href: routePath.shop.replace(":category", "all") },
];

const COMPANY : { name: string; href: string }[] = [
  { name: "Ordering instructions", href: "/ordering-instructions" },
  // { name: "Careers", href: "/" },
  // { name: "Affiliates", href: "/" },
  // { name: "Blog", href: "/" },
  // { name: "Contact Us", href: "/" },
];

const HELP : { name: string; href: string }[] = [
  // { name: "Customer Service", href: "/" },
  { name: "My Account", href: routePath.accountDetail },
  { name: "My Orders", href: routePath.orders },
  { name: "My Wishlists", href: routePath.wishlist},
  { name: "My Addresses", href: routePath.address},
  // { name: "Find a Store", href: "/" },
  // { name: "Legal & Privacy", href: "/" },
  // { name: "Contact", href: "/" },
  // { name: "Gift Card", href: "/" },
]

const Footer = () => {
  return (
    <footer className="bg-[#E4E4E4] pt-[100px] px-4">
      <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-[80px]">
        <BannerFooter />
        <div className="col-[1/1] md:col-[2/5] grid grid-cols-2 md:grid-cols-3 gap-8">
          <LinkFooter
            title="SUPPORT"
            links={COMPANY}
          />

          <LinkFooter
            title="SHOP"
            links={LINKS}
          />

          <LinkFooter
            title="HELP"
            links={HELP}
          />
        </div>
        <SubscribeFooter />
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex flex-col items-start md:flex-row md:justify-between md:items-center border-t border-[#CFCDCD] pt-4 pb-6 text-gray-600 text-sm">
        <p className="text-[#222]">©2025 Uomo</p>
        {/* <div className="flex md:flex-row flex-col items-start gap-6 mt-3">
          <div className="flex items-center gap-4">
            <span className="w-12">Language</span>
            <select className="rounded p-1 text-sm focus:outline-none bg-transparent text-[#222]">
              <option>United Kingdom | English</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12">Currency</span>
            <select className="rounded p-1 text-sm focus:outline-none bg-transparent text-[#222]">
              <option>$USD</option>
            </select>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
