import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  SwipeableListItem,
  SwipeableList,
} from "@sandstreamdev/react-swipeable-list";

import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { useDispatch, useSelector } from "react-redux";
import { ExpandMore, Payment, EuroSymbol } from "@material-ui/icons";

// Material UI
import { Typography, Button } from "@material-ui/core";
import {
  addListaPedidosPendientes,
  eliminarListaProductos,
} from "../../../store/agregaralaCuenta/actions";

import { addProductosCosto } from "../../../store/cobrarPedidos/actions";
import styles from "./styles";

import ModalScreenProducto from "../../Molecules/ModalScreenProdcuto";
import MenuOptionsPedidos from "../../Molecules/MenuOptionsPedidos";

const AllTables = ({ history }) => {
  const classes = styles();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [methodPayment, setmethodPayment] = useState("");
  const dispatch = useDispatch();
  let productosAll = useSelector((state) => state.addcuenta.listaProducts);

  if (!productosAll) {
    productosAll = [];
  }

  let productosDinamicosPedido = useSelector(
    (state) => state.addcuenta.menudinamicoorden
  );
  if (!productosDinamicosPedido) {
    productosDinamicosPedido = [];
  }
  const precioAcumulado = useSelector(
    (state) => state.addcuenta.productsCuenta
  );

  const detailspedidos = useSelector((state) => state.addcuenta.detailspedido);
  const idDetailsOrden = useSelector((state) => state.addcuenta.idDetailsOrden);
  const [alertPedido, setalertPedido] = useState({
    alertSuccess: "",
  });
  const recibirOrden = useSelector((state) => state.addcuenta.recibirOrden);
  const productosAllPedido = [...productosAll, ...productosDinamicosPedido];

  const eliminarProductolist = (prod) => {
    if (prod.bases) {
      const nuevoArrayDinamico = productosDinamicosPedido.filter(
        (item) => item.nombre !== prod.nombre
      );

      const arrayall = [...nuevoArrayDinamico, ...productosAll];

      let total = 0;
      for (const key in arrayall) {
        total += arrayall[key].precioUnitario
          ? Number(arrayall[key].precioUnitario)
          : 0;
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosAll,
          nuevoArrayDinamico,
          "dinamico",
          total
        )
      );
    } else {
      const nuevoArray = productosAll.filter(
        (item) => item.nombre !== prod.nombre
      );

      const arrayall = [...nuevoArray, ...productosDinamicosPedido];

      let total = 0;
      for (const key in arrayall) {
        total += Number(arrayall[key].precioUnitario);
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosDinamicosPedido,
          nuevoArray,
          "estatico",
          total
        )
      );
    }
  };

  const editarPedido = (e, method) => {
    if (productosAllPedido.length === 0) {
      setalertPedido({
        alertSuccess: "Debe haber un producto agregado",
      });

      setTimeout(() => {
        setalertPedido({
          alertSuccess: "",
        });
      }, 2500);
      return;
    }

    // if (recibirOrden === "") {
    //   setalertPedido({
    //     alertSuccess: "Debe asignar la orden a una persona",
    //   });

    //   setTimeout(() => {
    //     setalertPedido({
    //       alertSuccess: "",
    //     });
    //   }, 2500);
    //   return;
    // }

    if (e === "agregar") {
      const hora = new Date();
      const pedido = {
        status: method,
        para: recibirOrden,
        static: productosAll,
        dinamic: productosDinamicosPedido,
        precio: precioAcumulado,
        method: methodPayment,
        tiempoinicial:
          hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds(),
      };

      dispatch(addListaPedidosPendientes(pedido, "add"));
    } else if (e === "editar") {
      const hora = new Date();
      const pedido = {
        status: method,
        static: productosAll,
        para: recibirOrden,
        dinamic: productosDinamicosPedido,
        precio: precioAcumulado,
        method: methodPayment,
        id: idDetailsOrden,
        tiempoinicial:
          hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds(),
      };

      dispatch(addListaPedidosPendientes(pedido, "editar"));
    } else if (e === "cancelar") {
      const pedido = {
        id: idDetailsOrden,
      };

      dispatch(addListaPedidosPendientes(pedido, "eliminar"));
    }
  };

  const [openProducto, setopenProducto] = useState({
    open: false,
    menuItem: "",
  });

  const handleClose = (prod) => {
    if (prod.bases) {
      const nuevoArrayDinamico = productosDinamicosPedido.filter(
        (item) => item.nombre !== prod.nombre
      );
      nuevoArrayDinamico.push(prod);

      const arrayall = [...nuevoArrayDinamico, ...productosAll];

      let total = 0;

      for (const key in arrayall) {
        let cantidad = arrayall[key].cantidad
          ? Number(arrayall[key].cantidad)
          : 1;

        total += Number(arrayall[key].precioUnitario) * cantidad;
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosAll,
          nuevoArrayDinamico,
          "dinamico",
          total
        )
      );
    } else {
      const nuevoArray = productosAll.filter(
        (item) => item.nombre !== prod.nombre
      );
      nuevoArray.push(prod);

      const arrayall = [...nuevoArray, ...productosDinamicosPedido];

      let total = 0;

      for (const key in arrayall) {
        let cantidad = arrayall[key].cantidad
          ? Number(arrayall[key].cantidad)
          : 1;

        total += Number(arrayall[key].precioUnitario) * cantidad;
        console.log(total);
      }

      dispatch(
        eliminarListaProductos(
          productosDinamicosPedido,
          nuevoArray,
          "estatico",
          total
        )
      );
    }

    setopenProducto({
      open: false,
    });
  };

  const [redireccionar, setredireccionar] = useState(false);
  const cobrarOrden = () => {
    if (productosAllPedido.length > 0) {
      dispatch(addProductosCosto(productosAllPedido));
      setredireccionar(true);
    }
  };

  return (
    <div className={classes.root}>
      <div
        className={`${classes.header} d-flex justify-content-between align-items-center`}
      >
        <Typography variant="subtitle2" color="primary">
          Lista de Productos
        </Typography>
        <Button
          onClick={handleChange}
          style={{
            color: "#1e3a56",
            padding: 0,
            margin: 0,
          }}
          className="d-flex justify-content-center"
        >
          <ExpandMore />
        </Button>
      </div>
      <div>
        {alertPedido.alertSuccess !== "" ? (
          <div
            className={`alert alert-danger text-center my-4 col-12`}
            role="alert"
          >
            {alertPedido.alertSuccess}
          </div>
        ) : (
          ""
        )}

        <MenuOptionsPedidos checked={checked} />

        {productosAllPedido.map((item, index) => {
          return (
            <SwipeableList key={index}>
              <SwipeableListItem
                swipeLeft={{
                  content: (
                    <div
                      style={{ height: 40, color: "#fff", fontSize: 16 }}
                      className="bg-danger col-12  d-flex justify-content-end align-items-center "
                    >
                      <DeleteForeverIcon />
                    </div>
                  ),
                  action: () => eliminarProductolist(item),
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "#f5f8fa",
                  }}
                  className="py-2 d-flex justify-content-between col-12 px-1 m-0"
                  onClick={() =>
                    setopenProducto({ menuItem: item, open: true })
                  }
                >
                  <div className="d-flex">
                    <div
                      style={{
                        width: 22,
                        height: 24,
                        background: "rgba(29, 139, 5, 1)",
                        borderRadius: 5,
                        marginRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                      }}
                      className="p-0"
                    >
                      {item.cantidad}
                    </div>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      align="left"
                    >
                      {item.nombre}
                    </Typography>
                  </div>
                  <Typography variant="body1" color="textPrimary" align="left">
                    {item.precioUnitario}
                  </Typography>
                </Button>
              </SwipeableListItem>
            </SwipeableList>
          );
        })}
        <div
          className={`${classes.header} d-flex justify-content-between border-bottom py-1`}
        >
          <Typography variant="subtitle2" color="primary">
            Total
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {`$ ${precioAcumulado}`}
          </Typography>
        </div>
      </div>

      <ModalScreenProducto
        openModal={openProducto.open}
        handleClose={handleClose}
        menuItem={openProducto.menuItem}
      />

      <Fragment>
        <div className="d-flex justify-content-between border-bottom mx-2">
          <button
            onClick={() =>
              setmethodPayment(methodPayment === "efectivo" ? "" : "efectivo")
            }
            className="btn py-1 d-flex flex-column align-items-center"
            style={{
              background: methodPayment === "efectivo" ? "#1e3a56" : "",
              color: methodPayment === "efectivo" ? "#fff" : "#1e3a56",
            }}
          >
            <EuroSymbol />
            Efectivo
          </button>
          <button
            onClick={() =>
              setmethodPayment(
                methodPayment === "tarjeta de credito"
                  ? ""
                  : "tarjeta de credito"
              )
            }
            className="btn py-1 px-0 d-flex flex-column align-items-center"
            style={{
              background:
                methodPayment === "tarjeta de credito" ? "#1e3a56" : "",
              color:
                methodPayment === "tarjeta de credito" ? "#fff" : "#1e3a56",
            }}
          >
            <Payment />
            Tarjeta de credito
          </button>
        </div>
        <div className="mx-2 d-flex justify-content-center col-12">
          {detailspedidos ? (
            <button
              onClick={() => editarPedido("editar", "pendiente")}
              className="btn py-3 text-success col-12"
            >
              Enviar
            </button>
          ) : methodPayment === "" ? (
            <button
              onClick={() => cobrarOrden()}
              className="btn py-3 text-primary col-12"
            >
              Cobrar en Caja
            </button>
          ) : (
            <button
              onClick={() => editarPedido("agregar", "pagado")}
              className="btn py-3 text-success col-12"
            >
              Cobrar y Enviar
            </button>
          )}
        </div>
      </Fragment>

      {redireccionar ? (
        <Redirect
          to={{
            pathname: "/calcular-pago",
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AllTables;
