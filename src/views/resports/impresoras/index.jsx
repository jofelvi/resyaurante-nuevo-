import React from "react";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
const Impresora = () => {
  const impresoras = [
    {
      impresora: "ton-223.43",
      rol: "caja.Cocina",
      prueba: "Prueba de impresora",
    },
    {
      impresora: "ton-223.43",
      rol: "caja.Pasillo",
      prueba: "Prueba de impresora",
    },
    {
      impresora: "ton-223.43",
      rol: "caja.Delivery",
      prueba: "Prueba de impresora",
    },
    {
      impresora: "ton-223.43",
      rol: "caja.Auto",
      prueba: "Prueba de impresora",
    },
  ];

  return (
    <div>
      <div className="table-responsive">
        <table
          id="datatable-buttons"
          className="table table-striped dt-responsive nowrap"
        >
          <thead>
            <tr>
              <th>Impresoras</th>
              <th>Rol</th>
              <th>Pruebas</th>
            </tr>
          </thead>

          <tbody>
            {impresoras.map((item) => (
              <tr key={item.rol}>
                <td>
                  <LocalPrintshopIcon /> {item.impresora}
                </td>
                <td>{item.rol}</td>
                <td className="text-primary btn btn-sm">{item.prueba}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-bottom">
          <p className="m-0">Impresoras detectastas</p>
        </div>
        {impresoras.map((item) => (
          <div className="my-2">
            <p className="m-0">
              <LocalPrintshopIcon /> {item.impresora}
            </p>
          </div>
        ))}

        <div className="col-12 d-flex justify-content-center mt-2">
          <div className="btn col-6 bg-primary py-2 text-white">
            Actualizar Impresoras
          </div>
        </div>
        <div className="alert alert-primary col-12 btn btn-sm d-flex justify-content-center mt-2">
          Problemas para conectar tus impresoras? Haz click aquí para encontrar
          ayuda sobre tu problema
        </div>
      </div>
    </div>
  );
};
export default Impresora;
