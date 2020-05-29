import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

import styles from "./styles";
import { editproducts } from "../../../store/Products/actions";

const NewProduct = () => {
  const classes = styles();
  const dataProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    alert: "",
    msjAlert: "",
  });

  const [nuevoProd, setNuevoProd] = useState({
    categoria: "",
    nombre: "",
    precio: "",
    descripcion: "",
  });

  const crearNuevoProducto = async (e) => {
    e.preventDefault();

    const { categoria, nombre, precio, descripcion } = nuevoProd;
    if ((categoria === "", nombre === "", precio === "", descripcion === "")) {
      setForm({
        ...form,
        alert: "alert-danger",
        msjAlert: `Todos los campos son obligatorios`,
      });

      setTimeout(() => {
        setForm({
          ...form,
          alert: "",
          msjAlert: "",
        });
      }, 2500);
      return;
    }
    await dispatch(editproducts(nuevoProd, "Add"));
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              Nuevo Producto
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item md={12}>
        <div className="row justify-content-center">
          <form
            className="my-4 col-sm-8 col-md-10"
            onSubmit={crearNuevoProducto}
          >
            <div className="form-row">
              <div className="form-group  col-sm-6  col-md-6">
                <label for="inputEmail4">Categorias</label>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    return setNuevoProd({
                      ...nuevoProd,
                      categoria: e.target.value,
                    });
                  }}
                  className="custom-select"
                >
                  <option selected>Categoria</option>
                  <option value="Desayuno">Desayuno</option>
                  <option value="Almuerzo">Almuerzo</option>
                  <option value="Merienda">Merienda</option>
                  <option value="Cocteles">Cocteles</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
              </div>
              <div className="form-group col-sm-6 col-md-6">
                <label for="inputZip">Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Nombre"
                  onChange={(e) => {
                    return setNuevoProd({
                      ...nuevoProd,
                      nombre: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6">
                <label for="inputZip">Precio del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Precio"
                  onChange={(e) => {
                    return setNuevoProd({
                      ...nuevoProd,
                      precio: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-sm-6 col-md-6">
                <label for="exampleFormControlTextarea1">Descripcion</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Escriba...."
                  onChange={(e) => {
                    return setNuevoProd({
                      ...nuevoProd,
                      descripcion: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-around">
              <button
                // type="submit"
                className="btn btn-danger"
                onClick={() =>
                  setNuevoProd({
                    categoria: "",
                    nombre: "",
                    precio: "",
                    descripcion: "",
                  })
                }
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </form>
          {dataProducts.error ? (
            <div
              className={`alert alert-danger text-center my-4 col-sm-8 col-md-10`}
              role="alert"
            >
              {dataProducts.error}
            </div>
          ) : (
            ""
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default NewProduct;
