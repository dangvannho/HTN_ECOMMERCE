import React from "react";
import BannerCategory from "./banner-category";
import { Link } from "react-router-dom";
import routePath from "@/config/route";
import ListCardCategory from "./list-card-category/list-card-category";

const MainCategory = () => {
  return (
    <div className="w-full">
      <BannerCategory />

      <div className="flex items-center gap-2 uppercase">
        <Link to={routePath.home}>Home</Link>
        <p>/</p>
        <Link to={routePath.shop}>The Shop</Link>
      </div>

      <ListCardCategory/>
    </div>
  );
};

export default MainCategory;
