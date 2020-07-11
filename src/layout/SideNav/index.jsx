import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

// Material UI
import { Drawer, Hidden } from "@material-ui/core";

import Menu from "./Menu";
import styles from "./styles";
import { filterUserRol } from "./filterRol";

const SideNav = (props) => {
  const classes = styles();
  const { open, handleOpen, location } = props;
  const [routes, setnewRoutes] = useState([]);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.info) {
      setnewRoutes([
        {
          title: "Menu",
          routes: filterUserRol(auth.info.rol),
        },
        {
          title: "Configuración",
          routes: [
            {
              label: "Usuarios",
              path: "/users",
            },
            {
              label: "Reportes",
              path: "/reportes",
            },
          ],
        },
      ]);
    }
  }, [auth.info]);
  // console.log("desde el inicial state: ", newRoutes);
  // let routes = [

  // ];

  return (
    <nav className={`${classes.drawer}`}>
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
      {/* <Hidden smDown implementation="css">
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
      </Hidden> */}
    </nav>
  );
};

export default withRouter(SideNav);
