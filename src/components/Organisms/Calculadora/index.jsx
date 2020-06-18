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
    fontSize: 22,
    fontWeight: "normal",
    textAlign: "end",
  },
});
const MenuList = () => {
  const classStyles = styles();
  let gridSize = {
    xs: 12,
    sm: 6,
    md: 5,
    lg: 4,
    xl: 4,
  };

  return (
    <Grid container>
      <div className="col-11 m-0 p-0">
        <div className="d-flex">
          <div
            className="col-5 py-1 m-0 "
            style={{ height: 70, border: `1px solid #b2b2b2` }}
          >
            <p className={classStyles.title} style={{ color: "#b2b2b2" }}>
              Falta por Pagar
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
        <div className="mt-3 border">
          <div
            className="col-12 d-flex p-0 border-bottom"
            // style={{ border: `1px solid #b2b2b2` }}
          >
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              C
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              /2
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              /3
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center ">
              /
            </Button>
          </div>
          <div
            className="col-12 d-flex p-0 border-bottom"
            // style={{ border: `1px solid #b2b2b2` }}
          >
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              7
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              8
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              9
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center ">
              x
            </Button>
          </div>
          <div
            className="col-12 d-flex p-0 border-bottom"
            // style={{ border: `1px solid #b2b2b2` }}
          >
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              4
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              5
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              6
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center ">
              -
            </Button>
          </div>
          <div
            className="col-12 d-flex p-0 border-bottom"
            // style={{ border: `1px solid #b2b2b2` }}
          >
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              1
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0 ">
              2
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              3
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center ">
              +
            </Button>
          </div>
          <div
            className="col-12 p-0 d-flex"
            // style={{ border: `1px solid #b2b2b2` }}
          >
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              00
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              0
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center border-right rounded-0">
              =
            </Button>
            <Button className="col-3 py-3 d-flex justify-content-center ">
              #
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default MenuList;
