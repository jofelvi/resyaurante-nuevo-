import React, { useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Card, Typography, Button } from "@material-ui/core";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import { editcategorie } from "../../../store/Categories/actions";

import styles from "./styles";

const AllTables = ({ data }) => {
  const classes = styles();

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    checkedA: false,
    happy: false,
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

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

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
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle2" color="primary">
          FILTRAR POR
        </Typography>
        <Button className={classes.headerButtonReset}>Limpiar</Button>
      </div>
      <div className={classes.filtersContainer}>
        {data.map((item, index) => (
          <FormControlLabel
            classes={{
              root: classes.formControlLabel,
            }}
            key={index}
            control={
              <Checkbox
                checked={state[item.label] ? state[item.label] : false}
                onChange={handleChange(item.label)}
                value={item.label}
                color="primary"
              />
            }
            label={
              <div className={classes.filterOption}>
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.nombre}
                </Typography>
                <Typography variant="body1" color="textPrimary" align="left">
                  {index}
                </Typography>
              </div>
            }
          />
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

      {newCategoria.agregar ? (
        <Fragment>
          <div className="form-group col-md-12">
            <label for="inputZip">Nombre de la Categoria</label>
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
          <div className="d-flex justify-content-end my-3 mr-2">
            <button onClick={() => addCategorie()} className="btn btn-success">
              Agregar Categoria
            </button>
          </div>
        </Fragment>
      ) : (
        ""
      )}

      {!newCategoria.agregar ? (
        <div className="d-flex justify-content-end my-3 mr-2">
          <button
            onClick={() =>
              setNuevaCategoria({
                ...newCategoria,
                agregar: true,
              })
            }
            className="btn btn-primary"
          >
            Nueva Categoria
          </button>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default AllTables;
