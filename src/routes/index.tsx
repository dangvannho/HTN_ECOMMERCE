import { Route } from "@/types/route.type";
import routePath from "@/config/route";
import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";

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
];

export default listRoute;
