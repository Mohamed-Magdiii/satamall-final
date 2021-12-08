import React from "react";
import ProductsPage from "./ProductComponent/ProductsPage";
import { Switch, Route } from "react-router-dom";
import ProductForm from "./ProductFormComponent/ProductForm";
import ProductEditForm from "./ProductEditFormComponent/ProductEditForm";

function ProductsRoute() {
  return (
    <Switch>
      <Route path="/products-page" exact component={ProductsPage} />
      <Route path="/products-page/new" exact component={ProductForm} />
      <Route path="/products-page/edit/:id" exact component={ProductEditForm} />
    </Switch>
  );
}

export default ProductsRoute;
