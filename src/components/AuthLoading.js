import React, { useEffect } from "react";
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";

//action
import { getProduct } from "../store/Products/actions";
import { getCategories } from "../store/Categories/actions";

function AuthLoading(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // if (auth.info) {
    dispatch(getProduct());
    dispatch(getCategories());
    // }
  }, [auth.info, dispatch]);

  return auth.loading ? <CircularLoading /> : props.children;
}

export default AuthLoading;
