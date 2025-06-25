import  { useEffect, useState, useRef } from 'react'
import bannerSliderApi from '@/services/banner-slider/api/banner-slider.api';
import type { BannerSlider } from '@/services/banner-slider/types/banner-slider.types';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const BannerCategory = () => {
  const [active, setActive] = useState(0);
  const [banners, setBanners] = useState<BannerSlider[]>([]);
  const [loadingBannerList, setLoadingBannerList] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [firstImageEverLoaded, setFirstImageEverLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBanners = async () => {
      setLoadingBannerList(true);
      try {
        const res = await bannerSliderApi.getAllBannerSlider();
        setBanners(res.data || []);
      } catch (error) {
        setBanners([]);
      } finally {
        setLoadingBannerList(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % banners.length), 4000);
    return () => clearTimeout(timer);
  }, [active, banners.length]);

  useEffect(() => {
    if (active === 0 && !firstImageEverLoaded) {
      setImgLoaded(false);
      if (imgRef.current && imgRef.current.complete) {
        setImgLoaded(true);
      }
    }
  }, [active, firstImageEverLoaded]);

  if (banners.length === 0) return null;

  const showSkeleton = loadingBannerList || (active === 0 && !firstImageEverLoaded && !imgLoaded);

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
      <div className="relative w-[60%] h-full flex items-center justify-center">
        {showSkeleton && (
          <Skeleton className="absolute inset-0 w-full h-full z-10" />
        )}
        <img
          ref={imgRef}
          src={banners[active].image}
          alt=""
          className="object-cover bg-bannerRight w-full h-full flex items-center justify-center cursor-pointer transition-opacity duration-300"
          draggable={false} 
          onClick={() => navigate(banners[active].link, { replace: true })}
          loading='eager'
          style={active === 0 && !firstImageEverLoaded ? { opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' } : { opacity: 1 }}
          onLoad={() => {
            setImgLoaded(true);
            if (active === 0 && !firstImageEverLoaded) setFirstImageEverLoaded(true);
          }}
        />
      </div>
    </div>
  );
};

export default BannerCategory;
