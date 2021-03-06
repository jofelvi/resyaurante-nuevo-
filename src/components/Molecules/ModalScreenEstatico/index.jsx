import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useSelector, useDispatch } from "react-redux";
import createHash from "hash-generator";

import DialogContent from "@material-ui/core/DialogContent";
import { addProductosCosto } from "../../../store/agregaralaCuenta/actions";

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
  const productsItems = menuItem.products;
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const costosAddCuenta = useSelector(
    (state) => state.addcuenta.productsCuenta
  );
  const listaProducts = useSelector((state) => state.addcuenta.listaProducts);
  const IngredientesExtras = allProducts.filter(
    (item) => item.categories === "Extras"
  );
  const productsBase = allProducts.filter(
    (item) => item.categories === "Bases"
  );
  const [selectExtras, setselectExtras] = useState([]);
  const [arrayMarcaExtra, setarrayMarcaExtra] = useState([]);
  const [selectBases, setselectBases] = useState([]);

  const handleChangeCheckbox = (extra) => {
    setselectExtras([...selectExtras, extra]);
    setarrayMarcaExtra([...arrayMarcaExtra, extra.nombre]);
    let arraynuevo = selectExtras.filter(
      (item) => item.nombre === extra.nombre
    );
    if (arraynuevo.length === 1) {
      let array = selectExtras.filter((item) => item.nombre !== extra.nombre);
      let marcado = arrayMarcaExtra.filter((item) => item !== extra.nombre);
      setarrayMarcaExtra(marcado);
      setselectExtras(array);
    }
  };
  const handleChangeCheckboxBases = (extra, checked) => {
    setselectBases(extra);
  };

  const [menuproducto, setmenuproducto] = useState(menuItem);

  const siguientesModal = () => {
    const menuNuevo = {
      precioUnitario: menuItem.precioUnitario
        ? menuItem.precioUnitario
        : menuItem.precio,
      categories: menuItem.categories,
      nombre: menuItem.nombre,
      base: selectBases.nombre ? [selectBases.nombre] : ["Sin base"],
      extras: selectExtras,
      cantidad: menuproducto.cantidad ? menuproducto.cantidad : 1,
      comentario: menuproducto.comentario ? menuproducto.comentario : "",
      id: createHash(12),
    };
    const productoslista = [...listaProducts, menuNuevo];

    dispatch(addProductosCosto(productoslista, costosAddCuenta, menuNuevo));
    handleClose();
  };

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
        {/* <AppBar className={classes.appBar}> */}
        <div className="d-flex justify-content-between align-items-center col-12 py-2 px-4">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
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
        {/* </AppBar> */}
        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <List>
              <div className="row p-0">
                <div className="col-12">
                  <Typography variant="h5" className={classes.title}>
                    Elige un acompañante:
                  </Typography>
                </div>
                <div className="col-12 d-flex mt-2 flex-wrap">
                  {productsBase.map((item, index) => (
                    <div
                      key={index}
                      className="form-group btn col-4 p-1 border-0"
                      onClick={(e) =>
                        handleChangeCheckboxBases(item, e.target.checked)
                      }
                    >
                      <div
                        className="border d-flex justify-content-center align-items-center"
                        style={{
                          height: 70,
                          width: "100%",
                          borderRadius: 12,
                          fontSize: 14,
                          background:
                            item.nombre === selectBases.nombre ? "#1e3a56" : "",
                          color:
                            item.nombre === selectBases.nombre
                              ? "#fff"
                              : "#000",
                        }}
                      >
                        {item.nombre} $ {item.precioUnitario}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row p-4">
                <div className="col-12">
                  <Typography variant="h5" className={classes.title}>
                    ¿Quieres añadir algo extra?
                  </Typography>
                </div>
                <div className="col-12 d-flex mt-2 flex-wrap">
                  {IngredientesExtras.map((item, index) => (
                    <div
                      key={index}
                      className="form-group btn col-4 p-1 border-0"
                      onClick={(e) => handleChangeCheckbox(item)}
                    >
                      <div
                        className="border d-flex justify-content-center align-items-center"
                        style={{
                          height: 70,
                          width: "100%",
                          borderRadius: 12,
                          fontSize: 14,
                          background:
                            arrayMarcaExtra.indexOf(item.nombre) !== -1
                              ? "#1e3a56"
                              : "",
                          color:
                            arrayMarcaExtra.indexOf(item.nombre) !== -1
                              ? "#fff"
                              : "#000",
                        }}
                      >
                        {item.nombre} $ {item.precioUnitario}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 p-4">
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
                <div
                  className="col-12 d-flex mt-2 p-2 btn btn-primary justify-content-center"
                  onClick={siguientesModal}
                >
                  Agregar {menuproducto.cantidad ? menuproducto.cantidad : 1}{" "}
                  {menuItem.nombre}
                </div>
              </div>
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
