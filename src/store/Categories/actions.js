import {
  categoriesRef,
  categoriesEditRef,
  categoriesMenuEditRef,
  categoriesMenuRef,
} from "../../config/firebase";
import {
  CATEGORIES_START,
  CATEGORIES_END,
  CATEGORIES_FAIL,
  CATEGORIES_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  CATEGORIES_EDIT,
  GET_CATEGORIES_MENU_SUCCESS,
} from "./Constants";

export const getCategories = () => (dispatch) => {
  dispatch({
    type: CATEGORIES_START,
  });
  categoriesRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: arr,
      });
    } else {
      dispatch({
        type: CATEGORIES_FAIL,
        payload: "No hay productos disponibles",
      });
    }
  });
  dispatch({
    type: CATEGORIES_END,
  });
};
export const getCategoriesMenu = () => (dispatch) => {
  dispatch({
    type: CATEGORIES_START,
  });
  categoriesMenuRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_CATEGORIES_MENU_SUCCESS,
        payload: arr,
      });
    } else {
      dispatch({
        type: CATEGORIES_FAIL,
        payload: "No hay un Menu disponibles",
      });
    }
  });
  dispatch({
    type: CATEGORIES_END,
  });
};

export const editcategorie = (categorie, method) => async (dispatch) => {
  dispatch({
    type: CATEGORIES_START,
    payload: method,
  });

  if (method === "Add") {
    categoriesRef.push(categorie);
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: "Se borro correctamente",
    });
    categoriesEditRef(categorie.id).remove();
  } else {
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: "Se edito correctamente",
    });
    categoriesEditRef(categorie.id).set(categorie);
  }
  dispatch({
    type: CATEGORIES_END,
  });
};
export const editcategorieMenu = (categorie, method) => async (dispatch) => {
  dispatch({
    type: CATEGORIES_START,
    payload: method,
  });

  if (method === "Add") {
    categoriesMenuRef.push(categorie);
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: "Se borro correctamente",
    });
    categoriesMenuEditRef(categorie.id).remove();
  } else {
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: "Se edito correctamente",
    });
    categoriesMenuEditRef(categorie.id).set(categorie);
  }
  dispatch({
    type: CATEGORIES_END,
  });
};
