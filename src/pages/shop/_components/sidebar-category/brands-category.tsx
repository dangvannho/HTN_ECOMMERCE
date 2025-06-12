import React, { useState } from "react";
import { Search } from "lucide-react";
import ButtonFilter from "@/components/commons/button-filter";

interface BrandsCategoryProps {
  selectedBrands: string[];
  onBrandSelect: (brand: string) => void;
}

interface BrandOption {
  name: string;
  count: number;
}

const brandOptions: BrandOption[] = [
  { name: "MEN", count: 2 }, 
  { name: "WOMEN", count: 7 }, 
  { name: "KIDS", count: 19 },
  { name: "UNISEX", count: 29 }, 
];

const BrandsCategory: React.FC<BrandsCategoryProps> = ({
  selectedBrands,
  onBrandSelect,
}) => {
  const [openCats, setOpenCats] = useState(true);
  const [brandSearch, setBrandSearch] = useState("");
  const [value, setValue] = useState("");

  const filteredBrands = brandOptions.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleClick = () => {
    setOpenCats((o) => !o);
  };

  return (
    <div>
      <ButtonFilter title="The Collection" onClick={handleClick} openCats={openCats}/>
      {openCats && (
        <div className="mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setBrandSearch(e.target.value);
              }}
              className="px-2 pr-8 py-[17px] w-full border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 border-[2px] border-solid border-[var(--Background-Footer,#E4E4E4)] bg-[#FFF]"
            />
            {value === "" && (
              <Search
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                size={20}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 mt-[30px]">
            {filteredBrands.map((brand) => (
              <label
                key={brand.name}
                className="flex items-center gap-2 cursor-pointer mb-[23px]"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => onBrandSelect(brand.name)}
                  className="w-4 h-4 rounded border-gray-300 text-black accent-black focus:ring-black border-[2px] border-solid border-[var(--Background-Footer,#E4E4E4)] bg-[#FFF]"
                />
                <span className="text-sm text-[#222]">{brand.name}</span>
                <span className="text-sm text-[#767676] ml-auto">{brand.count}</span>
              </label>
            ))} 
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsCategory;
