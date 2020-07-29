import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DialogContent from "@material-ui/core/DialogContent";
import { editMesas } from "../../../store/Clients/actions";

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

  const [mesa, setmesa] = useState("");

  const asignarOrden = () => {
    dispatch(editMesas({ nombre: mesa }, "Add"));
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
            Crear Mesa
          </Typography>
        </div>

        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <div className="form-group col-md-12 d-flex flex-column">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={(e) => {
                  return setmesa(e.target.value);
                }}
              />
            </div>
            <div
              onClick={asignarOrden}
              className="py-1 mb-3 btn btn-primary d-flex justify-content-center"
            >
              <h6>Crear</h6>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
