import { sectorsEditRef, sectorsRef } from "../../config/firebase";
import { SECTOR_START, SECTOR_END, SECTOR_FAIL, SET_SECTOR_SUCCESS } from "./Constants";

export const fecthSectors = () => (dispatch) => {
  dispatch({
    type: SECTOR_START,
  });
  sectorsRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: SET_SECTOR_SUCCESS,
        payload: {
          sectors: arr,
          sectorEdit: null,
        },
      });
    } else {
      dispatch({
        type: SECTOR_FAIL,
        payload: {
          error: true,
          msg: "No hay sectores disponibles",
          sectors: [],
        },
      });
    }
  });
  dispatch({
    type: SECTOR_END,
  });
};

export const editSector = (sector, method) => async (dispatch) => {
  dispatch({
    type: SECTOR_START,
  });

  if (method === "Add") {
    delete sector.loading;
    delete sector.sectorEdit;
    delete sector.method;
    sectorsRef.push(sector);
    dispatch({
      type: SET_SECTOR_SUCCESS,
      payload: { msg: "Se creo correctamente el sector." },
    });
  } else if (method === "Delete") {
    dispatch({
      type: SET_SECTOR_SUCCESS,
      payload: { msg: "El sector ha sido eliminado correctamente." },
    });
    sectorsEditRef(sector.id).remove();
  } else {
    delete sector.loading;
    delete sector.method;
    dispatch({
      type: SET_SECTOR_SUCCESS,
      payload: { msg: "El sector ha sido actualizado correctamente." },
    });
    sectorsEditRef(sector.id).set(sector);
  }
  dispatch({
    type: SECTOR_END,
  });
};

export const getSector = (sector) => (dispatch) => {
  dispatch({
    type: SECTOR_START,
  });
  sectorsEditRef(sector.id).on("value", (snapshot) => {
    if (snapshot.val()) {
      let data = snapshot.val();
      data["id"] = sector.id;
      data["method"] = "Editar";
      dispatch({
        type: SET_SECTOR_SUCCESS,
        payload: {
          sectorEdit: data,
        },
      });
    } else {
      dispatch({
        type: SECTOR_FAIL,
        payload: {
          error: true,
          msg: "Problema al consultar el sector",
          sectors: [],
        },
      });
    }
    dispatch({
      type: SECTOR_END,
    });
  });
};
