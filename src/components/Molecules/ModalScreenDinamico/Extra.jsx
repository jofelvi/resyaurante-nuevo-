import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
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
  handleChangeCheckboxExtras,
  marcaExtra,
}) {
  const classes = useStyles();

  const products = useSelector((state) => state.products.products);
  const productsProteinas = products.filter(
    (prod) => prod.categories === "Extras"
  );

  return (
    <ExpansionPanel className="bg-light">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Extras</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" className={classes.title}>
              ¿ Desea añadir algo Extra para tu Bowl?
            </Typography>
          </div>
          <div className="col-12 d-flex mt-2 flex-wrap">
            {productsProteinas.map((item, index) => (
              <div
                key={index}
                className="form-group btn col-4 p-1 border-0"
                onClick={(e) =>
                  handleChangeCheckboxExtras(item, e.target.checked)
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
                      marcaExtra.indexOf(item.nombre) !== -1 ? "#1e3a56" : "",
                    color:
                      marcaExtra.indexOf(item.nombre) !== -1 ? "#fff" : "#000",
                  }}
                >
                  {`${item.nombre} $${item.precioUnitario}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
