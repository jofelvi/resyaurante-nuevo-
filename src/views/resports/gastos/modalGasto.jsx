import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";
import { editReports } from "../../../store/reportes/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "start",
  },
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
  let fecha = new Date();

  const [gastos, setgastos] = useState({
    fecha: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
    importe: "",
    motivo: "",
    factura: "",
    iva: "",
    metodo: "",
    monto: "",
    pago: "",
  });

  const anadirGasto = () => {
    const ivaImport = (Number(gastos.importe) * Number(gastos.iva)) / 100;
    gastos.monto = `${ivaImport}`;
    gastos.pago = `${Number(gastos.monto) + Number(gastos.importe)}`;

    dispatch(editReports(gastos, "Add"));

    handleClose();
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
        <div className="d-flex align-items-center col-12 py-2 px-4">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nuevo Gasto
          </Typography>
        </div>

        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <div className="col-12 d-flex">
              <div className="form-group col-4 d-flex flex-column">
                <label>Importe</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  onChange={(e) => {
                    return setgastos({
                      ...gastos,
                      importe: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-4 d-flex flex-column">
                <label>Motivo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  onChange={(e) => {
                    return setgastos({
                      ...gastos,
                      motivo: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-4 d-flex flex-column">
                <label>N° de Factura</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  onChange={(e) => {
                    return setgastos({
                      ...gastos,
                      factura: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-12 d-flex">
              <div className="form-group col-8 d-flex flex-column align-items-center">
                <label>Iva</label>
                <div className="col-12 d-flex">
                  <Button
                    className=" btn btn-xs col-4 border"
                    style={{
                      height: 40,
                      background: gastos.iva === "5" ? "#1e3a56" : "#fff",
                      color: gastos.iva === "5" ? "#fff" : "#1e3a56",
                    }}
                    onClick={() =>
                      setgastos({
                        ...gastos,
                        iva: "5",
                      })
                    }
                  >
                    5%
                  </Button>
                  <Button
                    className=" btn btn-xs col-4 border"
                    style={{
                      height: 40,
                      background: gastos.iva === "10" ? "#1e3a56" : "#fff",
                      color: gastos.iva === "10" ? "#fff" : "#1e3a56",
                    }}
                    onClick={() =>
                      setgastos({
                        ...gastos,
                        iva: "10",
                      })
                    }
                  >
                    10%
                  </Button>
                  <Button
                    className=" btn btn-xs col-4 border"
                    style={{
                      height: 40,
                      background: gastos.iva === "12" ? "#1e3a56" : "#fff",
                      color: gastos.iva === "12" ? "#fff" : "#1e3a56",
                    }}
                    onClick={() =>
                      setgastos({
                        ...gastos,
                        iva: "12",
                      })
                    }
                  >
                    12$
                  </Button>
                </div>
              </div>

              <div className="form-group col-4 d-flex flex-column">
                <label>Tipo de Pago</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Efectivo"
                  onChange={(e) => {
                    return setgastos({
                      ...gastos,
                      metodo: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div
              onClick={anadirGasto}
              className="py-1 mb-3 btn btn-primary d-flex justify-content-center"
            >
              <h6>Añadir</h6>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
