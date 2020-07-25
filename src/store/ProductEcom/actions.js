import { addMenuRef, addMenuEditRef } from "../../config/firebase";
import {
  GET_PRODUCTECO_SUCCESS,
  ADD_PRODUCT_ECO_START,
  PRODUCTECO_FAIL,
  PRODUCTECO_END,
  PRODUCTECO_SUCCESS,
  PRODUCTECO_FILTER
} from "./Constants";

export const getProductEco = () => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_ECO_START,
  });
  addMenuRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_PRODUCTECO_SUCCESS,
        payload: arr,
      });
    } else {
      dispatch({
        type: PRODUCTECO_FAIL,
        payload: "No hay productos disponibles",
      });
    }
  });
  dispatch({
    type: PRODUCTECO_END,
  });
};

export const filterProductEco = (products, filter) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_ECO_START,
  });

  let filtrado;
  if (filter !== "All") {
    filtrado = products.filter((item, index) => item.categories === filter);
  } else {
    filtrado = products;
  }

  dispatch({
    type: PRODUCTECO_FILTER,
    payload: filtrado,
  });
};

export const ProductEco = (addMenu, method) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_ECO_START,
    payload: method,
  });

  if (method === "Add") {
    addMenuRef.push(addMenu);

    dispatch({
      type: PRODUCTECO_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    dispatch({
      type: PRODUCTECO_SUCCESS,
      payload: "Se borro correctamente",
    });
    addMenuEditRef(addMenu.id).remove();
  } else {
    dispatch({
      type: PRODUCTECO_SUCCESS,
      payload: "Se edito correctamente",
    });
    addMenuEditRef(addMenu.id).set(addMenu);
  }
  dispatch({
    type: PRODUCTECO_END,
  });
};
