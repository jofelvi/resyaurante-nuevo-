import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editView } from "../../store/reportes/actions";

// Material UI
import { makeStyles } from "@material-ui/core";

const routes = [
  {
    label: "Impresoras",
    path: "/",
  },
  {
    label: "Gastos",
    path: "/gastos",
  },
  {
    label: "Flujo de caja",
    path: "/flujo-caja",
  },
  {
    label: "Pedidos",
    path: "/pedidos",
  },
  {
    label: "Asistencia",
    path: "/asistencia",
  },
  {
    label: "Back Office",
    path: "/back-office",
  },
  {
    label: "Modo Prueba",
    path: "/mode-prueba",
  },
  {
    label: "Configuracion",
    path: "/Configuracion",
  },
  {
    label: "Noticias",
    path: "/noticias",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "25%",
    backgroundColor: "#1e3a56",
    padding: 0,
    height: "85vh",
  },
  container: {
    width: "100%",
  },
  paper: {
    position: "relative",
    width: 250,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0, 1),
  },
  colorText: {
    color: "#fff",
  },
}));

const SideNav = () => {
  const classes1 = useStyles();
  const dispatch = useDispatch();
  const cambiarVista = (vista) => {
    dispatch(editView(vista));
  };

  return (
    <div className={classes1.root}>
      {routes.map((item, index) => (
        <div
          key={index}
          style={{
            borderBottom: `0.5px solid #fff`,
            // backgroundColor: methodPayment === item.nombre ? "#000" : "",
          }}
        >
          <Link
            style={{
              width: "100%",
              color: "#fff",
              textDecoration: "none",
            }}
            className="d-flex justify-content-center py-2"
            onClick={() => cambiarVista(item.path)}
          >
            {item.label}
          </Link>
        </div>
      ))}

      <div
        style={{
          borderBottom: `0.5px solid #fff`,
          // backgroundColor: methodPayment === item.nombre ? "#000" : "",
        }}
      >
        <Link
          style={{
            width: "100%",
            color: "#fff",
            textDecoration: "none",
          }}
          className="d-flex justify-content-center py-2"
          // onClick={() => setmethodoPayment(item.nombre)}
        >
          Desconectar
        </Link>
      </div>
    </div>
  );
};

export default withRouter(SideNav);
