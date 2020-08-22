import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "start",
  },
}));

const ModalTurned = ({ openModal = false, handleClose }) => {
  const listaPorPagar = useSelector((state) => state.listaPorPagar);
  console.log(listaPorPagar);
  const classes = useStyles();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
        <div className="d-flex justify-content-between align-items-center col-12 py-2 px-4">
          <IconButton edge="start" color="inherit" onClick={() => handleClose()} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pago en Efectivo
          </Typography>
          <Button
            autoFocus
            color="inherit"
            style={{ fontSize: 10 }}
            onClick={() => console.log("TICKET")}
          >
            Imprimir Ticket
          </Button>
        </div>

        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <div
              className="form-group col-md-12 d-flex flex-row justify-content-between"
              style={{ borderBottom: "1px solid #000" }}
            >
              <Typography variant="body1" color="textPrimary" align="left">
                Producto
              </Typography>
              <Typography variant="body1" color="textPrimary" align="left">
                Cantidad
              </Typography>
              <Typography variant="body1" color="textPrimary" align="left">
                Monto
              </Typography>
            </div>
            {listaPorPagar.listaProducts.map((item, index) => (
              <div
                className="form-group col-md-12 d-flex flex-row justify-content-between"
                style={{ borderBottom: "1px solid #000" }}
              >
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.nombre}
                </Typography>
                <Typography variant="body1" color="textPrimary" align="left">
                  {item.cantidad}
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  align="left"
                  style={{ fontWeight: "bold" }}
                >
                  ${item.precioUnitario}
                </Typography>
              </div>
            ))}
            <div className="form-group col-md-12 d-flex flex-row justify-content-between">
              <Typography variant="body1" color="textPrimary" align="left">
                Monto a Pagar
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                style={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
              >
                ${listaPorPagar.productsCuenta}
              </Typography>
            </div>
            <div className="form-group col-md-12 d-flex flex-row justify-content-between">
              <Typography variant="body1" color="textPrimary" align="left">
                Monto Recibido
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                style={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
              >
                ${listaPorPagar.montoEfectivo}
              </Typography>
            </div>
            <div className="form-group col-md-12 d-flex flex-row justify-content-between">
              <Typography variant="body1" color="textPrimary" align="left">
                Monto Restante
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="left"
                style={{ fontWeight: "bold" }}
              >
                ${listaPorPagar.turned}
              </Typography>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalTurned;
