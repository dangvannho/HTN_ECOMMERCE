import BannerFooter from "./banner-footer";
import LinkFooter from "./link-footer";
import SubscribeFooter from "./subscribe-footer";

const Footer = () => {
  return (
    <footer className="bg-[#E4E4E4] pt-[100px] px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-[80px]">
        <BannerFooter />
        <div className="col-[1/1] md:col-[2/5] grid grid-cols-2 md:grid-cols-3 gap-8">
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
        </div>
        <SubscribeFooter />
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex flex-col items-start md:flex-row md:justify-between md:items-center border-t border-[#CFCDCD] pt-4 pb-6 text-gray-600 text-sm">
        <p className="text-[#222]">©2025 Uomo</p>
        <div className="flex md:flex-row flex-col items-start gap-6 mt-3">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
