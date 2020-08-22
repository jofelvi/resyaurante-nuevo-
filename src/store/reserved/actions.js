import { addMesasEditRef, addMesasRef } from "../../config/firebase";
import { RESERVED_START, RESERVED_END, RESERVED_FAIL, SET_RESERVED_SUCCESS } from "./Constants";

export const fecthReserved = () => (dispatch) => {
  dispatch({
    type: RESERVED_START,
  });
  addMesasRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();
      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });

      const reserved = arr.filter((item) => item.reserved);
      dispatch({
        type: SET_RESERVED_SUCCESS,
        payload: {
          reserved: reserved,
          reservedEdit: null,
        },
      });
    } else {
      dispatch({
        type: RESERVED_FAIL,
        payload: {
          error: true,
          msg: "No hay reservas registradas.",
          reserved: [],
        },
      });
    }
  });
  dispatch({
    type: RESERVED_END,
  });
};

export const editReserved = (table, method) => (dispatch) => {
  let msg = "";
  delete table.loading;

  dispatch({
    type: RESERVED_START,
  });

  if (method === "Add") {
    table["id"] = table.tableId;
    delete table.method;
    delete table.tableId;
    msg = "La reserva ha sido registrada correctamente.";
  } else if (method === "Delete") {
    const data = {
      reserved: false,
      enabled: true,
      timeEnd: "",
      timeInit: "",
      dateReserved: "",
      codeReserved: "",
    };
    table = { ...table, ...data };
  } else {
    delete table.method;
    delete table.tableId;
    msg = "La reserva ha sido actualizada correctamente.";
  }

  dispatch({
    type: SET_RESERVED_SUCCESS,
    payload: { msg },
  });

  addMesasEditRef(table.id).set(table);

  dispatch({
    type: RESERVED_END,
  });
};

export const getReserved = (table) => (dispatch) => {
  dispatch({
    type: RESERVED_START,
  });
  addMesasEditRef(table.id).on("value", (snapshot) => {
    if (snapshot.val()) {
      let data = snapshot.val();
      data["id"] = table.id;
      data["method"] = "Editar";
      data["tableId"] = table.numberTable;
      dispatch({
        type: SET_RESERVED_SUCCESS,
        payload: {
          reservedEdit: data,
        },
      });
    } else {
      dispatch({
        type: RESERVED_FAIL,
        payload: {
          error: true,
          msg: "Problema al consultar la reserva",
          reserved: [],
        },
      });
    }
    dispatch({
      type: RESERVED_END,
    });
  });
};
