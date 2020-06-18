import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { editcategorie } from "../../../store/Categories/actions";
import { filterProducts } from "../../../store/Products/actions";

import { Tooltip, Button } from "@material-ui/core";

import styles from "./styles";

const AllTables = ({ data, posicion }) => {
  const classes = styles();

  const dispatch = useDispatch();
  const productosAll = useSelector((state) => state.products.products);

  const [filterFil, setFilterFil] = useState({
    productosAllFilter: "All",
    checked: false,
  });
  useEffect(() => {
    dispatch(filterProducts(productosAll, filterFil.productosAllFilter));
  });

  // const [state, setState] = React.useState({
  //   checkedA: false,
  //   happy: false,
  // });

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

  // const handleChange = (name) => (event) => {
  //   setState({ ...state, [name]: event.target.checked });
  // };

  const addCategorie = (e) => {
    // e.preventDefault();

    const { nombreCategoria } = newCategoria;

    if (nombreCategoria === "") {
      return;
    }
    dispatch(editcategorie({ nombre: nombreCategoria }, "Add"));
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
        <div className="d-flex justify-content-center my-3">
          <button
            onClick={() =>
              setNuevaCategoria({
                ...newCategoria,
                agregar: true,
              })
            }
            className="btn btn-primary btn-sm"
          >
            Nueva
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AllTables;
