import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";

import { MoreVert } from "@material-ui/icons";

const DropdownMenu = ({ className, label, options = [], edit, products, eliminarProducts }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleItemMenuOnClick = (label) => () => {
    if (label === "Editar") {
      edit(products);
    } else if (label === "Eliminar") {
      eliminarProducts(products);
    } else {
      edit(products, label);
    }
    handleCloseMenu();
  };

  return (
    <>
      <Tooltip title={label} aria-label={label}>
        <IconButton aria-label={label} className={className} onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      {options.length > 0 && (
        <Menu
          elevation={1}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={isMenuOpen}
          onClose={handleCloseMenu}
        >
          {options.map(({ label, link, to, onClick }, index) => {
            if (link) {
              return (
                <MenuItem key={index} component={Link} to={to}>
                  {label}
                </MenuItem>
              );
            }
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
