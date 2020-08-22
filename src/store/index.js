import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import authReducer from "./auth/reducer";
import products from "./Products/reducer";
import categories from "./Categories/reducer";
import addMenu from "./AgregarMenu/reducer";
import productosCuenta from "./agregaralaCuenta/reducer";
import pagandoCuenta from "./cobrarPedidos/reducer";
import clients from "./Clients/reducer";
import Reports from "./reportes/reducer";
import Table from "./Table/reducer";
import Sectors from "./sectors/reducer";
import Reserved from "./reserved/reducer";

const reducers = combineReducers({
  auth: authReducer,
  products: products,
  categories: categories,
  addmenu: addMenu,
  addcuenta: productosCuenta,
  listaPorPagar: pagandoCuenta,
  clients: clients,
  reportes: Reports,
  tables: Table,
  sectors: Sectors,
  reserved: Reserved,
});

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
