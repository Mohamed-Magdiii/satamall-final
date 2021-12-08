/** @format */

import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { DashboardPage } from "./pages/DashboardPage";

const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

const Productpage = lazy(() => import("./modules/Products/ProductRoute"));

const Shippingpage = lazy(() => import("./modules/Shipping/ShippingRoutes"));

const OrderComponent = lazy(() => import("./modules/Orders/OrderRouters"));

const CategoryComponent = lazy(() =>
  import("./modules/Category/CategoryRouters")
);

const CustomerComponent = lazy(() =>
  import("./modules/Customers/CustomerRoutes")
);

const OfferComponent = lazy(() => import("./modules/Offers/OfferRoutes"));

const BlogComponent = lazy(() => import("./pages/Blogs"));
export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <Route path="/products-page" component={Productpage} />
        <Route path="/shipping" component={Shippingpage} />
        <Route path="/customer-page" component={CustomerComponent} />
        <Route path="/categories" component={CategoryComponent} />
        <Route path="/orders" component={OrderComponent} />
        <Route path="/offers" component={OfferComponent} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Route path="/blogs-page" component={BlogComponent} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
