import React from "react";
import { useSelector } from "react-redux";

const SeachClients = () => {
  const clients = useSelector((state) => state.clients.clients);

  const asignarOrden = (client) => {
    console.log("=======================================================");
    console.log("asignando orden a : ", client);
    console.log("=======================================================");
  };
  return (
    <div className="col-5 border">
      <div className="py-3 d-flex justify-content-center border-bottom">
        <h5>Todos los clientes</h5>
      </div>
      {clients.map((item) => (
        <div
          key={item.id}
          className="py-3 btn d-flex justify-content-center border-bottom"
          onClick={() => asignarOrden(item)}
        >
          {`${item.nombre} ${item.apellido}`}
        </div>
      ))}
    </div>
  );
};

export default SeachClients;
