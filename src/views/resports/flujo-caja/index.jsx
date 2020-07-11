import React from "react";
import CreditCardIcon from "@material-ui/icons/CreditCard";
const FlujoCaja = () => {
  const caja = [
    {
      metodoPago: "Debito",
      cantidad: "4",
      total: "60.00",
    },
    {
      metodoPago: "Debito",
      cantidad: "4",
      total: "60.00",
    },
    {
      metodoPago: "Debito",
      cantidad: "4",
      total: "60.00",
    },
    {
      metodoPago: "Debito",
      cantidad: "4",
      total: "60.00",
    },
  ];

  return (
    <div>
      <div className="table-responsive">
        <div
          style={{ fontSize: 18 }}
          className="bg-white col-12 py-2 text-primary d-flex justify-content-center mt-2"
        >
          En Curso
        </div>
        <table
          id="datatable-buttons"
          className="table table-striped dt-responsive nowrap"
        >
          <thead>
            <tr>
              <th>Metodo de Pago</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {caja.map((item) => (
              <tr key={item.total}>
                <td>
                  <CreditCardIcon /> {item.metodoPago}
                </td>
                <td>{item.cantidad}</td>
                <td>{item.total}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td></td>
              <td className="text-primary">20.00</td>
            </tr>
          </tbody>
        </table>

        <div className="col-12 d-flex justify-content-around mt-2">
          <div className="btn col-5 bg-white py-3 text-primary">
            Saldo inicial de caja: 0,00
          </div>
          <div className="btn col-5 bg-white py-3 text-primary">
            Saldo de caja total: 200,00
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-4">
          <div className="btn col-11 bg-primary py-3 text-white">
            Tienes pedidos aun abiertos, por favor ciérralos
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlujoCaja;
