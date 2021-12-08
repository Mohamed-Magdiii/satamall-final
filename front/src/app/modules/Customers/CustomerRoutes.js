import React from "react";
import { Switch, Route } from 'react-router-dom';
import CustomerEditForm from "../ECommerce/pages/customers/customer-edit-dialog/CustomerEditForm";
import CustomerComponent from "./CustomersComponent/CustomerComponent";
function CustomerRoutes() {
  return (
    <Switch>
      <Route path="/customer-page" exact component={CustomerComponent} />
      <Route path="/customer-page/add" exact component={CustomerEditForm} />
    </Switch>
  );
}

export default CustomerRoutes;
