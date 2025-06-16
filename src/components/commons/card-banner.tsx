import { Link } from "react-router-dom";
import IMG from "@/assets/images.svg";

interface CardBannerProps {
    // subheading: string;
    title: string;
    className?: string;
    link: string;
    image?: string;
}

const CardBanner = ({ title, className=" ", link, image }: CardBannerProps) => {
  return (
    <Link
        to={link}
        className={`${className} bg-gray-100 relative overflow-hidden group`}
      >
        <div className="absolute left-6 md:left-8 bottom-6 md:bottom-8 z-10 text-[#222]">
          {/* <p className="text-[12px] md:text-sm not-italic font-normal leading-[24px]">
            {subheading}
          </p> */}
          <h2 className="text-[20px] md:text-[18px] lg:text-[22px] xl:text-[26px] not-italic font-medium w-[40%] md:w-[60%]">
            {title}
          </h2>
          <p className="text-[12px] md:text-sm font-medium underline-offset-4 hover:text-yellow-600 transition-colors duration-300 relative group w-max pb-1">
            SHOP NOW 
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#222] transition-all duration-300 group-hover:w-full"></span>
          </p>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full object-cover">
          <img
            src={image}
            alt={`${title} Banner`}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
  )
}

export default CardBanner