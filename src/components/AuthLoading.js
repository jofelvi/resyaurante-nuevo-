import React, { useEffect } from "react";
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";

//action
import { getProduct } from "../store/Products/actions";
import { getCategories, getCategoriesMenu } from "../store/Categories/actions";
import { getAddMenu } from "../store/AgregarMenu/actions";
import { getListaPedidos } from "../store/agregaralaCuenta/actions";
import { fetchuserlogin, fecthUsers } from "../store/auth/actions";
import { fecthClients, fecthMesas } from "../store/Clients/actions";
import { fecthTables } from "../store/Table/actions";
import { fecthSectors } from "../store/sectors/actions";
import { getReports } from "../store/reportes/actions";
import { fecthReserved } from "../store/reserved/actions";

function AuthLoading(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userlocalstorage = localStorage.getItem("user");

  useEffect(() => {
    if (auth.info !== "") {
      dispatch(getProduct());
      dispatch(getCategories());
      dispatch(getCategoriesMenu());
      dispatch(getAddMenu());
      dispatch(getListaPedidos());
      dispatch(fecthClients());
      dispatch(fecthMesas());
      dispatch(fecthTables());
      dispatch(getReports());
      dispatch(fecthUsers());
      dispatch(fecthSectors());
      dispatch(fecthReserved());
    } else if (auth.info === "") {
      dispatch(fetchuserlogin(JSON.parse(userlocalstorage)));
    }
  }, [auth.info, dispatch]);

  return auth.loading ? <CircularLoading /> : props.children;
}

export default AuthLoading;
