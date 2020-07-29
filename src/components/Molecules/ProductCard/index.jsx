import React from "react";

// Variants
import { ViewColumn, ViewRow, ViewList } from "./variants";

const ProductCard = ({ variant, products }) => {
  let Component = ViewColumn;
  if (variant === "column") {
    Component = ViewColumn;
  }
  if (variant === "row") {
    Component = ViewRow;
  }
  if (variant === "list") {
    Component = ViewList;
  }

  return <Component products={products} />;
};

export default ProductCard;
