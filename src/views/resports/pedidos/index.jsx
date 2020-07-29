import React from "react";
import SearchIcon from "@material-ui/icons/Search";
const Pedidos = () => {
  const caja = [
    {
      mesa: "a12",
      numero: "32",
      fecha: "00/00/00",
      camarero: "juan pablo",
      importe: "30",
    },
    {
      mesa: "a12",
      numero: "32",
      fecha: "00/00/00",
      camarero: "juan pablo",
      importe: "30",
    },
    {
      mesa: "a12",
      numero: "32",
      fecha: "00/00/00",
      camarero: "juan pablo",
      importe: "30",
    },
    {
      mesa: "a12",
      numero: "32",
      fecha: "00/00/00",
      camarero: "juan pablo",
      importe: "30",
    },
  ];

  return (
    <div className="table-responsive">
      <div className="form-group col-12 d-flex align-items-center">
        <SearchIcon style={{ fontSize: 40 }} />
        <input
          type="text"
          className="form-control"
          placeholder="Buscar Nombre, Mesero ..."
        />
      </div>
      <table
        id="datatable-buttons"
        className="table table-striped dt-responsive nowrap"
      >
        <thead>
          <tr>
            <th>Mesa</th>
            <th>N°</th>
            <th>Fecha</th>
            <th>Camarero</th>
            <th>Importe</th>
          </tr>
        </thead>

        <tbody>
          {caja.map((item) => (
            <tr key={item.mesa}>
              <td>{item.mesa}</td>
              <td>{item.numero}</td>
              <td>{item.fecha}</td>
              <td>{item.camarero}</td>
              <td>{item.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Pedidos;
