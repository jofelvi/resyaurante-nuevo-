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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  handleChangeCheckboxMarinado,
  marinarProteina,
}) {
  const classes = useStyles();

  const products = useSelector((state) => state.products.products);
  const productsProteinas = products.filter(
    (prod) => prod.categories === "Marinado"
  );

  // const dispatch = useDispatch();

  // const siguientesModal = () => {
  //   const ordenmodal = [
  //     ...lista_pedido_dinamico,
  //     {
  //       Marinado: selectMarinado.proteina.nombre,
  //       marinarProteina:
  //         marinar === "Si" ? "Marinar con Cebolla roja y Cebollin" : "",
  //     },
  //   ];

  //   dispatch(addProductosMenuDinamicos(ordenmodal, tipoBowl));
  //   // mostrandoModal("Topping");
  //   // handleClose();
  // };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Marinados</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" className={classes.title}>
              Escoje un Marinado para tu Bowl
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
                        handleChangeCheckboxMarinado(item, e.target.checked)
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

          <div className="col-12">
            <Typography variant="h5" className={classes.title}>
              ¿Desea marinar su Proteina con cebolla roja y cebollin?
            </Typography>
          </div>
          <div className="col-12 d-flex mt-2 flex-wrap">
            <div className="form-group col-3 d-flex justify-content-between">
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    onChange={(e) => marinarProteina(e.target.checked, "Si")}
                    name="checkedT"
                    color="primary"
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    onChange={(e) => marinarProteina(e.target.checked, "No")}
                    name="checkedT"
                    color="primary"
                  />
                }
                label="No"
              />
            </div>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
