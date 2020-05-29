import { productsRef, productsEditRef } from "../../config/firebase";
import {
  PRODUCT_START,
  PRODUCT_END,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  GET_PRODUCT_SUCCESS,
  PRODUCT_EDIT,
} from "./Constants";

export const getProduct = () => (dispatch) => {
  dispatch({
    type: PRODUCT_START,
  });
  productsRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: arr,
      });
    } else {
      dispatch({
        type: PRODUCT_FAIL,
        payload: "No hay productos disponibles",
      });
    }
  });
  dispatch({
    type: PRODUCT_END,
  });
};

export const editproducts = (products, method) => async (dispatch) => {
  dispatch({
    type: PRODUCT_START,
    payload: method,
  });

  if (method === "Add") {
    productsRef.push(products);
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: "Se borro correctamente",
    });
    productsEditRef(products.id).remove();
  } else {
    // console.log("===========================");
    // console.log(method);
    // console.log("===========================");
    // return;
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: "Se edito correctamente",
    });
    productsEditRef(products.id).set(products);
  }
  dispatch({
    type: PRODUCT_END,
  });
};
