import { addMenuRef, addMenuEditRef } from "../../config/firebase";
import {
  ADDALACUENTA_START,
  ADDALACUENTA_END,
  ADDALACUENTA_FAIL,
  ADDALACUENTA_SUCCESS,
  ADDALACUENTA_EDIT,
  SET_ADDALACUENTA_SUCCESS,
} from "./Constants";

// export const getCuentas = () => (dispatch) => {
//   dispatch({
//     type: ADDMENU_START,
//   });
//   addMenuRef.on("value", (snapshot) => {
//     if (snapshot.val()) {
//       const data = snapshot.val();

//       const arr = Object.keys(data).map((i) => {
//         data[i].id = i;
//         return data[i];
//       });
//       dispatch({
//         type: GET_ADDMENU_SUCCESS,
//         payload: arr,
//       });
//     } else {
//       dispatch({
//         type: ADDMENU_FAIL,
//         payload: "No hay productos disponibles",
//       });
//     }
//   });
//   dispatch({
//     type: ADDMENU_END,
//   });
// };

export const addProductosCosto = (products, precioAnterior = 0) => (
  dispatch
) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  let preciototal = precioAnterior;
  for (const key in products) {
    let number = products[key].precioUnitario
      ? Number(products[key].precioUnitario)
      : 0;
    preciototal += number;
  }

  dispatch({
    type: SET_ADDALACUENTA_SUCCESS,
    payload: preciototal,
  });
  dispatch({
    type: ADDALACUENTA_END,
  });
};

export const filterMenu = (products, filter) => async (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
  });

  let filtrado;
  if (filter !== "All") {
    filtrado = products.filter((item, index) => item.categories === filter);
  } else {
    filtrado = products;
  }

  // dispatch({
  //   type: MENU_FILTER,
  //   payload: filtrado,
  // });
};

export const editMenuCosto = (addMenu, method) => async (dispatch) => {
  dispatch({
    type: ADDALACUENTA_START,
    payload: method,
  });

  if (method === "Add") {
    addMenuRef.push(addMenu);

    dispatch({
      type: ADDALACUENTA_SUCCESS,
      payload: "Se creo correctamente",
    });
  } else if (method === "Delete") {
    dispatch({
      type: ADDALACUENTA_SUCCESS,
      payload: "Se borro correctamente",
    });
    addMenuEditRef(addMenu.id).remove();
  } else {
    dispatch({
      type: ADDALACUENTA_SUCCESS,
      payload: "Se edito correctamente",
    });
    addMenuEditRef(addMenu.id).set(addMenu);
  }
  dispatch({
    type: ADDALACUENTA_END,
  });
};
