import ImgItem from "../../src/assets/images.svg";
import Profile from "../../src/assets/profleGit.jpg";

//data sản phẩm trong section trending
export const productData = [
    {
        id: 1,
        images: [ImgItem, Profile], // mảng hình ảnh của sản phẩm
        category: "Dresses",
        name: "Cropped Faux Leather Jacket",
        price: 29,
        tag: "-35%", //discount
        tagColor: "bg-red-500", //màu của discount
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
        tagColor: "bg-gray-200 text-black",
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
