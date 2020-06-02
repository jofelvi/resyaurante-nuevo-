import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";

import DialogContent from "@material-ui/core/DialogContent";
import { addProductosCosto } from "../../../store/agregaralaCuenta/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  openModal = false,
  handleClose,
  menuItem = [],
}) {
  const classes = useStyles();
  const productsItems = menuItem.products;
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const costosAddCuenta = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const listaProducts = useSelector((state) => state.addcuenta.listaProducts);
  const IngredientesExtras = allProducts.filter(
    (item) => item.categories === "Extras"
  );
  const productsBase = allProducts.filter(
    (item) => item.categories === "Bases"
  );
  const [selectExtras, setselectExtras] = useState([]);
  const [selectBases, setselectBases] = useState([]);
  const handleChangeCheckbox = (extra, checked) => {
    let arraynuevo;
    if (!checked) {
      arraynuevo = selectExtras.filter((item) => item.nombre !== extra.nombre);
      setselectExtras(arraynuevo);
    } else {
      setselectExtras([...selectExtras, extra]);
    }
  };
  const handleChangeCheckboxBases = (extra, checked) => {
    setselectBases(extra);
  };

  const siguientesModal = () => {
    const menuNuevo = {
      precioUnitario: menuItem.precioUnitario
        ? menuItem.precioUnitario
        : menuItem.precio,
      categories: menuItem.categories,
      nombre: menuItem.nombre,
      base: selectBases.nombre ? selectBases.nombre : "Sin base",
      extras: selectExtras,
    };
    const productoslista = [...listaProducts, menuNuevo];

    dispatch(addProductosCosto(productoslista, costosAddCuenta, menuNuevo));
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={openModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {menuItem.nombre}
            </Typography>
            <Button autoFocus color="inherit" onClick={siguientesModal}>
              Aceptar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="justify-content-center col-12">
            <List>
              <div className="row p-4">
                <div className="col-12">
                  <Typography variant="h5" className={classes.title}>
                    Ingredientes:
                  </Typography>
                </div>
                <div className="col-12 d-flex mt-2 flex-wrap">
                  {productsItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="btn btn-sm bg-info m-1"
                      // onClick={() => eliminarItemArray(item)}
                    >
                      <p className="m-0 p-0 text-white">{`${item.nombre}`}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row p-4">
                <div className="col-12">
                  <Typography variant="h5" className={classes.title}>
                    Elige un acompañante:
                  </Typography>
                </div>
                <div className="col-12 d-flex mt-2 flex-wrap">
                  {productsBase.map((item, index) => (
                    <div key={index} className="form-group col-4">
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) =>
                              handleChangeCheckboxBases(item, e.target.checked)
                            }
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={`${item.nombre}  $${item.precioUnitario}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="row p-4">
                <div className="col-12">
                  <Typography variant="h5" className={classes.title}>
                    ¿Quieres añadir algo extra?
                  </Typography>
                </div>
                <div className="col-12 d-flex mt-2 flex-wrap">
                  {IngredientesExtras.map((item, index) => (
                    <div key={index} className="form-group col-4">
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) =>
                              handleChangeCheckbox(item, e.target.checked)
                            }
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={`${item.nombre}  $${item.precioUnitario}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
