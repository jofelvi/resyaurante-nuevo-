import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import DialogContent from "@material-ui/core/DialogContent";
import ModalCrearMesas from "../ModalCrearMesas";
import { personaParaOrden } from "../../../store/agregaralaCuenta/actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "start",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "start",
  },
  bgcolor: { backgroundColor: "#1e3a56", color: "#fff" },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  openModal = false,
  handleClose,
  menuItem = [],
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cliente = useSelector((state) => state.clients.clients);
  const mesoneros = cliente.filter((item) => item.rol === "mesonero");

  const [mesa, setmesa] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const modal = () => {
    setmodalOpen(true);
  };
  const handleCloseMesas = () => {
    setmodalOpen(false);
  };

  const mesas = [
    {
      nombre: "mesa 1",
      estado: "ocupada",
    },

    {
      nombre: "mesa 2",
      estado: "ocupada",
    },

    {
      nombre: "mesa 3",
      estado: "ocupada",
    },
    {
      nombre: "mesa 4",
      estado: "ocupada",
    },
    {
      nombre: "mesa 5",
      estado: "ocupada",
    },
    {
      nombre: "mesa 6",
      estado: "ocupada",
    },
  ];
  const asignarOrden = () => {
    dispatch(personaParaOrden({ tipo: "mesa", tranferir: mesa }));
    handleClose();
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={openModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <div className="d-flex align-items-center justify-content-between col-12 py-2 px-4">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Transferir Orden
          </Typography>
          <Button
            autoFocus
            color="inherit"
            style={{ fontSize: 16, marginLeft: 10 }}
            onClick={() => modal()}
          >
            Crear Mesas
          </Button>
        </div>

        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Mesas" {...a11yProps(0)} />
                <Tab label="Mesoneros" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className="col-12 pt-0 pb-3 px-0">
                <Grid item md={12}>
                  <div className="col-12 justify-content-start p-0">
                    {mesas.map((item, i) => (
                      <div
                        onClick={() => setmesa(item.nombre)}
                        key={i}
                        className={`py-1 btn col-12 border-bottom ${
                          item.nombre === mesa ? classes.bgcolor : ""
                        }`}
                      >
                        <p className={`${classes.title} p-0 m-0`}>
                          {item.nombre}
                        </p>
                        <p className={`${classes.subtitle} p-0 m-0`}>
                          {item.estado}
                        </p>
                      </div>
                    ))}
                  </div>
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="col-12 pt-0 pb-3 px-0">
                <Grid item md={12}>
                  <div className="col-12 justify-content-start p-0">
                    {mesoneros.map((item, i) => (
                      <div
                        onClick={() => setmesa(item.nombre)}
                        key={i}
                        className={`py-1 btn col-12 border-bottom ${
                          item.nombre === mesa ? classes.bgcolor : ""
                        }`}
                      >
                        <p className={`${classes.title} p-0 m-0`}>
                          {item.nombre}
                        </p>
                        <p className={`${classes.subtitle} p-0 m-0`}>libre</p>
                      </div>
                    ))}
                  </div>
                </Grid>
              </div>
            </TabPanel>

            <div
              onClick={asignarOrden}
              className="py-1 mb-3 btn btn-primary d-flex justify-content-center"
            >
              <h6>Tranferir</h6>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ModalCrearMesas openModal={modalOpen} handleClose={handleCloseMesas} />
    </div>
  );
}
