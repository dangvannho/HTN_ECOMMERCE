import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Instagram from "@/components/icons/instagram";
import Youtube from "@/components/icons/youtube";
import Pinterest from "@/components/icons/pinterest";
const BannerFooter = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <img src="/logo.svg" alt="" />
      </div>
      <p className="text-[#222] text-sm font-normal mt-10">
        1418 River Drive, Suite 35 Cottonhall, CA 9422 United States
      </p>
      <div>
        <p className="text-[#222] text-sm font-medium mt-8">sale@uqmo.com</p>
        <p className="text-[#222] text-sm font-medium mt-2"> +1 246-345-0695</p>
      </div>
      <div className="flex gap-7 mt-12">
        <a href="#!">
          <Facebook className="size-3" />
        </a>
        <a href="#!">
          <Twitter className="size-3" />
        </a>
        <a href="#!">
          <Instagram className="size-3" />
        </a>
        <a href="#!">
          <Youtube className="size-3" />
        </a>
        <a href="#!">
          <Pinterest className="size-3" />
        </a>
      </div>
    </div>
  );
};

export default BannerFooter;
