import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalGastos from "./modalGasto";
const Gastos = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const modal = () => {
    setmodalOpen(true);
  };
  const handleClose = () => {
    setmodalOpen(false);
  };

  const tableGastos = useSelector((state) => state.reportes.gastos);

  // const tableGastos = [
  //   {
  //     fecha: "00/00/00",
  //     monto: "20.000",
  //     iva: "12",
  //     pago: "30.000",
  //     importe: "50.000",
  //   },
  //   {
  //     fecha: "00/00/00",
  //     monto: "20.000",
  //     iva: "12%",
  //     pago: "30.000",
  //     importe: "50.000",
  //   },
  //   {
  //     fecha: "00/00/00",
  //     monto: "20.000",
  //     iva: "12%",
  //     pago: "30.000",
  //     importe: "50.000",
  //   },
  //   {
  //     fecha: "00/00/00",
  //     monto: "20.000",
  //     iva: "12%",
  //     pago: "30.000",
  //     importe: "50.000",
  //   },
  // ];

  return (
    <div>
      <div className="table-responsive">
        <table
          id="datatable-buttons"
          className="table table-striped dt-responsive nowrap"
        >
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Iva</th>
              <th>Pago</th>
              <th>Importe</th>
            </tr>
          </thead>

          <tbody>
            {tableGastos.length !== 0 ? (
              tableGastos.map((item) => (
                <tr key={item.pago}>
                  <td>{item.fecha}</td>
                  <td>{item.monto}</td>
                  <td>{item.iva + "%"}</td>
                  <td>{item.pago}</td>
                  <td>{item.importe}</td>
                </tr>
              ))
            ) : (
              <div className="col-12 justify-content-center mt-2">
                No Hay Gastos
              </div>
            )}
          </tbody>
        </table>

        <div className="col-12 d-flex justify-content-center mt-2">
          <div
            className="btn col-6 bg-primary py-2 text-white"
            onClick={() => modal()}
          >
            Añadir Gastos
          </div>
        </div>
      </div>
      <ModalGastos handleClose={handleClose} openModal={modalOpen} />
    </div>
  );
};
export default Gastos;
