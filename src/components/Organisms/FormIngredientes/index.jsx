import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

import styles from "./styles";
import { editproducts } from "../../../store/Products/actions";

import TableProduct from "./table";

const FormIngredientes = () => {
  const classes = styles();
  const dataProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    alertError: "",
    msjalertError: "",
    alertSuccess: "",
    abrirProductoForm: false,
    nuevo: false,
    edit: false,
    editData: "",
  });

  const [nuevoProd, setNuevoProd] = useState({
    disponible: true,
    nombre: "",
    sm: "no disponible",
    md: "no disponible",
    lg: "no disponible",
  });

  const eliminarDatos = () => {
    setNuevoProd({
      disponible: "",
      nombre: "",
      sm: "",
      md: "",
      lg: "",
      id: "",
    });
  };
  const crearAlertaExito = (msj) => {
    setForm({
      ...form,
      alertSuccess: msj,
    });

    setTimeout(() => {
      setForm({
        ...form,
        alertSuccess: "",
        abrirProductoForm: false,
      });
    }, 2500);
  };

  const crearNuevoProducto = async (e) => {
    e.preventDefault();

    const { nombre } = nuevoProd;

    if (nombre === "") {
      setForm({
        ...form,
        alertError: "alert-danger",
        msjalertError: `El nombre no puede estar vacio`,
      });

      setTimeout(() => {
        setForm({
          ...form,
          alertError: "",
          msjalertError: "",
        });
      }, 2500);
      return;
    }
    await dispatch(editproducts(nuevoProd, "Add"));
    eliminarDatos();
    crearAlertaExito("Se a creado el producto con exito");
  };

  // =======eliminarServicio
  const eliminarProducts = (oldData) => {
    dispatch(editproducts(oldData, "Delete"));

    crearAlertaExito("Se a eliminado el producto con exito");
  };

  // ========editarServicio
  const editarProducts = (e) => {
    e.preventDefault();

    const { nombre } = nuevoProd;
    if (nombre === "") {
      setForm({
        ...form,
        alertError: "alert-danger",
        msjalertError: `El nombre no puede estar vacio`,
      });

      setTimeout(() => {
        setForm({
          ...form,
          alertError: "",
          msjalertError: "",
        });
      }, 2500);
      return;
    }
    dispatch(editproducts(nuevoProd, "Update"));
    eliminarDatos();
    crearAlertaExito("Se a editado el producto con exito");
  };
  const edit = (edit) => {
    setForm({
      ...form,
      abrirProductoForm: true,
      nuevo: false,
      edit: true,
      editData: edit,
    });

    setNuevoProd({
      ...nuevoProd,
      disponible: edit.disponible,
      nombre: edit.nombre,
      sm: edit.sm,
      md: edit.md,
      lg: edit.lg,
      id: edit.id,
    });
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <div className="d-flex justify-content-between col-12">
              <Typography variant="subtitle2" color="primary">
                Ingredientes
              </Typography>
              <button
                type="buttom"
                className="btn btn-success btn-sm ml-4"
                onClick={() => {
                  setForm({
                    ...form,
                    abrirProductoForm: true,
                    nuevo: true,
                    edit: false,
                  });
                }}
              >
                Nuevo Producto
              </button>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
      {form.alertSuccess ? (
        <div
          className={`alert alert-success text-center my-4 col-sm-8 col-md-10`}
          role="alert"
        >
          {form.alertSuccess}
        </div>
      ) : (
        ""
      )}
      {form.abrirProductoForm ? (
        <Grid item md={12}>
          <div className="row justify-content-center">
            <form
              className="my-4  col-md-6"
              onSubmit={
                form.nuevo === true ? crearNuevoProducto : editarProducts
              }
            >
              <div className="form-row justify-content-center">
                <div className="form-group col-10">
                  <label for="inputZip">Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Nombre"
                    defaultValue={form.editData ? form.editData.nombre : ""}
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        nombre: e.target.value,
                      });
                    }}
                  />
                </div>
                <h6 className="form-group mb-4 align-text-center col-10">
                  Precio del Producto - Presentacion :
                </h6>
                <div className="form-group col-10 d-flex aling-item-center">
                  <label for="inputZip">Pequeño:</label>
                  <input
                    type="text"
                    className="form-control col-8 ml-3"
                    id="inputZip"
                    placeholder="Precio"
                    defaultValue={form.editData ? form.editData.sm : ""}
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        sm: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-10 d-flex aling-item-center">
                  <label for="inputZip">Mediano:</label>
                  <input
                    type="text"
                    className="form-control col-8 ml-3"
                    id="inputZip"
                    placeholder="Precio"
                    defaultValue={form.editData ? form.editData.md : ""}
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        md: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group col-10 d-flex aling-item-center">
                  <label for="inputZip">Grande: </label>{" "}
                  <input
                    type="text"
                    className="form-control col-8 ml-4"
                    id="inputZip"
                    placeholder="Precio"
                    defaultValue={form.editData ? form.editData.lg : ""}
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        lg: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group col-10">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                      defaultChecked={nuevoProd}
                      defaultValue={
                        form.editData ? form.editData.disponible : ""
                      }
                      onChange={(e) => {
                        return setNuevoProd({
                          ...nuevoProd,
                          disponible: e.target.checked,
                        });
                      }}
                    />
                    <label className="custom-control-label" for="customSwitch1">
                      Disponible
                    </label>
                  </div>
                </div>
                {form.alertError ? (
                  <div
                    className={`alert ${form.alertError} text-center my-4 col-sm-8 col-md-10`}
                    role="alert"
                  >
                    {form.msjalertError}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex justify-content-around col-12">
                <button
                  // type="submit"
                  className="btn btn-danger"
                  onClick={() => {
                    setForm({
                      ...form,
                      abrirProductoForm: false,
                      nuevo: false,
                      edit: false,
                    });
                    setNuevoProd({
                      disponible: true,
                      nombre: "",
                      sm: "",
                      md: "",
                      lg: "",
                    });
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {form.nuevo ? "Enviar" : "Editar"}
                </button>
              </div>
            </form>
          </div>
        </Grid>
      ) : (
        ""
      )}

      <TableProduct
        dataProducts={dataProducts.products}
        eliminarProducts={eliminarProducts}
        edit={edit}
      />
    </Grid>
  );
};

export default FormIngredientes;
