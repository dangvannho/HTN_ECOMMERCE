import BannerCategory from "./banner-category";
import ListCardCategory from "./list-card-category/list-card-category";
import BreadCrumb from "@/components/commons/bread-crumb";

const MainCategory = () => {
  return (
    <div className="w-full">
      <BannerCategory />

      <BreadCrumb />

      <ListCardCategory />
    </div>
  );
};

export default MainCategory;
