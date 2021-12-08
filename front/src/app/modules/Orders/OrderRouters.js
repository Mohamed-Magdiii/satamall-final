import React from "react";
import { Switch, Route } from "react-router-dom";
import OrdersComponent from "./OrderComponent/OrdersComponent";
import OrderDetailComponent from "./OrderDetailComponent/OrderDetailComponent";
import OrderTypes from "./OrderTypes/OrderTypes";
import OrderUpdateComponent from "./OrderUpdateComponent/OrderUpdateComponent";

function OrderRouters() {
  return (
    <Switch>
      <Route path="/orders" exact component={OrdersComponent} />
      <Route
        path="/orders/order-item/:id"
        exact
        component={OrderDetailComponent}
      />
      <Route
        path="/orders/update-order/:id"
        exact
        component={OrderUpdateComponent}
      />
      <Route path='/orders/type/:type' component={OrderTypes} />
    </Switch>
  );
}

export default OrderRouters;
