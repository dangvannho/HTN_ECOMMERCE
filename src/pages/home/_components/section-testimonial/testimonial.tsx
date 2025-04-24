// components/TestimonialsCarousel.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DotButton } from "./dot-navigation";



export interface Testimonial {
  id: number;
  name: string;
  date: string;
  avatar: string;
  message: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Helena Gibson",
    date: "06 April 2020",
    avatar: "https://via.placeholder.com/60",
    message:
      "Ipsum dolor sit amet, consectetur adipiscing elit. Fringilla vel tincidunt ipsum ac. Nam at et id leo pulvinar egestas mi lorem. Adipiscing felis, vel faucibus in. Hendrerit viverra elementum venenatis pellentesque pellentesque ornare",
  },
  {
    id: 2,
    name: "John Doe",
    date: "12 June 2021",
    avatar: "https://via.placeholder.com/60",
    message:
      "Adipiscing felis, vel faucibus in, porta aenean id nec. Hendrerit viverra elementum venenatis, offering both flexibility and comfort in every movement.",
  },
  {
    id: 3,
    name: "Sarah Lee",
    date: "21 August 2022",
    avatar: "https://via.placeholder.com/60",
    message:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; providing strong support and stability for your feet throughout the day.",
  },
];



export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="bg-white text-center py-[100px]">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-[#222] text-center text-[25px] sm:text-[35px] not-italic font-normal uppercase mb-10">Testimonials</h2>
        <div className="relative">
              <p className="px-4 ms:px-0 max-w-sm sm:max-w-md md:max-w-2xl mx-auto text-[#222] text-center text-sm sm:text-lg not-italic font-normal leading-[32px] mb-[26px] line-clamp-2">
              “{testimonials[current].message}”
              </p>
          <p className="text-[#767676] text-center text-sm not-italic font-normal leading-[24px] mb-[15px]">
            {testimonials[current].name}, {testimonials[current].date}
          </p>
          <img
            src={testimonials[current].avatar}
            alt={testimonials[current].name}
            className="w-14 h-14 rounded-full mx-auto mb-[50px]"
          />

          <div className="flex justify-between items-center absolute top-1/2 left-0 right-0 px-4 lg:px-0">
            <button onClick={prev}>
              <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </button>
            <button onClick={next}>
              <ChevronRight className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <DotButton
                key={idx}
                active={idx === current}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
