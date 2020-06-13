import React, { useState } from "react";
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
    marginRight: 10,
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
  // const AllIngredientesProd = useSelector((state) => state.products.products);
  // const arrayMenuDinamico = [
  //   {
  //     nombre: "Hamburguesa",
  //     dimensiones: {
  //       sm: 10.0,
  //       md: 12.0,
  //       lg: 14.0,
  //     },
  //     base: {
  //       cantidad: 1,
  //       ingrediente: "Bases",
  //       default: "Pan",
  //     },
  //     proteinas: {
  //       cantidad: 2,
  //       ingrediente: "Proteinas",
  //     },
  //     salsa: {
  //       cantidad: 3,
  //       ingrediente: "Salsas",
  //     },
  //     vegetales: {
  //       cantidad: 3,
  //       ingrediente: "Vegetales",
  //     },
  //     charcuteria: {
  //       cantidad: 2,
  //       ingrediente: "Charcuteria",
  //     },
  //   },
  //   {
  //     nombre: "Pizza",
  //     dimensiones: {
  //       sm: 10.0,
  //       md: 12.0,
  //       lg: 14.0,
  //     },
  //     base: {
  //       cantidad: 1,
  //       ingrediente: "Bases",
  //       default: "Masa",
  //     },
  //     proteinas: {
  //       cantidad: 1,
  //       ingrediente: "Proteinas",
  //     },
  //     salsa: {
  //       cantidad: 1,
  //       ingrediente: "Salsas",
  //     },
  //     vegetales: {
  //       cantidad: 3,
  //       ingrediente: "Vegetales",
  //     },
  //     charcuteria: {
  //       cantidad: 2,
  //       ingrediente: "Charcuteria",
  //     },
  //   },
  //   {
  //     nombre: "Paella",
  //     dimensiones: {
  //       sm: 10.0,
  //       md: 12.0,
  //       lg: 14.0,
  //     },
  //     base: {
  //       cantidad: 1,
  //       ingrediente: "Bases",
  //       default: "arroz",
  //     },
  //     proteinas: {
  //       cantidad: 3,
  //       ingrediente: "Proteinas",
  //     },
  //     salsa: {
  //       cantidad: 2,
  //       ingrediente: "Salsas",
  //     },
  //     vegetales: {
  //       cantidad: 3,
  //       ingrediente: "Vegetales",
  //     },
  //   },
  // ];

  // for (const key in arrayMenuDinamico) {
  //   if (arrayMenuDinamico.length >= 0) {
  //     Object.keys(arrayMenuDinamico[key]).map((index) => {
  //       if (index == "dimensiones") {
  //       } else {
  //         if (arrayMenuDinamico[key][index].ingrediente) {
  //           const array = AllIngredientesProd.filter(
  //             (state) =>
  //               state.categories === arrayMenuDinamico[key][index].ingrediente
  //           );
  //         }
  //       }
  //     });
  //   }
  // }

  // ("======================================================= Bowl
  const [selectBowl, setselectBowl] = useState({
    plato: "",
  });
  const handleChangeCheckboxBowl = (extra, checked) => {
    if (checked) {
      setselectBowl({
        plato: extra.nombre,
        precioUnitario: extra.precio,
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
  const [opcioneRequeridas, setopcioneRequeridas] = useState({
    bowl: "",
    bases: "",
    proteinas: "",
    marinados: "",
    topping: "",
    ending: "",
  });
  const siguientesModal = () => {
    let toppings = selectTopping.topping.map((item) => item.nombre);
    let endings = selectEnding.ending.map((item) => item.nombre);
    let extras = selectExtras.extras.map((item) => item.nombre);
    let precioProcesado = precioAcumulado;

    if (selectBowl.plato === "") {
      setopcioneRequeridas({
        ...opcioneRequeridas,
        bowl: "Debe seleccionar un tipo de Bowl",
      });
      return;
    }
    if (selectBases.bases.length === 0) {
      setopcioneRequeridas({
        ...opcioneRequeridas,
        bases: "Debe seleccionar 2 Bases",
      });
      return;
    }
    if (selectBases.proteina === "") {
      setopcioneRequeridas({
        ...opcioneRequeridas,
        proteinas: "Debe seleccionar una Proteina",
      });
      return;
    }
    if (selectMarinado.marinado === "") {
      setopcioneRequeridas({
        ...opcioneRequeridas,
        marinados: "Debe seleccionar un Marinado",
      });
      return;
    }
    if (toppings.length === 0) {
      setopcioneRequeridas({
        ...opcioneRequeridas,
        topping: "Debe seleccionar un Topping",
      });
      return;
    }
    if (endings.length === 0) {
      setopcioneRequeridas({
        ...opcioneRequeridas,
        ending: "Debe seleccionar un tipo de Bowl",
      });
      return;
    }

    if (selectExtras.extras) {
      selectExtras.extras.map((item) => {
        if (item.precioUnitario !== "") {
          precioProcesado += Number(item.precioUnitario);
        }
      });
    }

    const pedidoDinamico = {
      precioUnitario: selectBowl.precioUnitario,
      nombre: `Bowl ${selectBowl.plato}`,
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

    setopcioneRequeridas({
      bowl: "",
      bases: "",
      proteinas: "",
      marinados: "",
      topping: "",
      ending: "",
    });
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
              <div className="d-flex">
                <Typography className={classes.heading}>
                  Eliga un tamaño para su Orden
                </Typography>
                {opcioneRequeridas.bowl ? (
                  <Typography variant="subtitle2" color="primary">
                    * {opcioneRequeridas.bowl}
                  </Typography>
                ) : (
                  ""
                )}
              </div>
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
                            handleChangeCheckboxBowl(item, e.target.checked)
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
            bases={opcioneRequeridas.bases}
            proteina={opcioneRequeridas.proteinas}
            handleChangeCheckboxBases={handleChangeCheckboxBases}
            handleChangeCheckboxProteinas={handleChangeCheckboxProteinas}
          />
          <ModalMariados
            marinado={opcioneRequeridas.marinados}
            handleChangeCheckboxMarinado={handleChangeCheckboxMarinado}
            marinarProteina={marinarProteina}
          />
          <ModalTopping
            topping={opcioneRequeridas.topping}
            handleChangeCheckboxTopping={handleChangeCheckboxTopping}
            tipoBowl={selectBowl.plato}
          />
          <ModalEnding
            ending={opcioneRequeridas.ending}
            handleChangeCheckboxEnding={handleChangeCheckboxEnding}
            tipoBowl={selectBowl.plato}
          />
          <ModalExtra handleChangeCheckboxExtras={handleChangeCheckboxExtras} />
        </div>
      </Dialog>
    </div>
  );
}
