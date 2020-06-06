import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

// Molecules
import ListaOrdenes from "../../Molecules/ProductCard/variants/ViewList";

import { verproductodetails } from "../../../store/agregaralaCuenta/actions";

import styles from "./styles";

const MenuList = () => {
  const classes = styles();
  const [viewVariant, setViewVariant] = React.useState("column");
  const dispatch = useDispatch();

  const arrayPedidos = useSelector(
    (state) => state.addcuenta.getListaPedidosPendientes
  );

  const [redireccionar, setredireccionar] = useState(false);
  const openModal = (item) => {
    console.log("=======================================================");
    console.log(item);
    console.log("=======================================================");
    dispatch(verproductodetails(item.static, item.dinamic, item.precio));
    setredireccionar(true);
  };
  let gridSize = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              LISTA PEDIDOS
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>

      {arrayPedidos.map((item, index) => (
        <Grid item {...gridSize} key={index}>
          <ListaOrdenes
            variant={viewVariant}
            products={item}
            openModal={openModal}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;
