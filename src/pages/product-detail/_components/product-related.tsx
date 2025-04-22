import { useState } from "react";
import ImgItem from "@/assets/images.svg";
import Profile from "@/assets/profleGit.jpg";
import ItemTrending from "@/pages/home/_components/section-trending/item-trending";

const productData = [
  {
    id: 1,
    images: [ImgItem, Profile], // mảng hình ảnh của sản phẩm
    category: "Dresses",
    name: "Cropped Faux Leather Jacket",
    price: 29,
    tag: "-35%", //discount
    tagColor: "bg-red-500 text-white", //màu của discount
    colors: ["black"], //màu của sản phẩm
  },
  {
    id: 2,
    images: [ImgItem, ImgItem],
    category: "Dresses",
    name: "Satin Blouse",
    price: 77,
    tag: "",
    tagColor: "bg-red-500",
    colors: ["black", "white"],
  },
  {
    id: 3,
    images: [ImgItem, ImgItem, ImgItem],
    category: "Dresses",
    name: "Ribyr T-Shirt",
    price: 17,
    tag: "",
    colors: ["gray", "white", "red"],
  },
  {
    id: 4,
    images: [ImgItem, ImgItem],
    category: "Dresses",
    name: "Cardigan Shirt",
    price: 100,
    discount: 89,
    tag: "New",
    tagColor: "bg-white text-black",
    colors: [],
  },
  {
    id: 5,
    images: [ImgItem, ImgItem],
    category: "Dresses",
    name: "Casual Jacket",
    price: 29,
    tag: "Sale",
    tagColor: "bg-black text-white",
    colors: [],
  },
  {
    id: 6,
    images: [ImgItem, ImgItem],
    category: "Dresses",
    name: "Shirt In Botanical Chinoshi Print",
    price: 82,
    tag: "",
    colors: [],
  },
  {
    id: 7,
    images: [ImgItem, ImgItem],
    category: "Dresses",
    name: "Cotton Jersey T-Shirt",
    price: 17,
    tag: "",
    colors: [],
  },
  {
    id: 8,
    images: [ImgItem, ImgItem],
    category: "Dresses",
    name: "Zessi Dresser",
    price: 100,
    discount: 89,
    tag: "",
    colors: [],
  },
];
const ProductRelated = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? productData : productData.slice(0, 4);
  return (
    <div className="mt-14 pb-4">
      <div className="flex justify-between items-center lg:px-0 px-3">
        <h5 className="flex gap-2">
          <span className="text-lg lg:text-[26px]">RELATED</span>
          <span className="text-lg lg:text-[26px] font-bold">PRODUCTS</span>
        </h5>
        <p
          className="hover:underline cursor-pointer hidden md:block"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show All"}
        </p>
      </div>

      <div className="mt-[34px] grid grid-cols-1 md:grid-cols-4 gap-4 lg:px-0 px-3">
        {displayedProducts.map((item) => {
          return <ItemTrending key={item.id} product={item} />;
        })}
      </div>

      <p
        className="underline cursor-pointer text-center block md:hidden"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less" : "Show All"}
      </p>
    </div>
  );
};

export default ProductRelated;
