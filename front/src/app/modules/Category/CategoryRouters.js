import React from "react";
import { Switch, Route } from "react-router-dom";
import CustomerEditForm from "../ECommerce/pages/customers/customer-edit-dialog/CustomerEditForm";
import CategoryComponent from "./CategoryComponent/CategoryComponent";
import CategoryUpdate from "./CategoryUpdate/CategoryUpdate";
import AddSubCategory from "./SubCategory/AddSubCategory/AddSubCategory";
import SubCategoryComponent from "./SubCategory/SubCategoryComponent";
import UpdateSubCategory from "./SubCategory/UpdateSubCategory/UpdateSubCategory";

function OrderRouters() {
  return (
    <Switch>
      <Route path="/categories" exact component={CategoryComponent} />
      <Route path="/categories/update/:id" component={CategoryUpdate} />
      <Route path="/categories/add" exact component={CustomerEditForm} />
      <Route path="/categories/sub-category/:id" exact component={SubCategoryComponent} />
      <Route path="/categories/sub-category/add/:id" exact component={AddSubCategory} />
      <Route path="/categories/sub-category/update/:id" exact component={UpdateSubCategory} />
    </Switch>
  );
}

export default OrderRouters;
