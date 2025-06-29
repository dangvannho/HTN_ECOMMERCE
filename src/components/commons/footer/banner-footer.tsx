import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Instagram from "@/components/icons/instagram";

const BannerFooter = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <img src="/logo.svg" alt="" />
      </div>
      <p className="text-[#222] text-sm font-normal mt-6 md:mt-8 lg:mt-10">
        195 Trần Cao Vân, Xuân Hà, Thanh Khê, Đà Nẵng
      </p>
      <div>
        <p className="text-[#222] text-sm font-medium mt-2"> 0327 228 357</p>
      </div>
      <div className="flex gap-7 mt-8 md:mt-10 lg:mt-12">
        <a href="https://www.facebook.com">
          <Facebook className="size-3" />
        </a>
        <a href="https://x.com/WiicampSoftware">
          <Twitter className="size-3" />
        </a>
        <a href="https://www.instagram.com/hungday_21/">
          <Instagram className="size-3" />
        </a>
      </div>
    </div>
  );
};

export default BannerFooter;
