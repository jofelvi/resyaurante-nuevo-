import React, { useState, useEffect } from "react";

// Material UI
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Snackbar,
  // IconButton
} from "@material-ui/core";

// Atoms
import { FabButton } from "../../Atoms";

// Molecules
import { SectorCard } from "../../Molecules";

import styles from "./styles";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiAlert from "@material-ui/lab/Alert";
import { editSector, getSector } from "../../../store/sectors/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SectorList = ({ history }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.sectors.msg);
  const sectors = useSelector((state) => state.sectors.sectors);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const classes = styles();

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    xl: 2,
  };

  const sectorEdit = (sector) => {
    dispatch(getSector(sector));
    history.push("/addSector");
  };

  const deleteSector = (sector) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(editSector(sector, "Delete"));
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}

      {isLoading && (
        <Grid
          item
          xs={12}
          container
          style={{ flexDirection: "column", alignItems: "center", alignContent: "center" }}
        >
          <CircularProgress /> {"Eliminando mesa"}
        </Grid>
      )}
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              Sectores
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {sectors.map((sector, index) => (
        <Grid item {...gridSize} key={index}>
          <SectorCard sector={sector} deleteSector={deleteSector} editSector={sectorEdit} />
        </Grid>
      ))}
      <FabButton color="primary" label="addTable" onClick={() => history.push("/addSector")} />
    </Grid>
  );
};

export default withRouter(SectorList);
