import React, { Fragment } from "react";
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
  handleChangeCheckboxBases,
  handleChangeCheckboxProteinas,
  bases,
  proteina,
}) {
  const classes = useStyles();

  const products = useSelector((state) => state.products.products);
  const productsBase = products.filter((prod) => prod.categories === "Bases");
  const productsProteinas = products.filter(
    (prod) => prod.categories === "Proteinas"
  );

  return (
    <Fragment className="bg-light">
      <ExpansionPanel className="bg-light">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="d-flex">
            <Typography className={classes.heading}>Bases</Typography>
            {bases ? (
              <Typography variant="subtitle2" color="primary">
                * {bases}
              </Typography>
            ) : (
              ""
            )}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="row">
            <div className="col-12">
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
      <ExpansionPanel className="bg-light">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="d-flex">
            <Typography className={classes.heading}>Proteinas</Typography>

            {proteina ? (
              <Typography variant="subtitle2" color="primary">
                * {proteina}
              </Typography>
            ) : (
              ""
            )}
          </div>
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
