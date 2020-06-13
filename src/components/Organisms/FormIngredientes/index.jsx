import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Grid } from "@material-ui/core";

import { editproducts } from "../../../store/Products/actions";

import TableProduct from "./table";

const FormIngredientes = () => {
  const dataProducts = useSelector((state) => state.products);

  const dataCategories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    alertError: "",
    msjalertError: "",
    alertSuccess: "",
    abrirProductoForm: false,
    nuevo: false,
    edit: false,
    editData: "",
    presentaciones: false,
  });

  const [nuevoProd, setNuevoProd] = useState({
    disponible: true,
    nombre: "",
    presentaciones: false,
    categories: "",
    // sm: "no disponible",
    // md: "no disponible",
    // lg: "no disponible",
    stock: 0,
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
    if (nuevoProd.precioUnitario) {
      nuevoProd.sm = "";
      nuevoProd.md = "";
      nuevoProd.lg = "";
    } else {
      nuevoProd.precioUnitario = "";
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
    if (nuevoProd.precioUnitario) {
      nuevoProd.sm = "";
      nuevoProd.md = "";
      nuevoProd.lg = "";
    } else {
      nuevoProd.precioUnitario = "";
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
      presentaciones: edit.presentaciones ? true : false,
    });

    setNuevoProd({
      ...nuevoProd,
      disponible: edit.disponible,
      nombre: edit.nombre,
      sm: edit.sm,
      md: edit.md,
      lg: edit.lg,
      id: edit.id,
      categories: edit.categories,
      precioUnitario: edit.precioUnitario,
      presentaciones: edit.presentaciones ? true : false,
      stock: edit.stock,
      descripcion: edit.descripcion,
    });
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <div className="d-flex justify-content-end col-12">
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

                <div className="form-group col-10">
                  <label for="inputZip">Descripcion del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Descripcion"
                    defaultValue={
                      form.editData ? form.editData.descripcion : ""
                    }
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        descripcion: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group col-10">
                  <label for="inputZip">Categoria</label>
                  <select
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        categories: e.target.value,
                      });
                    }}
                    defaultChecked={form.edit ? form.editData.categories : ""}
                    className="custom-select"
                    defaultValue={form.edit ? form.editData.categories : ""}
                  >
                    <option selected>Categoria...</option>

                    {dataCategories.map((item, index) => (
                      <option key={index} value={item.nombre}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-10">
                  <label for="inputZip">Cantidad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Cantidad"
                    defaultValue={form.editData ? form.editData.stock : ""}
                    onChange={(e) => {
                      return setNuevoProd({
                        ...nuevoProd,
                        stock: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group col-10">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch2"
                      defaultChecked={
                        form.editData ? form.editData.disponible : false
                      }
                      onChange={(e) => {
                        setNuevoProd({
                          ...nuevoProd,
                          presentaciones: e.target.checked,
                        });

                        setForm({
                          ...form,
                          presentaciones: e.target.checked,
                        });
                      }}
                    />
                    <label className="custom-control-label" for="customSwitch2">
                      diferentes presentaciones
                    </label>
                  </div>
                </div>
                <h6 className="form-group mb-4 align-text-center col-10">
                  Precio del Producto - Presentacion :
                </h6>
                {form.presentaciones ? (
                  <Fragment>
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
                      <label for="inputZip">Grande: </label>
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
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="form-group col-10 d-flex aling-item-center">
                      <label for="inputZip">Precio unitario:</label>
                      <input
                        type="text"
                        className="form-control col-8 ml-3"
                        id="inputZip"
                        placeholder="Precio"
                        defaultValue={
                          form.editData ? form.editData.precioUnitario : ""
                        }
                        onChange={(e) => {
                          return setNuevoProd({
                            ...nuevoProd,
                            precioUnitario: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Fragment>
                )}
                <div className="form-group col-10">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                      defaultChecked={
                        form.editData ? form.editData.disponible : true
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
        dataProducts={dataProducts.productsFilter}
        eliminarProducts={eliminarProducts}
        edit={edit}
      />
    </Grid>
  );
};

export default FormIngredientes;
