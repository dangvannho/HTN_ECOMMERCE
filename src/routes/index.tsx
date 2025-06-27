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
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import OrderDetail from "@/pages/order-detail";
import NotFound from "@/pages/not-found";
import Collection from "@/pages/collection";
import Instruct from "@/pages/instruct";
import OAuthHandler from "@/pages/auth/_components/o-auth-handler";
import PrivateRoute from "./private-route";

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
    path: routePath.forgotPassword,
    component: <ForgotPassword />,
    layout: MainLayout,
  },
  {
    path: routePath.resetPassword,
    component: <ResetPassword />,
    layout: MainLayout,
  },
  {
    path: routePath.cart,
    component: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
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
    component: <Addresses />,
    layout: AccountLayout,
  },
  {
    path: routePath.orderDetail,
    component: <OrderDetail />,
    layout: MainLayout,
  },
  {
    path: routePath.notFound,
    component: <NotFound />,
    layout: MainLayout,
  },
  {
    path: routePath.collection,
    component: <Collection />,
    layout: MainLayout,
  },
  {
    path: routePath.instruct,
    component: <Instruct />,
    layout: MainLayout,
  },
  {
    path: routePath.oauth,
    component: <OAuthHandler />,
    layout: null,
  },
];

export default listRoute;
