import React from "react";
import { useSelector } from "react-redux";

// Material UI
import { List, ListSubheader } from "@material-ui/core";

import MenuItem from "./MenuItem";
import styles from "./styles";

const Menu = ({ routes, location }) => {
  const classes = styles();
  let itemSelected = location.pathname;

  const handleSelectedItem = (value) => () => {
    itemSelected = value;
  };
  const userLogin = useSelector((state) => state.auth);

  return routes.map((item, i) => {
    if (i === 1 && userLogin.info.rol !== "ADMIN_MASTER") return;

    return (
      <List
        key={item.title}
        component="nav"
        subheader={<ListSubheader component="span">{item.title}</ListSubheader>}
        className={classes.nav}
      >
        {item.routes.map((item, index) => (
          <MenuItem
            key={index}
            label={item.label}
            path={item.path}
            selected={itemSelected === item.path}
            onClick={handleSelectedItem(item.path)}
          />
        ))}
      </List>
    );
  });
};

export default Menu;
