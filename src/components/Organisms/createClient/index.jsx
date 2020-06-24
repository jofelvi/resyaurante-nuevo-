import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { editClient } from "../../../store/Clients/actions";

const SeachClients = () => {
  const dispatch = useDispatch();
  const [dataClient, setDataCliente] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    comentario: "",
    loading: false,
  });
  const addCliente = (method) => {
    setDataCliente({
      ...dataClient,
      loading: true,
    });
    dispatch(editClient(dataClient, method));
    setTimeout(() => {
      setDataCliente({
        ...dataClient,
        loading: false,
      });
      document.getElementById("form-client").reset();
    }, 500);
  };

  return (
    <div className="col-7 border">
      <div className="py-3 d-flex justify-content-center border-bottom">
        <h5>Nuevo Cliente</h5>
      </div>
      <div className=" d-flex mx-0 px-0 justify-content-center col-12 ">
        <form className="my-4 col-12 mx-0 px-0" id="form-client">
          <div className="form-row m-0 p-0">
            <div className="d-flex justify-content-between col-12 m-0 p-0">
              <div className="form-group col-6">
                <label for="inputEmail">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Apellidos"
                  // defaultValue={categoria}
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      apellido: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-6">
                <label for="inputPassword">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Nombres"
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      nombre: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between col-12">
              <div className="form-group col-6">
                <label for="inputEmail1">Telefonos</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail1"
                  placeholder="Telefonos"
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      telefono: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-6">
                <label for="inputPassword1">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword1"
                  placeholder="Email"
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center col-12">
              <div className="form-group col-12">
                <label for="inputEmail2">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail2"
                  placeholder="Direccion"
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      direccion: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between col-12">
              <div className="form-group col-6">
                <label for="inputEmail3">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Ciudad"
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      ciudad: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-6">
                <label for="inputPassword2">Codigo Postal</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Codigo Postal"
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      codigoPostal: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center col-12">
              <div className="form-group col-12">
                <label for="inputEmail4">Comentario sobre el cliente</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder=""
                  onChange={(e) => {
                    return setDataCliente({
                      ...dataClient,
                      comentario: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        className="py-2 btn btn-primary d-flex justify-content-center"
        onClick={() => addCliente("Add")}
      >
        {dataClient.loading ? <CircularProgress /> : <h5>Guardar</h5>}
      </div>
    </div>
  );
};

export default SeachClients;
