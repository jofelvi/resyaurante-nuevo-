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

export default function FullScreenDialog({ openModal = false, handleClose }) {
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

  const lista_pedido_dinamico = useSelector(
    (state) => state.addcuenta.menudinamicoorden
  );
  const precioAcumulado = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  // ("======================================================= Bowl
  const [selectBowl, setselectBowl] = useState({
    plato: "",
  });
  const handleChangeCheckboxBowl = (extra, checked) => {
    if (checked) {
      setselectBowl({
        plato: extra,
      });
    }
  };
  // ("=======================================================Bases y proteinas
  const [selectBases, setselectBases] = useState({
    bases: [],
    proteina: "",
  });

  const handleChangeCheckboxBases = (extra, checked) => {
    let quitarbase;
    if (checked) {
      setselectBases({
        ...selectBases,
        bases: [...selectBases.bases, extra],
      });
    }
    if (!checked) {
      quitarbase = selectBases.bases.filter(
        (item) => item.nombre !== extra.nombre
      );
      setselectBases({
        ...selectBases,
        bases: quitarbase,
      });
    }
  };

  const handleChangeCheckboxProteinas = (extra, checked) => {
    if (checked) {
      setselectBases({
        ...selectBases,
        proteina: extra,
      });
    }
  };

  // ("=======================================================Marinado
  const [selectMarinado, setselectMarinado] = useState({
    marinado: "",
  });

  const handleChangeCheckboxMarinado = (extra, checked) => {
    if (checked) {
      setselectMarinado({
        marinado: extra,
      });
    }
  };

  const [marinar, setmarinar] = useState("Si");
  const marinarProteina = (checked, tipo) => {
    if (checked) {
      if (tipo === "Si") {
        setmarinar("Si");
      } else if (tipo === "No") {
        setmarinar("No");
      }
    } else {
      setmarinar("");
    }
  };

  // ("=======================================================Topping

  const [selectTopping, setselectTopping] = useState({
    topping: [],
  });

  const handleChangeCheckboxTopping = (extra, checked) => {
    if (checked) {
      setselectTopping({
        topping: [...selectTopping.topping, extra],
      });
    }
  };

  // ("=======================================================Ending

  const [selectEnding, setselectEnding] = useState({
    ending: [],
  });

  const handleChangeCheckboxEnding = (extra, checked) => {
    if (checked) {
      setselectEnding({
        ending: [...selectEnding.ending, extra],
      });
    }
  };

  // ("=======================================================Extras
  const [selectExtras, setselectExtras] = useState({
    extras: [],
  });

  const handleChangeCheckboxExtras = (extra, checked) => {
    if (checked) {
      setselectExtras({
        extras: [...selectExtras.extras, extra],
      });
    }
  };

  const siguientesModal = () => {
    let toppings = selectTopping.topping.map((item) => item.nombre);
    let endings = selectEnding.ending.map((item) => item.nombre);
    let extras = selectExtras.extras.map((item) => item.nombre);
    let precioProcesado = precioAcumulado;
    if (selectExtras.extras) {
      selectExtras.extras.map((item) => {
        if (item.precioUnitario !== "") {
          precioProcesado += Number(item.precioUnitario);
        }
      });
    }

    const pedidoDinamico = {
      bowl: selectBowl.plato,
      bases: selectBases.bases,
      proteina: selectBases.proteina.nombre,
      marinado: {
        marinado: selectMarinado.marinado.nombre,
        marinarProteina: marinar,
      },
      topping: toppings,
      ending: endings,
      extra: extras,
    };

    dispatch(
      addProductosMenuDinamicos(
        [...lista_pedido_dinamico, pedidoDinamico],
        selectBowl.plato,
        precioProcesado
      )
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
              Aceptar
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
                            handleChangeCheckboxBowl(
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
          <ModalBasesProteinas
            handleChangeCheckboxBases={handleChangeCheckboxBases}
            handleChangeCheckboxProteinas={handleChangeCheckboxProteinas}
          />
          <ModalMariados
            handleChangeCheckboxMarinado={handleChangeCheckboxMarinado}
            marinarProteina={marinarProteina}
          />
          <ModalTopping
            handleChangeCheckboxTopping={handleChangeCheckboxTopping}
            tipoBowl={selectBowl.plato}
          />
          <ModalEnding
            handleChangeCheckboxEnding={handleChangeCheckboxEnding}
            tipoBowl={selectBowl.plato}
          />
          <ModalExtra handleChangeCheckboxExtras={handleChangeCheckboxExtras} />
        </div>
      </Dialog>
    </div>
  );
}
