import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutReport from "../../layout-reportes";
import Impresora from "./impresoras";
import Gastos from "./gastos";
import FlujoCaja from "./flujo-caja";
import Pedidos from "./pedidos";

const Reports = () => {
  const vista = useSelector((state) => state.reportes);

  const [componenteVista, setcomponenteVista] = useState(<Impresora />);
  useEffect(() => {
    CambiarVista(vista.view);
  }, [vista]);
  const CambiarVista = (view) => {
    switch (view) {
      case "/":
        setcomponenteVista(<Impresora />);
        break;
      case "/gastos":
        setcomponenteVista(<Gastos />);
        break;
      case "/flujo-caja":
        setcomponenteVista(<FlujoCaja />);
        break;
      case "/pedidos":
        setcomponenteVista(<Pedidos />);
        break;
      case "/asistencia":
        setcomponenteVista(<div />);
        break;
      case "/back-office":
        setcomponenteVista(<div />);
        break;
      case "/mode-prueba":
        setcomponenteVista(<div />);
        break;

      default:
        setcomponenteVista(<Impresora />);
    }
  };
  return <LayoutReport>{componenteVista}</LayoutReport>;
};

export default Reports;
