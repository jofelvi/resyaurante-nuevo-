import React, { useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid } from "@material-ui/core";

// Atoms
import { FabButton } from "../../Atoms";

// Molecules
import { ProductCard, ModalScreenCreateMenu } from "../../Molecules";

import { editAddMenu } from "../../../store/AgregarMenu/actions";

const ProductList = () => {
  const dispatch = useDispatch();

  const dataProducts = useSelector((state) => state.products.productsFilter);

  const data = Object.keys(dataProducts).map((i) => {
    dataProducts[i].id = i;
    return dataProducts[i];
  });

  const dataCategories = useSelector((state) => state.categories.categoriesMenu);

  const [arrayMenu, setArrayMenu] = useState([]);
  const [nombreCategore, setNombreCategore] = useState({
    nombre: "",
    agregar: false,
    alertSuccess: "",
    colorAlert: "",
  });
  const handleClose = () => {
    setNombreCategore({
      nombre: "",
      agregar: false,
      alertSuccess: "",
    });
    setArrayMenu([]);
  };

  let gridSize = {
    xs: 12,
    sm: 4,
    md: 3,
    lg: 2,
    xl: 2,
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
        alertSuccess: "Debe tener al menos 2 productos seleccionados y un Nombre",
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
      categories: nombreCategore.categories,
      precioUnitario: nombreCategore.precio,
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
        <div className="col-12">
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

          <ModalScreenCreateMenu
            setNombreCategore={setNombreCategore}
            nombreCategore={nombreCategore}
            addmenubd={addmenubd}
            openModal={nombreCategore.agregar}
            handleClose={handleClose}
          />

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
          <ProductCard variant={"column"} products={item} />
        </Grid>
      ))}
      <FabButton color="primary" label="addProduct" addmenu={addmenu} />
    </Grid>
  );
};

export default ProductList;
