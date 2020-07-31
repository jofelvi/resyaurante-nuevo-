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
import { ReservedCard } from "../../Molecules";

import styles from "./styles";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { editReserved, getReserved } from "../../../store/reserved/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ReservedList = ({ history }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.reserved.msg);
  const reserved = useSelector((state) => state.reserved.reserved);
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

  const reservedEdit = (reserved) => {
    dispatch(getReserved(reserved));
    history.push("/addReserved");
  };

  const deleteReserved = (reserved) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(editReserved(reserved, "Delete"));
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
          <CircularProgress /> {"Eliminando reserva"}
        </Grid>
      )}
      <Grid item xs={12}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subtitle2" color="primary">
              Mesas Reservadas
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {reserved.map((item, index) => (
        <Grid item {...gridSize} key={index}>
          <ReservedCard item={item} deleteReserved={deleteReserved} editReserved={reservedEdit} />
        </Grid>
      ))}
      <FabButton color="primary" label="addReserved" onClick={() => history.push("/addReserved")} />
    </Grid>
  );
};

export default withRouter(ReservedList);
