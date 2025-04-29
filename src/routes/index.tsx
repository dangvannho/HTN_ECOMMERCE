import { Route } from "@/types/route.type";
import routePath from "@/config/route";
import MainLayout from "@/layouts/main-layout";
import AccountLayout from "@/layouts/account-layout";

import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Category from "@/pages/shop";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Cart from "@/pages/cart";
import Order from "@/pages/order";
import AccountDetail from "@/pages/account-detail";
import Wishlist from "@/pages/wishlist";
import Addresses from "@/pages/addresses";

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
    component: <Category />,
    layout: MainLayout,
  },
  {
    path: routePath.login,
    component: <Login />,
    layout: MainLayout,
  },
  {
    path: routePath.register,
    component: <Register />,
    layout: MainLayout,
  },
  {
    path: routePath.cart,
    component: <Cart />,
    layout: MainLayout,
  },

  { path: routePath.orders, component: <Order />, layout: AccountLayout },
  {
    path: routePath.accountDetail,
    component: <AccountDetail />,
    layout: AccountLayout,
  },
  {
    path: routePath.wishlist,
    component: <Wishlist />,
    layout: AccountLayout,
  },
  {
    path: routePath.address,
    component: <Addresses/>,
    layout: AccountLayout,
  },
];

export default listRoute;
