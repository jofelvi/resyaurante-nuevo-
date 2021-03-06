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
  form,
  setNuevoProd,
  nuevoProd,
  setForm,
  crearNuevoProducto,
  editarProducts,
  uploadImgRef,
}) {
  const classes = useStyles();

  const dataCategories = useSelector((state) => state.categories.categories);
  const [menuproducto, setmenuproducto] = useState(menuItem);
  const [isMerma, setIsMerma] = useState(false);

  const providers = [
    { nombre: "Proveedor 1" },
    { nombre: "Proveedor 2" },
    { nombre: "Proveedor 3" },
    { nombre: "Proveedor 4" },
  ];

  const formatos = [
    { nombre: "Caja" },
    { nombre: "Manojo" },
    { nombre: "Capsula" },
    { nombre: "Latas" },
    { nombre: "Botella" },
    { nombre: "Bolsa" },
    { nombre: "Otro" },
  ];

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
            Agregar nuevo Ingrediente
          </Typography>
          <div className="d-flex align-items-center">
            <Button
              autoFocus
              color="inherit"
              style={{ fontSize: 16, marginLeft: 10 }}
              onClick={form.nuevo === true ? crearNuevoProducto : editarProducts}
            >
              {form.nuevo ? "Agregar" : "Editar"}
            </Button>
          </div>
        </div>

        <DialogContent className="p-0">
          <div className="justify-content-center col-12 bg-light">
            <List>
              <div className="row p-4">
                <Grid item md={12}>
                  <div className="row justify-content-center">
                    {form.alertError ? (
                      <div
                        className={`alert ${form.alertError} text-center my-4 col-sm-8 col-md-10`}
                        role="alert"
                      >
                        {form.msjalertError}
                      </div>
                    ) : (
                      ""
                    )}
                    <form
                      className="my-4  col-12"
                      // onSubmit={}
                    >
                      <div className="form-row justify-content-center">
                        <div className="form-group col-10">
                          <label for="inputZip">Nombre del Producto</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                            placeholder="Nombre"
                            defaultValue={form.editData ? form.editData.nombre : ""}
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                nombre: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="form-group col-10">
                          <label for="inputZip1">Descripcion del Producto</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip1"
                            placeholder="Descripcion"
                            defaultValue={form.editData ? form.editData.descripcion : ""}
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                descripcion: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="form-group col-10">
                          <label>Agregar una Imagen</label>
                          <input type="file" accept="image/*" ref={uploadImgRef} />
                        </div>

                        <div className="form-group col-10">
                          <label>Categoria</label>
                          <select
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                categories: e.target.value,
                              });
                            }}
                            defaultChecked={form.edit ? form.editData.categories : ""}
                            className="custom-select"
                            defaultValue={form.edit ? form.editData.categories : ""}
                          >
                            <option selected>Categoria...</option>

                            {dataCategories.map((item, index) => (
                              <option key={index} value={item.nombre}>
                                {item.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-10">
                          <label>Proveedor</label>
                          <select
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                proveedor: e.target.value,
                              });
                            }}
                            defaultChecked={form.edit ? form.editData.proveedor : ""}
                            className="custom-select"
                            defaultValue={form.edit ? form.editData.proveedor : ""}
                          >
                            <option selected>Proveedor...</option>

                            {providers.map((item, index) => (
                              <option key={index} value={item.nombre}>
                                {item.nombre}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group col-10">
                          <label>Formato</label>
                          <select
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                formato: e.target.value,
                              });
                            }}
                            defaultChecked={form.edit ? form.editData.proveedor : ""}
                            className="custom-select"
                            defaultValue={form.edit ? form.editData.proveedor : ""}
                          >
                            <option selected>Formato...</option>

                            {formatos.map((item, index) => (
                              <option key={index} value={item.nombre}>
                                {item.nombre}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group col-10">
                          <label>Presentacion</label>
                          <select
                            onChange={(e) => {
                              if (e.target.value === "KG" || e.target.value === "G") {
                                setIsMerma(true);
                              } else {
                                setIsMerma(false);
                                nuevoProd.pesoBruto = 0;
                                nuevoProd.pesoNeto = 0;
                                nuevoProd.merma = 100;
                              }
                              return setNuevoProd({
                                ...nuevoProd,
                                presentacion: e.target.value,
                              });
                            }}
                            defaultChecked={form.edit ? form.editData.presentacion : ""}
                            className="custom-select"
                            defaultValue={form.edit ? form.editData.presentacion : ""}
                          >
                            <option selected>Presentacion...</option>
                            <option value="G">G</option>
                            <option value="KG">KG</option>
                            <option value="LTR">LTR</option>
                            <option value="ML">ML</option>
                            <option value="Unidad">Unidad</option>
                          </select>
                        </div>

                        {isMerma && (
                          <div className="form-group col-10">
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip7">Peso bruto:</label>
                              <input
                                type="number"
                                className="form-control col-8 ml-3"
                                id="inputZip7"
                                placeholder="Peso bruto"
                                min="0"
                                max="100"
                                defaultValue={form.editData ? form.editData.pesoBruto : 0}
                                onChange={(e) => {
                                  return setNuevoProd({
                                    ...nuevoProd,
                                    pesoBruto: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip7">Peso neto:</label>
                              <input
                                type="number"
                                className="form-control col-8 ml-3"
                                id="inputZip7"
                                placeholder="Peso neto"
                                defaultValue={form.editData ? form.editData.pesoNeto : 0}
                                min="0"
                                max="100"
                                onChange={(e) => {
                                  return setNuevoProd({
                                    ...nuevoProd,
                                    pesoNeto: e.target.value,
                                    merma: nuevoProd.pesoBruto - e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip7">Merma: {nuevoProd.merma}%</label>
                            </div>
                          </div>
                        )}

                        <div className="form-group col-10">
                          <label for="inputZip3">Cantidad</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip3"
                            placeholder="Cantidad"
                            defaultValue={form.editData ? form.editData.stock : ""}
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                stock: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="form-group col-10">
                          <label for="inputZip3">Stock Min</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip3"
                            placeholder="Stock min"
                            defaultValue={form.editData ? form.editData.stockMin : ""}
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                stockMin: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="form-group col-10">
                          <label for="inputZip3">Stock Max</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip3"
                            placeholder="Stock masx"
                            defaultValue={form.editData ? form.editData.stockMax : ""}
                            onChange={(e) => {
                              return setNuevoProd({
                                ...nuevoProd,
                                stockMax: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="form-group col-10">
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch2"
                              defaultChecked={form.editData ? form.editData.disponible : false}
                              onChange={(e) => {
                                setNuevoProd({
                                  ...nuevoProd,
                                  presentaciones: e.target.checked,
                                });

                                setForm({
                                  ...form,
                                  presentaciones: e.target.checked,
                                });
                              }}
                            />
                            <label className="custom-control-label" for="customSwitch2">
                              diferentes presentaciones
                            </label>
                          </div>
                        </div>
                        <h6 className="form-group mb-4 align-text-center col-10">
                          Precio del Producto - Presentacion :
                        </h6>
                        {form.presentaciones ? (
                          <Fragment>
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip4">Pequeño:</label>
                              <input
                                type="text"
                                className="form-control col-8 ml-3"
                                id="inputZip4"
                                placeholder="Precio"
                                defaultValue={form.editData ? form.editData.sm : ""}
                                onChange={(e) => {
                                  return setNuevoProd({
                                    ...nuevoProd,
                                    sm: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip5">Mediano:</label>
                              <input
                                type="text"
                                className="form-control col-8 ml-3"
                                id="inputZip5"
                                placeholder="Precio"
                                defaultValue={form.editData ? form.editData.md : ""}
                                onChange={(e) => {
                                  return setNuevoProd({
                                    ...nuevoProd,
                                    md: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip6">Grande: </label>
                              <input
                                type="text"
                                className="form-control col-8 ml-4"
                                id="inputZip6"
                                placeholder="Precio"
                                defaultValue={form.editData ? form.editData.lg : ""}
                                onChange={(e) => {
                                  return setNuevoProd({
                                    ...nuevoProd,
                                    lg: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="form-group col-10 d-flex aling-item-center">
                              <label for="inputZip7">Precio unitario:</label>
                              <input
                                type="text"
                                className="form-control col-8 ml-3"
                                id="inputZip7"
                                placeholder="Precio"
                                defaultValue={form.editData ? form.editData.precioUnitario : ""}
                                onChange={(e) => {
                                  return setNuevoProd({
                                    ...nuevoProd,
                                    precioUnitario: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Fragment>
                        )}
                        <div className="form-group col-10">
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch1"
                              defaultChecked={form.editData ? form.editData.disponible : true}
                              onChange={(e) => {
                                return setNuevoProd({
                                  ...nuevoProd,
                                  disponible: e.target.checked,
                                });
                              }}
                            />
                            <label className="custom-control-label" for="customSwitch1">
                              Disponible
                            </label>
                          </div>
                        </div>
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
