import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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

  const [menuproducto, setmenuproducto] = useState(menuItem);

  const mas = () => {
    setmenuproducto({
      ...menuItem,
      cantidad: menuproducto.cantidad ? Number(menuproducto.cantidad) + 1 : 1,
    });
  };
  const menos = () => {
    setmenuproducto({
      ...menuproducto,
      cantidad: menuproducto.cantidad
        ? menuproducto.cantidad !== 1
          ? Number(menuproducto.cantidad) - 1
          : 1
        : 1,
    });
  };
  const agregarComentario = (e) => {
    setmenuproducto({
      ...menuproducto,
      comentario: e,
    });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={openModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <div className="d-flex justify-content-between align-items-center col-12 py-2 px-4">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose(menuproducto)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            {menuItem.nombre}
          </Typography>

          <div className="d-flex align-items-center">
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 20 }}
              onClick={menos}
            >
              -
            </Button>
            <Typography variant="h6" className={classes.title}>
              {menuproducto.cantidad ? menuproducto.cantidad : 1}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 20, marginLeft: 10 }}
              onClick={mas}
            >
              +
            </Button>
          </div>
        </div>

        <DialogContent>
          <div className="justify-content-center col-12 bg-light">
            <List>
              <div className="row p-4">
                <div className="col-12">
                  <Typography variant="h5" className={classes.title}>
                    Comentario:
                  </Typography>

                  <textarea
                    style={{
                      width: "100%",
                      minHeight: 100,
                      maxHeight: 100,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      padding: 15,
                    }}
                    onChange={(e) => agregarComentario(e.target.value)}
                  ></textarea>
                </div>
                {/* <div
                  className="col-12 d-flex mt-2 p-2 btn btn-primary justify-content-center"
                  onClick={siguientesModal}
                >
                  Agregar {menuproducto.cantidad ? menuproducto.cantidad : 1}{" "}
                  {menuItem.nombre}
                </div> */}
              </div>
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
