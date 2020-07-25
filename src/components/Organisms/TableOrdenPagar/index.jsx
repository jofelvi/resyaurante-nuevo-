import React from "react";

import "@sandstreamdev/react-swipeable-list/dist/styles.css";

import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Material UI
import { Typography, Button } from "@material-ui/core";
import styles from "./styles";
import { addProductosParaPagar } from "../../../store/cobrarPedidos/actions";

const AllTables = () => {
  const classes = styles();
  const dispatch = useDispatch();

  const listaPorPagar = useSelector((state) => state.listaPorPagar);

  const prepararParaPagar = (item) => {
    let productosEnList = listaPorPagar.listaPedidosPorPagar.filter(
      (produc) => produc.id === item.id
    );
    if (productosEnList.length === 0) {
      let listado = [...listaPorPagar.listaPedidosPorPagar, item];
      dispatch(addProductosParaPagar(listado));
    }
  };

  return (
    <div className={classes.root}>
      <div
        className={`${classes.header} d-flex justify-content-start align-items-center`}
      >
        <Typography variant="subtitle2" color="primary">
          Lista de Productos
        </Typography>
      </div>
      <div>
        {listaPorPagar.listaProducts.map((item, index) => {
          if (item.estado === "pendiente") {
            return (
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#f5f8fa",
                }}
                className="d-flex justify-content-between py-2"
                onClick={() => prepararParaPagar(item)}
              >
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.cantidad} x {item.nombre}
                </Typography>
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.precioUnitario}
                </Typography>
              </Button>
            );
          }
        })}
        <div className="pt-2">
          {listaPorPagar.listaProducts.map((item, index) => {
            if (item.estado === "pagado") {
              return (
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "#f5f8fa",
                  }}
                  className="d-flex justify-content-between py-2 "
                >
                  <Typography variant="body1" color="textPrimary" align="left">
                    <CheckCircleIcon style={{ color: "rgba(29, 139, 5, 1)" }} />{" "}
                    {item.cantidad} x {item.nombre}
                  </Typography>
                  <Typography variant="body1" color="textPrimary" align="left">
                    {item.precioUnitario}
                  </Typography>
                </Button>
              );
            }
          })}
        </div>

        <div className="d-flex justify-content-between border-bottom border-top mx-2">
          <div className=" py-2 d-flex flex-column align-items-center">
            <p className="p-0 m-0">Pagado:</p>
            <p className="p-0 m-0 text-success">
              {`$ ${listaPorPagar.productsPagados}`}
            </p>
          </div>
          <div className=" py-2 d-flex flex-column align-items-center">
            <p className="p-0 m-0">Restante:</p>
            <p className="p-0 m-0 text-danger">{`$ ${
              listaPorPagar.productsCuenta > listaPorPagar.productsPagados
                ? listaPorPagar.productsCuenta - listaPorPagar.productsPagados
                : listaPorPagar.productsPagados - listaPorPagar.productsCuenta
            }`}</p>
          </div>
        </div>
        <div
          className={`${classes.header} d-flex justify-content-between border-bottom py-1`}
        >
          <Typography variant="subtitle2" color="primary">
            Total
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {`$ ${listaPorPagar.productsCuenta}`}
          </Typography>
        </div>
      </div>
      {/* 
      {listaPorPagar.productsPagados === listaPorPagar.productsCuenta ? (
        <Redirect
          to={{
            pathname: "/pedidos",
          }}
        />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default AllTables;
