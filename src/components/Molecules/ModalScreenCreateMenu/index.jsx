import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
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
  setNombreCategore,
  nombreCategore,
  addmenubd,
}) {
  const classes = useStyles();

  const dataCategories = useSelector((state) => state.categories.categories);
  const [menuproducto, setmenuproducto] = useState(menuItem);

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
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose(menuproducto)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Agregar nuevo Menu
          </Typography>
          <div className="d-flex align-items-center">
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 16, marginLeft: 10 }}
              onClick={() => addmenubd()}
            >
              Crear Menu
            </Button>
          </div>
        </div>

        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <List>
              <div className="row p-4">
                <Grid item md={12}>
                  <div className="row justify-content-center">
                    <form
                      className="my-1  col-12"
                      // onSubmit={}
                    >
                      <div className="form-group col-12 mb-3">
                        <label for="inputZip">Nombre para el menu</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputZip"
                          placeholder="Nombre"
                          onChange={(e) => {
                            return setNombreCategore({
                              ...nombreCategore,
                              nombre: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="form-group col-12">
                        <label for="inputZip">Categoria</label>
                        <select
                          onChange={(e) => {
                            return setNombreCategore({
                              ...nombreCategore,
                              categories: e.target.value,
                            });
                          }}
                          className="custom-select"
                        >
                          <option selected>Categoria...</option>

                          {dataCategories.map((item, index) => (
                            <option key={index} value={item.nombre}>
                              {item.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group col-12 mb-3">
                        <label for="inputZip">Precio</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputZip"
                          placeholder="Precio"
                          onChange={(e) => {
                            return setNombreCategore({
                              ...nombreCategore,
                              precio: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </Grid>
              </div>
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
