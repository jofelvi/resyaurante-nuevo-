import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Grid } from "@material-ui/core";

import { editproducts } from "../../../store/Products/actions";
import ModalScreenNuevoProd from "../../Molecules/ModalScreenNuevoProd";

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

  const handleClose = () => {
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
      presentacion: edit.presentacion ? edit.presentacion : "Unidad",
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

      <ModalScreenNuevoProd
        openModal={form.abrirProductoForm}
        handleClose={handleClose}
        form={form}
        setNuevoProd={setNuevoProd}
        nuevoProd={nuevoProd}
        setForm={setForm}
        crearNuevoProducto={crearNuevoProducto}
        editarProducts={editarProducts}
      />

      <TableProduct
        dataProducts={dataProducts.productsFilter}
        eliminarProducts={eliminarProducts}
        edit={edit}
      />
    </Grid>
  );
};

export default FormIngredientes;
