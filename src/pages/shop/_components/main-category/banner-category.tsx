import React, { useEffect, useState } from 'react'

const banners = [
  {
    img: "https://i.pinimg.com/736x/c0/c2/2b/c0c22ba834a28d6fbc26bb8bd5c837b4.jpg",
    leftBg: "bg-bannerLeft",
    rightBg: "bg-bannerRight",
    title: "WOMEN'S ACCESSORIES",
    desc: "Accessories are the best way to update your look. Add a little edge, play with new styles and colors, or go for timeless pieces.",
  },
  {
    img: "https://i.pinimg.com/736x/7b/b5/91/7bb59105fcd8c929a81773a6b4c97791.jpg",
    leftBg: "bg-bannerLeft",
    rightBg: "bg-bannerRight",
    title: "MODERN MINIMALIST",
    desc: "Find your own style in our new selection. Cool shapes, muted colors, understated luxury.",
  },
  {
    img: "https://i.pinimg.com/736x/9d/8b/0f/9d8b0f2ace1aefbff3de2062c87cd91f.jpg",
    leftBg: "bg-bannerLeft",
    rightBg: "bg-bannerRight",
    title: "ELEVATE YOUR STYLE",
    desc: "Curated pieces for elevated everyday wear—refined, contemporary, effortless.",
  },
];

const BannerCategory = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setActive((i) => (i + 1) % banners.length), 4000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="flex flex-1 h-[260px] md:h-[290px] xl:h-[340px] transition-shadow shadow-banner overflow-hidden mb-8 animate-fade-scroll bg-[#F5E6E0]">
      <div className={`${banners[active].leftBg} w-[40%] h-full flex flex-col justify-center items-start px-2 lg:px-14`}>
        <h1 className="text-xl lg:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-2">{banners[active].title}</h1>
        <p className="max-w-md text-[1rem] text-accentBlack/70">{banners[active].desc}</p>
        <div className="flex mt-6 gap-4 items-center">
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
      <div className={`${banners[active].rightBg} w-[60%] h-full flex items-center justify-center`}>
        <img
          src={banners[active].img}
          alt=""
          className="object-cover h-full w-full"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default BannerCategory;
