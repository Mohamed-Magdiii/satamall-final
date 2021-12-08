import React from "react";
import { Switch, Route } from 'react-router-dom';
import OfferDetailComponent from "./OfferDetailComponent/OfferDetailComponent";
import OffersComponent from './OffersComponent/OffersComponent';
function OfferRoutes() {
  return (
    <Switch>
      <Route path="/offers" exact component={OffersComponent} />
      <Route path="/offers/offer-detail/:id" exact component={OfferDetailComponent} />
    </Switch>
  );
}

export default OfferRoutes;
