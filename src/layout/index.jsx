import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import SideNav from "./SideNav";

import styles from "./styles";

const Layout = ({ children, profile }) => {
  const classes = styles();

  const auth = useSelector((state) => state.auth.info);
  let [mobileOpen, setMobileOpen] = React.useState(false);

  function handleOpenSideNav() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <NavBar handleOpenSideNav={handleOpenSideNav} userProfile={auth} />
      <SideNav open={mobileOpen} handleOpen={handleOpenSideNav} />

      <main className={classes.main}>
        {/* <Breadcrumb /> */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
