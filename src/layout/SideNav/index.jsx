import React from "react";
import { withRouter } from "react-router-dom";

// Material UI
import { Drawer, Hidden } from "@material-ui/core";

import Menu from "./Menu";
import styles from "./styles";

const routes = [
  {
    title: "Menu",
    routes: [
      {
        label: "Dashboard",
        path: "/",
      },
      {
        label: "Pedidos",
        path: "/pedidos",
      },
      {
        label: "Menu Lista",
        path: "/all-menu",
      },
      {
        label: "Ingredientes",
        path: "/ingredientes",
      },
      {
        label: "Crear menu",
        path: "/crear-menu",
      },
      {
        label: "Mesas",
        path: "/tables",
      },
      {
        label: "Deliverys",
        path: "/deliverys",
      },
      {
        label: "Cocinas",
        path: "/kitchens",
      },
      {
        label: "Barras",
        path: "/bars",
      },
    ],
  },
  {
    title: "Configuración",
    routes: [
      {
        label: "Usuarios",
        path: "/users",
      },
    ],
  },
];

const SideNav = (props) => {
  const classes = styles();
  const { open, handleOpen, location } = props;

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Menu routes={routes} location={location} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaperDesktop,
          }}
          PaperProps={{
            elevation: 1,
          }}
          variant="permanent"
          open
        >
          <Menu routes={routes} location={location} />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default withRouter(SideNav);
