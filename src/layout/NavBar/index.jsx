import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

// Material UI
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  // Avatar
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

// Icons
import {
  Menu as MenuIcon,
  ExpandMore,
  PersonOutline,
  PowerSettingsNew,
} from "@material-ui/icons";
import { signOut } from "../../store/auth/actions";

import styles from "./styles";

const NavBar = ({ handleOpenSideNav, userProfile, history }) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const [redireccionar, setredireccionar] = useState(false);
  const logout = async () => {
    localStorage.removeItem("user");
    dispatch(signOut());
    setredireccionar(true);
  };

  const renderMenu = (
    <Menu
      elevation={1}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleCloseMenu}>
        <PersonOutline className={classes.icon} />
        Mi perfil
      </MenuItem>
      <MenuItem onClick={() => logout()}>
        <PowerSettingsNew className={classes.icon} />
        Cerrar sesión
      </MenuItem>
    </Menu>
  );

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <AppBar position="fixed" color="inherit" className={classes.grow}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleOpenSideNav}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Restaurant System
          </Typography>
          <div className={classes.grow} />
          <div className={classes.menu}>
            <Button
              onClick={handleOpenMenu}
              color="inherit"
              className={classes.user}
            >
              {/* <Avatar className={classes.avatar}>E</Avatar> */}
              <Typography
                variant="subtitle2"
                noWrap
                className={classes.username}
              >
                {userProfile.firstName} {userProfile.lastName}
                {/* {userProfile} */}
              </Typography>
              <ExpandMore className={classes.arrow} />
            </Button>
          </div>
          {renderMenu}
        </Toolbar>
      </AppBar>

      {redireccionar ? (
        <Redirect
          to={{
            pathname: "/sign-in",
          }}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default NavBar;
