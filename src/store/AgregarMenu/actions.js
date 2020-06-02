import { addMenuRef, addMenuEditRef } from "../../config/firebase";
import {
  ADDMENU_START,
  ADDMENU_END,
  ADDMENU_FAIL,
  ADDMENU_SUCCESS,
  ADDMENU_EDIT,
  GET_ADDMENU_SUCCESS,
  MENU_FILTER,
} from "./Constants";

export const getAddMenu = () => (dispatch) => {
  dispatch({
    type: ADDMENU_START,
  });
  addMenuRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_ADDMENU_SUCCESS,
        payload: arr,
      });
    } else {
      dispatch({
        type: ADDMENU_FAIL,
        payload: "No hay productos disponibles",
      });
    }
  });
  dispatch({
    type: ADDMENU_END,
  });
};

export const filterMenu = (products, filter) => async (dispatch) => {
  dispatch({
    type: ADDMENU_START,
  });

  let filtrado;
  if (filter !== "All") {
    filtrado = products.filter((item, index) => item.categories === filter);
  } else {
    filtrado = products;
  }

  dispatch({
    type: MENU_FILTER,
    payload: filtrado,
  });
};

export const editAddMenu = (addMenu, method) => async (dispatch) => {
  dispatch({
    type: ADDMENU_START,
    payload: method,
  });

  if (method === "Add") {
    // console.log("=======================================================");
    // console.log(addMenu);
    // console.log("=======================================================");
    // return;
    addMenuRef.push(addMenu);

    dispatch({
      type: ADDMENU_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    // console.log("===========================");
    // console.log(products.id);
    // console.log("===========================");
    // return;
    dispatch({
      type: ADDMENU_SUCCESS,
      payload: "Se borro correctamente",
    });
    addMenuEditRef(addMenu.id).remove();
  } else {
    dispatch({
      type: ADDMENU_SUCCESS,
      payload: "Se edito correctamente",
    });
    addMenuEditRef(addMenu.id).set(addMenu);
  }
  dispatch({
    type: ADDMENU_END,
  });
};
