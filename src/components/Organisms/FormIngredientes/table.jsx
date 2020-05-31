import React, { Fragment } from "react";
import ProductoCardRow from "../../Molecules/ProductCard/variants/ViewRow";
// Material UI
import { Grid } from "@material-ui/core";

const tableProducts = ({ dataProducts, eliminarProducts, edit }) => {
  const gridSize = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 3,
  };
  return (
    <Fragment>
      {dataProducts.map((item, index) => (
        <Grid
          item
          {...gridSize}
          key={index}
          // onClick={() => (nombreCategore.agregar ? menuarray(item) : "")}
        >
          <ProductoCardRow
            variant="row"
            products={item}
            edit={edit}
            eliminarProducts={eliminarProducts}
          />
        </Grid>
      ))}
    </Fragment>
    // <div className="col-12 mt-4">
    //   <div className="table-responsive">
    //     <table
    //       id="datatable-buttons"
    //       className="table table-striped dt-responsive nowrap"
    //     >
    //       <thead>
    //         <tr>
    //           <th>Nombre</th>
    //           <th>Disponible</th>
    //           <th>Categoria</th>
    //           <th>Unitario</th>

    //           <th>Pequeño</th>
    //           <th>Mediano</th>
    //           <th>Grande</th>
    //           <th>Acciones</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {dataProducts.map((item, index) => {
    //           return (
    //             <tr key={index}>
    //               <td>{item.nombre}</td>
    //               <td>{item.disponible === true ? "Disponible" : "Agotado"}</td>
    //               <td>{item.categories}</td>
    //               <td>{item.precioUnitario}</td>
    //               <td>{item.sm}</td>
    //               <td>{item.md}</td>
    //               <td>{item.lg}</td>
    //               <td className="d-flex flex-column">
    //                 <button
    //                   type="buttom"
    //                   className="btn btn-danger mb-2 btn-sm"
    //                   onClick={() => eliminarProducts(item)}
    //                   // onClick={() => console.log(item)}
    //                 >
    //                   Eliminar
    //                 </button>
    //                 <button
    //                   type="buttom"
    //                   className="btn btn-primary btn-sm"
    //                   onClick={() => {
    //                     edit(item);
    //                   }}
    //                 >
    //                   Editar
    //                 </button>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};
export default tableProducts;
