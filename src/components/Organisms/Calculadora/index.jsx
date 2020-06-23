import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Grid, makeStyles, Button } from "@material-ui/core";
const styles = makeStyles({
  root: {
    display: "flex",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "end",
  },
});
const MenuList = () => {
  const classStyles = styles();

  const borderRight =
    "col-3 py-3 d-flex justify-content-center border-right rounded-0";
  const paddingYjustify = "col-3 py-3 d-flex justify-content-center";
  const borderBottom = "col-12 d-flex p-0 border-bottom";

  return (
    <Grid container>
      <div className="col-11 m-0 p-0">
        <div className="d-flex">
          <div
            className="col-5 py-1 m-0 "
            style={{ height: 70, border: `1px solid #b2b2b2` }}
          >
            <p className={classStyles.title} style={{ color: "#b2b2b2" }}>
              Por Pagar
            </p>
            <p className={classStyles.subtitle} style={{ color: "#b2b2b2" }}>
              291.20
            </p>
          </div>
          <div
            className="col-7 py-1 m-0"
            style={{ height: 70, border: `1px solid #b2b2b2` }}
          >
            <p className={classStyles.title} style={{ color: "#007bff" }}>
              PAGO
            </p>
            <p className={classStyles.subtitle} style={{ color: "#007bff" }}>
              30.00
            </p>
          </div>
        </div>

        <div className="mt-1 border">
          <div className={borderBottom}>
            <Button className={borderRight}>C</Button>
            <Button className={borderRight}>/2</Button>
            <Button className={borderRight}>/3</Button>
            <Button className={paddingYjustify}>/</Button>
          </div>
          <div className={borderBottom}>
            <Button className={borderRight}>7</Button>
            <Button className={borderRight}>8</Button>
            <Button className={borderRight}>9</Button>
            <Button className={paddingYjustify}>x</Button>
          </div>
          <div className={borderBottom}>
            <Button className={borderRight}>4</Button>
            <Button className={borderRight}>5</Button>
            <Button className={borderRight}>6</Button>
            <Button className={paddingYjustify}>-</Button>
          </div>
          <div className={borderBottom}>
            <Button className={borderRight}>1</Button>
            <Button className={borderRight}>2</Button>
            <Button className={borderRight}>3</Button>
            <Button className={paddingYjustify}>+</Button>
          </div>
          <div className="col-12 p-0 d-flex">
            <Button className={borderRight}>00</Button>
            <Button className={borderRight}>0</Button>
            <Button className={borderRight}>=</Button>
            <Button className={paddingYjustify}>#</Button>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default MenuList;
