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

  const listPorPagar = useSelector((state) => state.listaPorPagar);
  const [inputMontos, setinputMontos] = useState("");

  const Calcular = (input) => {
    var f = {
      add: "+",
      sub: "-",
      div: "/",
      mlt: "*",
      mod: "%",
      exp: "^",
    };

    // Create array for Order of Operation and precedence
    f.ooo = [
      [[f.mlt], [f.div], [f.mod], [f.exp]],
      [[f.add], [f.sub]],
    ];

    input = input.replace(/[^0-9%^*\/()\-+.]/g, ""); // clean up unnecessary characters

    let output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {
      // Regular Expression to look for operators between floating numbers or integers
      var re = new RegExp(
        "(\\d+\\.?\\d*)([\\" + f.ooo[i].join("\\") + "])(\\d+\\.?\\d*)"
      );
      re.lastIndex = 0; // take precautions and reset re starting pos

      // Loop while there is still calculation for level of precedence
      while (re.test(input)) {
        output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) return output; // exit early if not a number
        input = input.replace(re, output);
      }
    }

    setinputMontos(output);

    function _calculate(a, op, b) {
      a = a * 1;
      b = b * 1;
      switch (op) {
        case f.add:
          return a + b;
          break;
        case f.sub:
          return a - b;
          break;
        case f.div:
          return a / b;
          break;
        case f.mlt:
          return a * b;
          break;
        case f.mod:
          return a % b;
          break;
        case f.exp:
          return Math.pow(a, b);
          break;
        //     default:
        //       0;
      }
    }
  };

  const borderRight =
    "col-3 py-3 d-flex justify-content-center border-right rounded-0";
  const paddingYjustify = "col-3 py-3 d-flex justify-content-center";
  const borderBottom = "col-12 d-flex p-0 border-bottom";

  return (
    <Grid container>
      <div className="col-11 m-0 p-0">
        <div className="d-flex">
          <div
            className="col-5  m-0 "
            style={{ height: 50, border: `1px solid #b2b2b2` }}
          >
            <p
              className={`${classStyles.title} p-0 m-0`}
              style={{ color: "#b2b2b2" }}
            >
              Por Pagar
            </p>
            <p
              className={`${classStyles.subtitle} p-0 m-0`}
              style={{ color: "#b2b2b2" }}
            >
              {listPorPagar.productoPorPagar}
            </p>
          </div>
          <div
            className="col-7 m-0"
            style={{ height: 50, border: `1px solid #b2b2b2` }}
          >
            <p
              className={`${classStyles.title} p-0 m-0`}
              style={{ color: "#007bff" }}
            >
              PAGO
            </p>
            <p
              className={`${classStyles.subtitle} p-0 m-0`}
              style={{ color: "#007bff" }}
            >
              {listPorPagar.productsPagados}
            </p>
          </div>
        </div>

        <div className="col-12 d-flex flex-wrap my-1 p-0">
          {listPorPagar.listaPedidosPorPagar.map((item, i) => (
            <div
              key={i}
              className="bg-primary btn mx-1 mb-1 px-2"
              style={{
                color: "#fff",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              {item.nombre}
            </div>
          ))}
        </div>
        <div className="form-group col-12 p-0 m-0">
          <p
            className={`${classStyles.subtitle} p-0 m-0`}
            style={{ color: "#007bff", fontSize: 20 }}
          >
            {inputMontos}
          </p>
        </div>

        <div className="mt-1 border">
          <div className={borderBottom}>
            <Button onClick={() => setinputMontos("")} className={borderRight}>
              C
            </Button>
            <Button
              onClick={() => Calcular(inputMontos + "/2")}
              className={borderRight}
            >
              /2
            </Button>
            <Button
              onClick={() => Calcular(inputMontos + "/3")}
              className={borderRight}
            >
              /3
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + "/")}
              className={paddingYjustify}
            >
              /
            </Button>
          </div>
          <div className={borderBottom}>
            <Button
              onClick={() => setinputMontos(inputMontos + 7)}
              className={borderRight}
            >
              7
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + 8)}
              className={borderRight}
            >
              8
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + 9)}
              className={borderRight}
            >
              9
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + "*")}
              className={paddingYjustify}
            >
              x
            </Button>
          </div>
          <div className={borderBottom}>
            <Button
              onClick={() => setinputMontos(inputMontos + 4)}
              className={borderRight}
            >
              4
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + 5)}
              className={borderRight}
            >
              5
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + 6)}
              className={borderRight}
            >
              6
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + "-")}
              className={paddingYjustify}
            >
              -
            </Button>
          </div>
          <div className={borderBottom}>
            <Button
              onClick={() => setinputMontos(inputMontos + 1)}
              className={borderRight}
            >
              1
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + 2)}
              className={borderRight}
            >
              2
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + 3)}
              className={borderRight}
            >
              3
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + "+")}
              className={paddingYjustify}
            >
              +
            </Button>
          </div>
          <div className="col-12 p-0 d-flex">
            <Button
              onClick={() => setinputMontos(inputMontos + "00")}
              className={borderRight}
            >
              00
            </Button>
            <Button
              onClick={() => setinputMontos(inputMontos + "0")}
              className={borderRight}
            >
              0
            </Button>
            <Button
              onClick={() => Calcular(inputMontos)}
              className={borderRight}
            >
              =
            </Button>
            <Button className={paddingYjustify}></Button>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default MenuList;
