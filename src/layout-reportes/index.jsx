import React from "react";
import SideNav from "./SideNav";

import styles from "./styles";

const Layout = ({ children }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <SideNav />

      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
