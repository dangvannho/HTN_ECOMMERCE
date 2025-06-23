import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import ButtonFilter from "@/components/commons/button-filter";
import { formatToVND } from "@/utils/format";

interface PriceCategoryProps {
  selectedPrice: [number, number];
  onPriceSelect: (price: [number, number]) => void;
}

const PriceCategory: React.FC<PriceCategoryProps> = ({ selectedPrice, onPriceSelect }) => {
  const [openCats, setOpenCats] = useState(true);

  const handleClick = () => {
    setOpenCats((o) => !o);
  };

  return (
    <div>
      <ButtonFilter title="Price" onClick={handleClick} openCats={openCats}/>
      {openCats && (
        <div className="pl-1 pt-4">
          <div className="relative w-full">
            <SliderPrimitive.Root
              className="relative flex w-full touch-none select-none items-center"
              defaultValue={selectedPrice}
              value={selectedPrice}
              onValueChange={onPriceSelect}
              max={10000000}
              min={100000}
              step={10000}
              minStepsBetweenThumbs={1}
            >
              <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-[#E4E4E4]">
                <SliderPrimitive.Range className="absolute h-full bg-black" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className="block h-5 w-5 rounded-full border-2 border-black bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing"
                aria-label="Min price"
              />
              <SliderPrimitive.Thumb
                className="block h-5 w-5 rounded-full border-2 border-black bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing"
                aria-label="Max price"
              />
            </SliderPrimitive.Root>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-[#767676] text-sm">Min Price:</span>
              <p className="text-[#222] text-sm">{formatToVND(selectedPrice[0])}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#767676] text-sm">Max Price:</span>
              <p className="text-[#222] text-sm">{formatToVND(selectedPrice[1])}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCategory;
