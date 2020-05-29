import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';

import styles from './styles';

const MenuItem = ({
  label,
  path,
  routes,
  selected,
  onClick,
  icon: Icon,
  open
}) => {
  const classes = styles();
  if (routes) {
    return (
      <>
        <ListItem button selected={selected} onClick={onClick}>
          <ListItemIcon>
            <div className={selected ? classes.iconShow : classes.iconHidden}>
              {Icon && <Icon />}
            </div>
          </ListItemIcon>
          <ListItemText
            primary={label}
            classes={{
              primary: selected ? classes.itemSelectedText : classes.itemText
            }}
          />
        </ListItem>
        <Collapse in={open === path} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {routes.map((item, index) => (
              <ListItem key={index} button component={Link} to={item.path}>
                <ListItemText
                  inset
                  primary={`- ${item.label}`}
                  classes={{
                    primary:
                      selected === item.label
                        ? classes.itemSelectedText
                        : classes.itemText
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      button
      selected={selected}
      component={Link}
      onClick={onClick}
      to={path}>
      <ListItemIcon>
        <div className={selected ? classes.iconShow : classes.iconHidden}>
          {Icon && <Icon />}
        </div>
      </ListItemIcon>
      <ListItemText
        primary={label}
        classes={{
          primary: selected ? classes.itemSelectedText : classes.itemText
        }}
      />
    </ListItem>
  );
};

export default MenuItem;
