import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";

import { Add } from "@material-ui/icons";

const DropdownMenu = ({
  className,
  label,
  options = [],

  products,
  estatico,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleItemMenuOnClick = (label) => () => {
    // if (cb) {
    //   cb();
    // }
    if (label === "Menu") {
      estatico("Menu");
    } else if (label === "Personalizado") {
      estatico("Personalizado");
    }
    handleCloseMenu();
  };

  return (
    <>
      <Tooltip title={label} aria-label={label}>
        <IconButton
          aria-label={label}
          className={className}
          onClick={handleOpenMenu}
        >
          <Add />
        </IconButton>
      </Tooltip>
      {options.length > 0 && (
        <Menu
          elevation={5}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          // anchorOrigin={{ vertical: "buttom", horizontal: "right" }}
          // transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={isMenuOpen}
          onClose={handleCloseMenu}
        >
          {options.map(({ label, link, to, onClick }, index) => {
            return (
              <MenuItem key={index} onClick={handleItemMenuOnClick(label)}>
                {label}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </>
  );
};

export default DropdownMenu;
