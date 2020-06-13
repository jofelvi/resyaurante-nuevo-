import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid } from "@material-ui/core";

// Molecules
import ListaOrdenes from "../../Molecules/ProductCard/variants/ViewList";

import { verproductodetails } from "../../../store/agregaralaCuenta/actions";

const MenuList = () => {
  const dispatch = useDispatch();
  const arrayPedidos = useSelector(
    (state) => state.addcuenta.getListaPedidosPendientes
  );

  const [redireccionar, setredireccionar] = useState(false);
  const openModal = (item) => {
    dispatch(
      verproductodetails(item.static, item.dinamic, item.precio, item.id)
    );
    setredireccionar(true);
  };
  let gridSize = {
    xs: 6,
    sm: 4,
    md: 4,
    lg: 3,
    xl: 3,
  };
  return (
    <Grid container spacing={2}>
      {arrayPedidos.map((item, index) => (
        <Grid item {...gridSize} key={index}>
          <ListaOrdenes
            variant={"column"}
            products={item}
            openModal={openModal}
          />
        </Grid>
      ))}

      {redireccionar ? (
        <Redirect
          to={{
            pathname: "/pedidos",
          }}
        />
      ) : (
        ""
      )}
    </Grid>
  );
};

export default MenuList;
