import { useState, useEffect } from "react";
// import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import bannerHomeApi from "@/services/banner-home/api/banner-home.api";
import type { BannerHome } from "@/services/banner-home/types/banner-home.types";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [banners, setBanners] = useState<BannerHome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannerHomeApi.getAllBannerHome();
        if (response.data && response.data.length > 0) {
          const sortedBanners = response.data.sort(
            (a, b) => a.position - b.position
          );
          setBanners(sortedBanners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fff]">
        <div className="flex flex-col lg:flex-row justify-center overflow-hidden pt-7 container max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-around">
            <div className="mb-12 lg:mb-0">
              <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!banners.length) {
    return null;
  }

  const heroImages = banners.map((banner) => banner.images);
  const currentBanner = banners[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <div className="bg-[#fff] px-4 ">
      <div className=" flex flex-col lg:flex-row justify-center overflow-hidden xl:max-w-5xl 2xl:max-w-7xl mx-auto py-[33px]">
        {/* cột trái  */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-around sm:pb-0 pb-4">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-[50px] sm:text-2xl lg:text-6xl font-normal text-gray-900 mb-3 sm:mb-4">
              {currentBanner?.title}
            </h1>

            <p className="text-base font-normal sm:text-lg mb-6 sm:mb-8">
              {currentBanner?.description}
            </p>

            <Link
              to="/shop/all"
              className="text-sm not-italic font-medium leading-[24px] tracking-wider text-gray-900 uppercase border-b border-gray-900 pb-1 hover:border-gray-500 hover:text-gray-500 transition-colors"
            >
              Khám Phá Ngay
            </Link>
          </div>

          {/* Bottom Slider */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs uppercase text-gray-500 tracking-wider mt-8 lg:mt-0">
            <button
              onClick={prevImage}
              className="flex items-center gap-2 group hover:text-gray-900 transition-colors"
            >
              Trước
              <span className="block w-6 sm:w-8 h-px bg-gray-400 group-hover:bg-gray-900 transition-colors"></span>
            </button>

            <button
              onClick={nextImage}
              className="flex items-center gap-2 group hover:text-gray-900 transition-colors"
            >
              <span className="block w-6 sm:w-8 h-px bg-gray-400 group-hover:bg-gray-900 transition-colors"></span>
              Sau
            </button>
          </div>
        </div>

        {/* cột phải */}
        <div className="relative w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={heroImages[currentImageIndex]}
              alt={currentBanner.title}
              className="w-full h-full object-contain"
              key={currentImageIndex}
            />
          </div>
        </div>

        {/* Media icon */}
        {/* <div className="absolute right-4 sm:right-28 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 sm:space-y-6 z-10">
                    <a href="https://www.facebook.com/Thegmenstore" className="text-gray-500 hover:text-gray-900 transition-colors"><Facebook size={16} /></a>
                    <a href="https://x.com/home" className="text-gray-500 hover:text-gray-900 transition-colors"><Twitter size={16} /></a>
                    <a href="https://www.instagram.com/" className="text-gray-500 hover:text-gray-900 transition-colors"><Instagram size={16} /></a>
                    <a href="https://www.youtube.com/" className="text-gray-500 hover:text-gray-900 transition-colors"><Youtube size={16} /></a>
                    <span className="text-xs text-gray-500 uppercase tracking-widest pt-2" style={{ writingMode: 'vertical-rl' }}>Follow Us</span>
                </div> */}
      </div>
    </div>
  );
};

export default Hero;
