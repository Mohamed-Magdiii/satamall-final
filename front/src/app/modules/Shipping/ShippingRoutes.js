import React from "react";
import { Switch, Route } from "react-router-dom";
import CityForm from "./CityFormComponent/CityForm";
import CountryForm from "./CountryFormComponent/CountryForm";
import ShippingForm from "./ShippingFormComponent/ShippingForm";
import ShippingList from "./ShippingListComponent/ShippingList";
function ShippingRoutes() {
  return (
    <Switch>
      <Route path="/shipping/shipping-list" exact component={ShippingList} />
      <Route path="/shipping/shipping-new" exact component={ShippingForm} />
      <Route path="/shipping/country-form" exact component={CountryForm} />
      <Route path="/shipping/city-form" exact component={CityForm} />
    </Switch>
  );
}

export default ShippingRoutes;
