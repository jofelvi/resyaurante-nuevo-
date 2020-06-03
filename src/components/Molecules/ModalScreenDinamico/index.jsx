import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useSelector, useDispatch } from "react-redux";

import DialogContent from "@material-ui/core/DialogContent";
import { addProductosMenuDinamicos } from "../../../store/agregaralaCuenta/actions";
import ModalBasesProteinas from "./BasesYproteinas";
import ModalMariados from "./Marinados";
import ModalTopping from "./Topping";
import ModalEnding from "./Ending";
import ModalExtra from "./Extra";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
  useEffect(() => {
    if (selectBases.plato !== "") {
      siguientesModal();
    }
  });

  const siguientesModal = () => {
    // mostrandoModal("BasesProteinas");
    dispatch(
      addProductosMenuDinamicos(selectBases.productselegidos, selectBases.plato)
    );
    // handleClose();
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

        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Eliga un tamaño para su Orden
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ModalBasesProteinas />
          <ModalMariados />
          <ModalTopping />
          <ModalEnding />
          <ModalExtra />
        </div>
      </Dialog>
    </div>
  );
}
