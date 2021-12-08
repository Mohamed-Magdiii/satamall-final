import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
// import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import userReducer from '../Reducer/customerReducer';
import products from '../Reducer/products';
import country from '../Reducer/country';
import categoryReducer from '../Reducer/categoryReducer';
import blogs from "../Reducer/blogsReducer";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  // products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  customer: userReducer,
  products,
  country,
  category: categoryReducer,
  blogs
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
