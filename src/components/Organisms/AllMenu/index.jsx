import React, { useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

// Icons
import { ViewList, ViewStream, ViewColumn } from "@material-ui/icons";

// Atoms
import { FabButton } from "../../Atoms";

// Molecules
import { ProductCard } from "../../Molecules";

import { editAddMenu } from "../../../store/AgregarMenu/actions";

import styles from "./styles";

const MenuList = () => {
  const classes = styles();
  const [viewVariant, setViewVariant] = React.useState("column");
  const dispatch = useDispatch();

  const dataProducts = useSelector((state) => state.addmenu.addmenu);
  const data = Object.keys(dataProducts).map((i) => {
    console.log(dataProducts[i]);
    dataProducts[i].id = i;

    // dataProducts[i].precioUnitario = precioFinal(dataProducts[i]);
    // console.log(precioFinal(dataProducts[i]));
    return dataProducts[i];
  });
  // const precioFinal = (products) => {
  //   const productop = products.products;
  //   const precio = productop.map((item) => {
  //     const sm = item.sm ? item.sm : 0;
  //     const md = item.md ? item.md : 0;
  //     const lg = item.lg ? item.lg : 0;
  //     const preciounitario = item.precioUnitario ? item.precioUnitario : 0;

  //     return preciounitario;
  //   });
  //   return precio;
  // };

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

  if (viewVariant === "list") {
    gridSize = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    };
  }
  if (viewVariant === "row") {
    gridSize = {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 3,
    };
  }
  if (viewVariant === "column") {
    gridSize = {
      xs: 12,
      sm: 6,
      md: 3,
      lg: 3,
      xl: 2,
    };
  }

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
    // console.log("===============================================");
    // console.log(arrayMenu);
    // console.log(nuevoArray);
    // console.log("===============================================");
    setArrayMenu(nuevoArray);
  };

  // const data = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              LISTA MENU
            </Typography>
            <div>
              <Tooltip title="Lista" aria-label="Lista">
                <IconButton
                  color={viewVariant === "list" ? "primary" : "default"}
                  onClick={changeView("list")}
                >
                  <ViewList />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filas" aria-label="Filas">
                <IconButton
                  color={viewVariant === "row" ? "primary" : "default"}
                  onClick={changeView("row")}
                >
                  <ViewStream />
                </IconButton>
              </Tooltip>
              <Tooltip title="Columnas" aria-label="Columnas">
                <IconButton
                  color={viewVariant === "column" ? "primary" : "default"}
                  onClick={changeView("column")}
                >
                  <ViewColumn />
                </IconButton>
              </Tooltip>
            </div>
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

      {data.map((item, index) => (
        <Grid
          item
          {...gridSize}
          key={index}
          onClick={() => (nombreCategore.agregar ? menuarray(item) : "")}
        >
          <ProductCard variant={viewVariant} products={item} />
        </Grid>
      ))}
      <FabButton color="primary" label="addProduct" addmenu={addmenu} />
    </Grid>
  );
};

export default MenuList;