import React from "react";

// Material UI
import { List, ListSubheader } from "@material-ui/core";

import MenuItem from "./MenuItem";
import styles from "./styles";

const Menu = ({ routes, location }) => {
  const classes = styles();
  let itemSelected = location.pathname;
  // const [itemSelected, setItemSelected] = React.useState(location.pathname);

  const handleSelectedItem = (value) => () => {
    // setItemSelected(value);
    itemSelected = value;
  };

  return routes.map((item) => (
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
  ));
};

export default Menu;
