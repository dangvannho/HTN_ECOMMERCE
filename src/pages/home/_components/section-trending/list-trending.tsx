import ItemTrending from "@/pages/home/_components/section-trending/item-trending";
import ImgItem from "@/assets/images.svg";
import Profile from "@/assets/profleGit.jpg";

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


const ListTrending = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 container max-w-7xl mx-auto">
      {productData.map((product) => (
        <ItemTrending key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ListTrending;
