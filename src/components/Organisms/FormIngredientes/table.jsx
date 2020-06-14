import React, { Fragment } from "react";
import ProductoCardRow from "../../Molecules/ProductCard/variants/ViewRow";
// Material UI
import { Grid } from "@material-ui/core";

const tableProducts = ({ dataProducts, eliminarProducts, edit }) => {
  const gridSize = {
    xs: 12,
    sm: 6,
    md: 5,
    lg: 4,
    xl: 4,
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
  );
};
export default tableProducts;
