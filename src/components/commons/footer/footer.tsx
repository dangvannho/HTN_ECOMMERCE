import BannerFooter from "./banner-footer";
import LinkFooter from "./link-footer";
import SubscribeFooter from "./subscribe-footer";

const Footer = () => {
  return (
    <footer className="bg-[#E4E4E4] pt-[100px] px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-[80px]">
        <BannerFooter />
        <LinkFooter
          title="COMPANY"
          links={["About Us", "Careers", "Affiliates", "Blog", "Contact Us"]}
        />
        <LinkFooter
          title="SHOP"
          links={["New Arrivals", "Accessories", "Men", "Women", "Shop All"]}
        />
        <LinkFooter
          title="HELP"
          links={[
            "Customer Service",
            "My Account",
            "Find a Store",
            "Legal & Privacy",
            "Contact",
            "Gift Card",
          ]}
        />
        <SubscribeFooter />
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center border-t border-[#CFCDCD] py-6 text-gray-600 text-sm">
        <p className="text-[#222]">©2025 Uomo</p>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <span>Language</span>
            <select className="border border-gray-300 rounded p-1 text-sm focus:outline-none">
              <option>United Kingdom | English</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span>Currency</span>
            <select className="rounded p-1 text-sm focus:outline-none">
              <option>$USD</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
