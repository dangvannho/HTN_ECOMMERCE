import { Route } from "@/types/route.type";
import routePath from "@/config/route";
import MainLayout from "@/layouts/main-layout";

import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Category from "@/pages/shop";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const listRoute: Route[] = [
  {
    path: routePath.home,
    component: <Home />,
    layout: MainLayout,
  },
  {
    path: routePath.productDetail,
    component: <ProductDetail />,
    layout: MainLayout,
  },
  {
    path: routePath.shop,
    component: <Category/>,
    layout: MainLayout,
  },
  {
    path: routePath.login,
    component: <Login />,
    layout: MainLayout, 
  },
  {
    path: routePath.register,
    component: <Register/>,
    layout: MainLayout,
  }

];

export default listRoute;
