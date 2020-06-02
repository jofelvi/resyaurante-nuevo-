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
import { addProductosMenuDinamicos } from "../../../store/agregaralaCuenta/actions";

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
  mostrandoModal,
}) {
  const classes = useStyles();

  const productsBase = [
    {
      nombre: "Pequeño",
      precio: 9.5,
      peso: "500ml",
    },
    {
      nombre: "Grande",
      precio: 11.5,
      peso: "750ml",
    },
    {
      nombre: "Extra Grande",
      precio: 12.5,

      peso: "1000ml",
    },
  ];

  const dispatch = useDispatch();

  const [selectBases, setselectBases] = useState({
    plato: "",
  });

  const lista_pedido_dinamico = useSelector(
    (state) => state.addcuenta.menudinamicoorden
  );

  const handleChangeCheckboxBases = (extra, checked) => {
    if (checked) {
      setselectBases({
        plato: extra,
        productselegidos: lista_pedido_dinamico,
      });
    }
  };

  const siguientesModal = () => {
    mostrandoModal("BasesProteinas");
    dispatch(
      addProductosMenuDinamicos(selectBases.productselegidos, selectBases.plato)
    );
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
              Diseña tu Bowl
            </Typography>
            <Button autoFocus color="inherit" onClick={siguientesModal}>
              Siguiente
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="justify-content-center col-12">
            <List>
              <div className="row p-4">
                <div className="col-12 ">
                  <Typography variant="h5" className={classes.title}>
                    Eliga un tamaño para su Orden
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
                              handleChangeCheckboxBases(
                                item.nombre,
                                e.target.checked
                              )
                            }
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={`${item.nombre}  ${item.peso}...$${item.precio}`}
                      />
                    </div>
                  ))}
                </div>
                {/* <div className="col-12">
                  <Typography variant="h6" className={classes.title}>
                    Solo puede elegir una opcion para su pedido
                  </Typography>
                </div> */}
              </div>
              {/* <div className="row p-4">
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
              </div> */}
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
