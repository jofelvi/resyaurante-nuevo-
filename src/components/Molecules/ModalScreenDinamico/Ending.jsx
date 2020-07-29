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
  tipoBowl,
  handleChangeCheckboxEnding,
  ending,
  marcaEnding,
}) {
  const classes = useStyles();

  const products = useSelector((state) => state.products.products);
  const productsProteinas = products.filter(
    (prod) => prod.categories === "Endings"
  );

  let numeroProd;
  if (tipoBowl === "Pequeño") {
    numeroProd = 2;
  } else if (tipoBowl === "Grande") {
    numeroProd = 3;
  } else if (tipoBowl === "Extra Grande") {
    numeroProd = 4;
  }

  return (
    <ExpansionPanel className="bg-light">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="d-flex">
          <Typography className={classes.heading}>Endings</Typography>
          {ending ? (
            <Typography variant="subtitle2" color="primary">
              * {ending}
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
              Elige {numeroProd} Endings para tu Bowl
            </Typography>
          </div>
          <div className="col-12 d-flex mt-2 flex-wrap">
            {productsProteinas.map((item, index) => (
              <div
                key={index}
                className="form-group btn col-4 p-1 border-0"
                onClick={(e) => handleChangeCheckboxEnding(item, numeroProd)}
              >
                <div
                  className="border d-flex justify-content-center align-items-center"
                  style={{
                    height: 70,
                    width: "100%",
                    borderRadius: 12,
                    fontSize: 14,
                    background:
                      marcaEnding.indexOf(item.nombre) !== -1 ? "#1e3a56" : "",
                    color:
                      marcaEnding.indexOf(item.nombre) !== -1 ? "#fff" : "#000",
                  }}
                >
                  {`${item.nombre}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
