import  { useEffect, useState } from 'react'
import bannerSliderApi from '@/services/banner-slider/api/banner-slider.api';
import type { BannerSlider } from '@/services/banner-slider/types/banner-slider.types';

const BannerCategory = () => {
  const [active, setActive] = useState(0);
  const [banners, setBanners] = useState<BannerSlider[]>([]);
  

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await bannerSliderApi.getAllBannerSlider();
        setBanners(res.data || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setBanners([]);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    // Tại vì sao không sử lý ở fetchBanners
    const timer = setTimeout(() => setActive((i) => (i + 1) % banners.length), 4000);
    return () => clearTimeout(timer);
  }, [active, banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="flex flex-1 h-[260px] md:h-[290px] xl:h-[340px] transition-shadow shadow-banner overflow-hidden mb-8 animate-fade-scroll bg-[#F5E6E0]">
      <div className="bg-bannerLeft w-[40%] h-full flex flex-col gap-3 justify-center items-start px-2 lg:px-14">
        <h1 className="text-xl lg:text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">{banners[active].title}</h1>
        <p className="max-w-md text-[1rem] text-accentBlack/70">{banners[active].description}</p>
        <div className="flex mt-6 gap-2 sm:gap-4 items-center ">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to banner ${i + 1}`}
              className="relative w-5 h-5 flex items-center justify-center"
            >
              <span
                className={`transition-all duration-500 ease-in-out ${
                  active === i
                    ? "w-5 h-5 border-[2px] border-black rounded-full flex items-center justify-center scale-100 opacity-100"
                    : "w-2 h-2 rounded-full"
                }`}
                style={{
                  backgroundColor: active === i ? "transparent" : "#DDC2B9",
                }}
              >
                {active === i && (
                  <span className="w-2 h-2 rounded-full bg-black transition-all duration-500 scale-100" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      <a href={banners[active].link} className="bg-bannerRight w-[60%] h-full flex items-center justify-center">

        <img
          src={banners[active].image}
          alt=""
          className="object-cover h-full w-full"
          draggable={false}
          />
      </a>
    </div>
  );
};

export default BannerCategory;
