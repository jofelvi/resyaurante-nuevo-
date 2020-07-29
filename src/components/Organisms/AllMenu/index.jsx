import React, { useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid } from "@material-ui/core";

import { ModalScreenEstatico, ModalScreenDinamico } from "../../Molecules";

// Molecules

import ProductoCardRow from "../../Molecules/ProductCard/variants/ViewColumn";

import { editAddMenu } from "../../../store/AgregarMenu/actions";

const MenuList = () => {
  const dispatch = useDispatch();

  const dataProducts = useSelector((state) => state.addmenu.menufilter);
  const data = Object.keys(dataProducts).map((i) => {
    // console.log(dataProducts[i]);
    dataProducts[i].id = i;

    return dataProducts[i];
  });

  const [open, setOpen] = React.useState(false);
  const [openProducto, setopenProducto] = useState({
    open: false,
    menuItem: "",
  });

  const handleClose = () => {
    setOpen(false);
    setopenProducto(false);
  };
  const openMenuProduct = (menu) => {
    setopenProducto({
      ...openProducto,
      open: true,
      menuItem: menu,
    });
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
    sm: 4,
    md: 3,
    lg: 2,
    xl: 2,
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
    const nuevoArray = arrayMenu.filter((item) => item.id !== producto.id);

    setArrayMenu(nuevoArray);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="col-12 ">
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
          onClick={() => openMenuProduct(item)}
        >
          <ProductoCardRow variant={"column"} products={item} />
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
      <ModalScreenDinamico openModal={open} handleClose={handleClose} />
    </Grid>
  );
};

export default MenuList;
