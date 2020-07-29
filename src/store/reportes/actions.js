import { gastosRef, gastosEditRef } from "../../config/firebase";
import { REPORTES_START, REPORTES_END, REPORTES_SUCCESS } from "./Constants";

export const getReports = () => (dispatch) => {
  dispatch({
    type: REPORTES_START,
  });
  gastosRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: REPORTES_SUCCESS,
        payload: {
          gastos: arr,
        },
      });
    } else {
    }
  });
  dispatch({
    type: REPORTES_END,
  });
};

export const editView = (view) => async (dispatch) => {
  dispatch({
    type: REPORTES_START,
  });
  dispatch({
    type: REPORTES_SUCCESS,
    payload: {
      view: view,
    },
  });
};

export const editReports = (products, method) => async (dispatch) => {
  dispatch({
    type: REPORTES_START,
    payload: method,
  });

  if (method === "Add") {
    gastosRef.push(products);
    dispatch({
      type: REPORTES_SUCCESS,
      payload: { msg: "Se creo correctamente" },
    });
  } else if (method === "Delete") {
    dispatch({
      type: REPORTES_SUCCESS,
      payload: { msg: "Se borro correctamente" },
    });
    gastosEditRef(products.id).remove();
  } else {
    dispatch({
      type: REPORTES_SUCCESS,
      payload: { msg: "Se edito correctamente" },
    });
    gastosEditRef(products.id).set(products);
  }
  dispatch({
    type: REPORTES_END,
  });
};
