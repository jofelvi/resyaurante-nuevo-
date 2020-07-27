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
import { TableCard } from "../../Molecules";

import styles from "./styles";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { editTable, getTable } from "../../../store/Table/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TableList = ({ history }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.tables.msg);
  const data = useSelector((state) => state.tables.tables);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const classes = styles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let gridSize = {
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    xl: 2,
  };

  const tableEdit = (table) => {
    dispatch(getTable(table));
    history.push("/addTable");
  };

  const deleteTable = (table) => {
    setIsLoading(true);
    dispatch(editTable(table, "Delete"));
    setIsLoading(false);
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
              MESAS
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>

      {data.map((data, index) => (
        <Grid item {...gridSize} key={index}>
          <TableCard table={data} deleteTable={deleteTable} editTable={tableEdit} />
        </Grid>
      ))}
      <FabButton color="primary" label="addTable" onClick={() => history.push("/addTable")} />
    </Grid>
  );
};

export default withRouter(TableList);
