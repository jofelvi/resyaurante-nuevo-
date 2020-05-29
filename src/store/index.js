import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import authReducer from "./auth/reducer";
import products from "./Products/reducer";
import categories from "./Categories/reducer";
import addMenu from "./AgregarMenu/reducer";
const reducers = combineReducers({
  auth: authReducer,
  products: products,
  categories: categories,
  addmenu: addMenu,
});

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
