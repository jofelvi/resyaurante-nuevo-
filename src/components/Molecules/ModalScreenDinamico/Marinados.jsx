import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector } from "react-redux";
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: 10,
  },
}));

export default function FullScreenDialog({
  handleChangeCheckboxMarinado,
  marinarProteina,
  marinado,
  marcaMarinado,
}) {
  const classes = useStyles();

  const products = useSelector((state) => state.products.products);
  const productsProteinas = products.filter(
    (prod) => prod.categories === "Marinado"
  );

  return (
    <ExpansionPanel className="bg-light">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="d-flex">
          <Typography className={classes.heading}>Marinados</Typography>
          {marinado ? (
            <Typography variant="subtitle2" color="primary">
              * {marinado}
            </Typography>
          ) : (
            ""
          )}
        </div>
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
              <div
                key={index}
                className="form-group btn col-4 p-1 border-0"
                onClick={(e) =>
                  handleChangeCheckboxMarinado(item, e.target.checked)
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
                      item.nombre === marcaMarinado.nombre ? "#1e3a56" : "",
                    color:
                      item.nombre === marcaMarinado.nombre ? "#fff" : "#000",
                  }}
                >
                  {`${item.nombre}`}
                </div>
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
