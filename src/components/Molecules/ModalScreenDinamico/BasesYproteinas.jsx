import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { addProductosMenuDinamicos } from "../../../store/agregaralaCuenta/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  mostrandoModal,
}) {
  const classes = useStyles();

  const products = useSelector((state) => state.products.products);
  const productsBase = products.filter((prod) => prod.categories === "Bases");
  const productsProteinas = products.filter(
    (prod) => prod.categories === "Proteinas"
  );

  const dispatch = useDispatch();

  const [selectBases, setselectBases] = useState({
    bases: [],
    proteina: "",
  });

  const lista_pedido_dinamico = useSelector(
    (state) => state.addcuenta.menudinamicoorden
  );
  const tipoBowl = useSelector((state) => state.addcuenta.tipodebowl);

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
  useEffect(() => {
    if (selectBases.bases.length === 2 && selectBases.proteina !== "") {
      siguientesModal();
    }
  });

  const siguientesModal = () => {
    const ordenmodal = [
      ...lista_pedido_dinamico,
      { Bases: selectBases.bases },
      { Proteina: selectBases.proteina.nombre },
    ];
    dispatch(addProductosMenuDinamicos(ordenmodal, tipoBowl));
    // mostrandoModal("Marinado");
    // handleClose();
  };

  return (
    <Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Bases</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="row">
            <div className="col-12 ">
              <Typography variant="h6" className={classes.title}>
                Escoje 2 bases para tu Bowl
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
                    label={`${item.nombre}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Proteinas</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="row">
            <div className="col-12">
              <Typography variant="h6" className={classes.title}>
                Escoje una Proteina para tu Bowl
              </Typography>
            </div>
            <div className="col-12 d-flex mt-2 flex-wrap">
              {productsProteinas.map((item, index) => (
                <div key={index} className="form-group col-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={(e) =>
                          handleChangeCheckboxProteinas(item, e.target.checked)
                        }
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={`${item.nombre}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
}
