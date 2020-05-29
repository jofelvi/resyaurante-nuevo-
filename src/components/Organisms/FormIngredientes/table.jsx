import React from "react";

const tableProducts = ({ dataProducts, eliminarProducts, edit }) => {
  return (
    <div className="col-12 mt-4">
      <div className="table-responsive">
        <table
          id="datatable-buttons"
          className="table table-striped dt-responsive nowrap"
        >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Disponible</th>
              <th>Pequeño</th>
              <th>Mediano</th>
              <th>Grande</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {dataProducts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.disponible === true ? "Disponible" : "Agotado"}</td>
                  <td>{item.sm}</td>
                  <td>{item.md}</td>
                  <td>{item.lg}</td>
                  <td className="d-flex flex-column">
                    <button
                      type="buttom"
                      className="btn btn-danger mb-2 btn-sm"
                      onClick={() => eliminarProducts(item)}
                    >
                      Eliminar
                    </button>
                    <button
                      type="buttom"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        edit(item);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default tableProducts;
