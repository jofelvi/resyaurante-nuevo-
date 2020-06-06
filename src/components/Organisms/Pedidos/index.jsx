import React, { useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

import { ModalScreenEstatico, ModalScreenDinamico } from "../../Molecules";

// Atoms
import { FabButton } from "../../Atoms";

// Molecules

import ProductoCardRow from "../../Molecules/ProductCard/variants/ViewColumn";

import { editAddMenu } from "../../../store/AgregarMenu/actions";
import { addProductosCosto } from "../../../store/agregaralaCuenta/actions";

import styles from "./styles";

const MenuList = () => {
  const classes = styles();
  const [viewVariant, setViewVariant] = React.useState("column");
  const dispatch = useDispatch();
  const costosAddCuenta = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const listaProducts = useSelector((state) => state.addcuenta.listaProducts);

  const dataProducts = useSelector((state) => state.addmenu.menufilter);
  const data = Object.keys(dataProducts).map((i) => {
    // console.log(dataProducts[i]);
    dataProducts[i].id = i;

    return dataProducts[i];
  });

  const [tipoPedido, settipoPedido] = useState({
    estatico: true,
    dinamico: false,
  });

  const [open, setOpen] = React.useState(false);
  const [openProducto, setopenProducto] = useState({
    open: false,
    menuItem: "",
  });

  const handleClickOpen = (opcion) => {
    settipoPedido({
      estatico: true,
      dinamico: true,
    });
  };

  // ===============================================
  // logica de los modales
  // ===============================================

  const [modalMostar, setmodalMostar] = useState({
    modal: "",
    open: false,
  });

  const mostrandoModal = (tipo) => {
    setmodalMostar({
      modal: "",
      open: false,
    });
    setTimeout(() => {
      setmodalMostar({
        modal: tipo,
        open: true,
      });
    }, 300);
  };
  // ===============================================
  // end logica de los modales
  // ===============================================

  const handleClose = () => {
    setOpen(false);
    setopenProducto({ ...openProducto, open: false, menuItem: "" });
    settipoPedido({
      estatico: true,
      dinamico: false,
    });
    setmodalMostar({
      modal: "",
      open: false,
    });
  };
  const openMenuProduct = (menu) => {
    if (menu.products) {
      setopenProducto({
        ...openProducto,
        open: true,
        menuItem: menu,
      });
    } else {
      siguientesProd(menu);
    }
  };

  const siguientesProd = (prod) => {
    const menuNuevo = {
      precioUnitario: prod.precioUnitario ? prod.precioUnitario : prod.precio,
      categories: prod.categories,
      nombre: prod.nombre,
    };
    const productoslista = [...listaProducts, menuNuevo];

    dispatch(addProductosCosto(productoslista, costosAddCuenta, menuNuevo));
  };

  const [arrayMenu, setArrayMenu] = useState([]);
  const [nombreCategore, setNombreCategore] = useState({
    nombre: "",
    agregar: false,
    alertSuccess: "",
    colorAlert: "",
  });

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    xl: 2,
  };

  const changeView = (variant) => () => {
    setViewVariant(variant);
  };

  const menuarray = (producto) => {
    setArrayMenu([...arrayMenu, producto]);
  };
  const addmenu = () => {
    return setNombreCategore({
      ...nombreCategore,
      agregar: true,
    });
  };
  const addmenubd = () => {
    if (nombreCategore.nombre === "" || arrayMenu.length < 2) {
      setNombreCategore({
        ...nombreCategore,
        alertSuccess:
          "Debe tener al menos 2 productos seleccionados y un Nombre",
        colorAlert: "alert-danger",
      });
      setTimeout(() => {
        setNombreCategore({
          ...nombreCategore,
          alertSuccess: "",
          colorAlert: "",
        });
      }, 2500);
      return;
    }

    const menuListo = {
      nombre: nombreCategore.nombre,
      products: arrayMenu,
    };
    dispatch(editAddMenu(menuListo, "Add"));

    setArrayMenu([]);

    setNombreCategore({
      ...nombreCategore,
      alertSuccess: "Se creo el menu correctamente",
      colorAlert: "alert-success",
    });
    setTimeout(() => {
      setNombreCategore({
        ...nombreCategore,
        alertSuccess: "",
        colorAlert: "",
        agregar: false,
      });
    }, 2500);
  };

  const eliminarItemArray = (producto) => {
    console.log("eliminar productos:  ", producto);
    const nuevoArray = arrayMenu.filter((item) => item.id !== producto.id);

    setArrayMenu(nuevoArray);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              LISTA MENU
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="col-12 mt-3">
          {nombreCategore.alertSuccess ? (
            <div
              className={`alert ${nombreCategore.colorAlert} text-center my-4 col-12`}
              role="alert"
            >
              {nombreCategore.alertSuccess}
            </div>
          ) : (
            ""
          )}

          {nombreCategore.agregar ? (
            <Fragment>
              <div className="form-group col-md-6 mb-3">
                <label for="inputZip">Nombre para el menu</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Nombre"
                  onChange={(e) => {
                    return setNombreCategore({
                      ...nombreCategore,
                      nombre: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="d-flex justify-content-end my-3 mr-2 col-md-6">
                <button
                  onClick={() => {
                    setNombreCategore({
                      nombre: "",
                      agregar: false,
                      alertSuccess: "",
                    });
                    setArrayMenu([]);
                  }}
                  className="btn btn-danger btn-sm mr-3"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => addmenubd()}
                  className="btn btn-success btn-sm"
                >
                  Agregar al menu
                </button>
              </div>
            </Fragment>
          ) : (
            ""
          )}

          {arrayMenu.map((producto) => {
            return (
              <div
                key={producto.id}
                className="btn btn-sm bg-info m-1"
                onClick={() => eliminarItemArray(producto)}
              >
                <p className="m-0 p-0 text-white">{`${producto.nombre}  X`}</p>
              </div>
            );
          })}
        </div>
      </Grid>

      <Grid item {...gridSize} onClick={() => handleClickOpen()}>
        <ProductoCardRow
          variant={viewVariant}
          products={{
            nombre: "Crear tu Bowl",
            precioUnitario: "9,50",
            descripcion: "Crea tu Bowl con los ingredientes que mas gustes",
          }}
        />
      </Grid>
      {data.map((item, index) => (
        <Grid
          item
          {...gridSize}
          key={index}
          onClick={() => (tipoPedido.estatico ? openMenuProduct(item) : "")}
        >
          <ProductoCardRow variant={viewVariant} products={item} />
        </Grid>
      ))}
      {openProducto.menuItem ? (
        <ModalScreenEstatico
          openModal={openProducto.open}
          handleClose={handleClose}
          menuItem={openProducto.menuItem}
        />
      ) : (
        ""
      )}

      <ModalScreenDinamico
        openModal={tipoPedido.dinamico}
        handleClose={handleClose}
        mostrandoModal={mostrandoModal}
      />
    </Grid>
  );
};

export default MenuList;
