import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import createHash from "hash-generator";

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

  // ("======================================================= Bowl
  const [selectBowl, setselectBowl] = useState({
    plato: "",
    precioUnitario: "",
  });
  const handleChangeCheckboxBowl = (extra, checked) => {
    setselectBowl({
      plato: extra.nombre,
      precioUnitario: extra.precio,
    });
  };
  // ("=======================================================Bases y proteinas
  const [selectBases, setselectBases] = useState({
    bases: [],
    proteina: "",
  });
  const [arrayMarcaBases, setarrayMarcaBases] = useState([]);
  const handleChangeCheckboxBases = (extra, checked) => {
    if (arrayMarcaBases.length === 2) {
      arrayMarcaBases.shift();
    }

    setselectBases({
      ...selectBases,
      bases: [...selectBases.bases, extra],
    });

    setarrayMarcaBases([...arrayMarcaBases, extra]);

    const arraynuevo = selectBases.bases.filter((item) => item === extra);
    if (arraynuevo.length === 1) {
      const nuevoArrayBases = selectBases.bases.filter(
        (item) => item !== extra
      );
      let marcado = arrayMarcaBases.filter((item) => item !== extra);
      setarrayMarcaBases(marcado);
      setselectBases({
        ...selectBases,
        bases: nuevoArrayBases,
      });
    }
  };

  const handleChangeCheckboxProteinas = (extra, checked) => {
    // if (checked) {
    setselectBases({
      ...selectBases,
      proteina: extra,
    });
    // }
  };

  // ("=======================================================Marinado
  const [selectMarinado, setselectMarinado] = useState({
    marinado: "",
  });

  const handleChangeCheckboxMarinado = (extra, checked) => {
    // if (checked) {
    setselectMarinado({
      marinado: extra,
    });
    // }
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

  const [arrayMarcaTopping, setarrayMarcaTopping] = useState([]);
  const handleChangeCheckboxTopping = (extra, limit) => {
    if (arrayMarcaTopping.length === limit) {
      arrayMarcaTopping.shift();
    }

    setselectTopping({
      topping: [...selectTopping.topping, extra],
    });
    setarrayMarcaTopping([...arrayMarcaTopping, extra.nombre]);

    const arraynuevo = selectTopping.topping.filter(
      (item) => item.nombre === extra.nombre
    );
    if (arraynuevo.length === 1) {
      const nuevoArrayBases = selectTopping.topping.filter(
        (item) => item.nombre !== extra.nombre
      );
      let marcado = arrayMarcaTopping.filter((item) => item !== extra.nombre);
      setarrayMarcaTopping(marcado);

      setselectTopping({
        topping: nuevoArrayBases,
      });
    }
  };

  // ("=======================================================Ending

  const [selectEnding, setselectEnding] = useState({
    ending: [],
  });

  const [arrayMarcaEnding, setarrayMarcaEnding] = useState([]);
  const handleChangeCheckboxEnding = (extra, limit) => {
    if (arrayMarcaEnding.length === limit) {
      arrayMarcaEnding.shift();
    }

    setselectEnding({
      ending: [...selectEnding.ending, extra],
    });
    setarrayMarcaEnding([...arrayMarcaEnding, extra.nombre]);

    const arraynuevo = selectEnding.ending.filter(
      (item) => item.nombre === extra.nombre
    );
    if (arraynuevo.length === 1) {
      const nuevoArrayBases = selectEnding.ending.filter(
        (item) => item.nombre !== extra.nombre
      );
      let marcado = arrayMarcaEnding.filter((item) => item !== extra.nombre);
      setarrayMarcaEnding(marcado);

      setselectEnding({
        ending: nuevoArrayBases,
      });
    }
  };

  // ("=======================================================Extras
  const [selectExtras, setselectExtras] = useState({
    extras: [],
  });

  const [arrayMarcaExtras, setarrayMarcaExtras] = useState([]);
  const handleChangeCheckboxExtras = (extra) => {
    setselectExtras({
      extras: [...selectExtras.extras, extra],
    });
    setarrayMarcaExtras([...arrayMarcaExtras, extra.nombre]);

    const arraynuevo = selectExtras.extras.filter(
      (item) => item.nombre === extra.nombre
    );
    if (arraynuevo.length === 1) {
      const nuevoArrayBases = selectExtras.extras.filter(
        (item) => item.nombre !== extra.nombre
      );
      let marcado = arrayMarcaExtras.filter((item) => item !== extra.nombre);
      setarrayMarcaExtras(marcado);

      setselectExtras({
        extras: nuevoArrayBases,
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

  const [menuproducto, setmenuproducto] = useState({
    cantidad: 1,
    comentario: "",
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
      precioUnitario: `${selectBowl.precioUnitario}`,
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
      cantidad: menuproducto.cantidad ? menuproducto.cantidad : 1,
      comentario: menuproducto.comentario ? menuproducto.comentario : "",
      id: createHash(12),
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

  const mas = () => {
    setmenuproducto({
      ...menuproducto,
      cantidad: menuproducto.cantidad ? Number(menuproducto.cantidad) + 1 : 1,
    });
  };
  const menos = () => {
    setmenuproducto({
      ...menuproducto,
      cantidad: menuproducto.cantidad
        ? menuproducto.cantidad !== 1
          ? Number(menuproducto.cantidad) - 1
          : 1
        : 1,
    });
  };
  const agregarComentario = (e) => {
    setmenuproducto({
      ...menuproducto,
      comentario: e,
    });
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
        <div className="d-flex justify-content-between align-items-center col-12 py-2 px-4">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Diseña tu Bowl
          </Typography>

          <div className="d-flex align-items-center">
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 20 }}
              onClick={menos}
            >
              -
            </Button>
            <Typography variant="h6" className={classes.title}>
              {menuproducto.cantidad ? menuproducto.cantidad : 1}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 20, marginLeft: 10 }}
              onClick={mas}
            >
              +
            </Button>
          </div>
        </div>
        <div className={`${classes.root} bg-light`}>
          <ExpansionPanel className="bg-light">
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
                  <div
                    key={index}
                    className="form-group btn col-4 p-1 border-0"
                    onClick={(e) =>
                      handleChangeCheckboxBowl(item, e.target.checked)
                    }
                  >
                    <div
                      className="border d-flex justify-content-center align-items-center"
                      style={{
                        height: 70,
                        width: "100%",
                        borderRadius: 12,
                        fontSize: 14,
                        background:
                          item.nombre === selectBowl.plato ? "#1e3a56" : "",
                        color:
                          item.nombre === selectBowl.plato ? "#fff" : "#000",
                      }}
                    >
                      {`${item.nombre}  ${item.peso}...$${item.precio}`}
                    </div>
                  </div>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ModalBasesProteinas
            bases={opcioneRequeridas.bases}
            marcaBases={arrayMarcaBases}
            proteina={opcioneRequeridas.proteinas}
            marcaProteina={selectBases.proteina}
            handleChangeCheckboxBases={handleChangeCheckboxBases}
            handleChangeCheckboxProteinas={handleChangeCheckboxProteinas}
          />
          <ModalMariados
            marinado={opcioneRequeridas.marinados}
            marcaMarinado={selectMarinado.marinado}
            handleChangeCheckboxMarinado={handleChangeCheckboxMarinado}
            marinarProteina={marinarProteina}
          />
          <ModalTopping
            topping={opcioneRequeridas.topping}
            marcaTopping={arrayMarcaTopping}
            handleChangeCheckboxTopping={handleChangeCheckboxTopping}
            tipoBowl={selectBowl.plato}
          />
          <ModalEnding
            ending={opcioneRequeridas.ending}
            marcaEnding={arrayMarcaEnding}
            handleChangeCheckboxEnding={handleChangeCheckboxEnding}
            tipoBowl={selectBowl.plato}
          />
          <ModalExtra
            marcaExtra={arrayMarcaExtras}
            handleChangeCheckboxExtras={handleChangeCheckboxExtras}
          />
        </div>{" "}
        <div className=" col-12 p-1 bg-light d-flex flex-column align-items-center">
          <div className="col-11">
            <Typography variant="h5" className={classes.title}>
              Comentario:
            </Typography>

            <textarea
              style={{
                width: "100%",
                minHeight: 100,
                maxHeight: 100,
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 15,
              }}
              onChange={(e) => agregarComentario(e.target.value)}
            ></textarea>
          </div>
          <div
            className="col-11 d-flex mt-2 p-2 btn btn-primary justify-content-center"
            onClick={siguientesModal}
          >
            Agregar tu Bowl
          </div>
        </div>
      </Dialog>
    </div>
  );
}
