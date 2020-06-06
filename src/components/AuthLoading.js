import React, { useEffect } from "react";
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";

//action
import { getProduct } from "../store/Products/actions";
import { getCategories, getCategoriesMenu } from "../store/Categories/actions";
import { getAddMenu } from "../store/AgregarMenu/actions";
import { getListaPedidos } from "../store/agregaralaCuenta/actions";

function AuthLoading(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // if (auth.info) {
    dispatch(getProduct());
    dispatch(getCategories());
    dispatch(getCategoriesMenu());
    dispatch(getAddMenu());
    dispatch(getListaPedidos());
    // }
  }, [auth.info, dispatch]);

  return auth.loading ? <CircularLoading /> : props.children;
}

export default AuthLoading;
