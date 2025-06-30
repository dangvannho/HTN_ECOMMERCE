import routePath from "@/config/route";
import BannerFooter from "./banner-footer";
import LinkFooter from "./link-footer";
import SubscribeFooter from "./subscribe-footer";
import useCategory from "@/services/category/hooks/useCategory";


const COMPANY: { name: string; href: string }[] = [
  { name: "Hướng Dẫn Đặt Hàng", href: "/ordering-instructions" },

];

const HELP: { name: string; href: string }[] = [
  { name: "Tài khoản của tôi", href: routePath.accountDetail },
  { name: "Đơn đặt hàng của tôi", href: routePath.orders },
  { name: "Danh sách yêu thích", href: routePath.wishlist },
  { name: "Địa chỉ của tôi", href: routePath.address },
];

const Footer = () => {
  const { categories } = useCategory();

  // Get first 5 categories and map them to LINKS format
  const LINKS = categories.slice(0, 5).map(category => ({
    name: category.name,
    href: `/shop/${category.slug}` 
  }));

  return (
    <footer className="bg-[#E4E4E4] pt-[50px] lg:pt-[100px] px-4">
      <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-[80px]">
        <BannerFooter />
        <div className="col-[1/1] md:col-[2/5] grid grid-cols-2 md:grid-cols-3 gap-8">
          <LinkFooter title="HỖ TRỢ" links={COMPANY} />
          <LinkFooter title="DANH MỤC" links={LINKS} />
          <LinkFooter title="TRỢ GIÚP" links={HELP} />
        </div>
        <SubscribeFooter />
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex justify-center border-t border-[#CFCDCD] pt-4 pb-6 text-gray-600 text-sm">
        <p className="text-[#222]">©2025 Uomo</p>
        {/* <div className="flex md:flex-row flex-col items-start gap-6 mt-3">
          <div className="flex items-center gap-4">
            <span className="w-12">Ngôn ngữ</span>
            <select className="rounded p-1 text-sm focus:outline-none bg-transparent text-[#222]">
              <option>Việt Nam | Tiếng Việt</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12">Tiền tệ</span>
            <select className="rounded p-1 text-sm focus:outline-none bg-transparent text-[#222]">
              <option>VND</option>
            </select>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
