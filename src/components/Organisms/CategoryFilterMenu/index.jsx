import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { editcategorieMenu } from "../../../store/Categories/actions";
import { filterMenu } from "../../../store/AgregarMenu/actions";
import { Tooltip, Button } from "@material-ui/core";
import styles from "./styles";

const AllTables = ({ data, posicion }) => {
  const classes = styles();

  const dispatch = useDispatch();
  const productosAllmenu = useSelector((state) => state.addmenu.addmenu);
  const productosIngredientes = useSelector((state) => state.products.products);

  const filterIngredientes = productosIngredientes.filter(
    (item) =>
      item.categories === "Bebidas" ||
      item.categories === "Postres" ||
      item.categories === "Extras"
  );
  const productosAll = [...filterIngredientes, ...productosAllmenu];

  const [filterFil, setFilterFil] = useState({
    productosAllFilter: "All",
    checked: false,
  });
  useEffect(() => {
    dispatch(filterMenu(productosAll, filterFil.productosAllFilter));
  });

  const [newCategoria, setNuevaCategoria] = useState({
    agregar: false,
    nombreCategoria: "",
    alertError: "",
    msjalertError: "",
    alertSuccess: "",
  });

  const crearAlertaExito = (msj) => {
    setNuevaCategoria({
      ...newCategoria,
      alertSuccess: msj,
    });

    setTimeout(() => {
      setNuevaCategoria({
        ...newCategoria,
        alertSuccess: "",
        agregar: false,
      });
    }, 2500);
  };

  const addCategorie = (e) => {
    const { nombreCategoria } = newCategoria;

    if (nombreCategoria === "") {
      return;
    }
    dispatch(editcategorieMenu({ nombre: nombreCategoria }, "Add"));
    crearAlertaExito("Se a creado la categoria con exito");
  };

  return (
    <div className={classes.root}>
      <div className={classes.filtersContainer}>
        <Tooltip title="Todos" arrow="true" placement="right">
          <Button
            className="my-2"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            onClick={() => {
              setFilterFil({
                productosAllFilter: "All",
              });
            }}
          >
            <img
              src={require("../../../assets/images/restaurant.png")}
              alt="Todos"
              style={{ width: 60, height: 60, textAlign: "center" }}
            />
          </Button>
        </Tooltip>

        {data.map((item, index) => (
          <Tooltip
            title={item.nombre}
            key={index}
            arrow="true"
            placement="right"
          >
            <Button
              key={index}
              className="my-2"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              onClick={() => {
                setFilterFil({
                  productosAllFilter: item.nombre,
                });
              }}
            >
              <img
                src={item.img}
                alt={item.nombre}
                style={{ width: 60, height: 60, textAlign: "center" }}
              />
            </Button>
          </Tooltip>
        ))}
      </div>
      {newCategoria.alertSuccess ? (
        <div
          className={`alert alert-success text-center my-4 col-12`}
          role="alert"
        >
          {newCategoria.alertSuccess}
        </div>
      ) : (
          ""
        )}

      <Dialog
        onClose={() => {
          setNuevaCategoria({ ...newCategoria, agregar: false });
        }}
        aria-labelledby="simple-dialog-title"
        open={newCategoria.agregar}
      >
        <DialogTitle id="simple-dialog-title">
          Agregar Nueva Categoria
        </DialogTitle>
        <List>
          <div className="form-group col-md-12 d-flex flex-column">
            <label for="inputZip">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="Nombre"
              onChange={(e) => {
                return setNuevaCategoria({
                  ...newCategoria,
                  nombreCategoria: e.target.value,
                });
              }}
            />
          </div>
          <div className="d-flex justify-content-center my-3 mr-2">
            <button
              onClick={() => addCategorie()}
              className="btn btn-success btn-sm"
            >
              Agregar
            </button>
          </div>
        </List>
      </Dialog>

      {!newCategoria.agregar && posicion ? (
        <div className="d-flex justify-content-center my-3 mr-2">

        </div>
      ) : (
          ""
        )}
    </div>
  );
};

export default AllTables;
