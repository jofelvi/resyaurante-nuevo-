import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../components/Atoms";

import TableIcon from "../../../assets/icons/table.svg";

import styles from "./styles";

const TableCard = ({ table, deleteTable, editTable }) => {
  const classes = styles();
  return (
    <Card>
      <CardContent
        className={classes.content}
        style={table.reserved ? { background: "#ffcdd2" } : {}}
      >
        <Typography variant="subtitle2" color="textPrimary" className={classes.price}>
          {table.diners} Comensales
        </Typography>
        <DropdownMenu
          label="Opciones"
          className={classes.options}
          options={[
            {
              label: "Ver",
            },
            {
              label: "Editar",
            },
            {
              label: "Eliminar",
            },
          ]}
          eliminarProducts={() => deleteTable(table)}
          edit={() => editTable(table)}
        />
        <Avatar className={classes.avatar}>
          <img src={TableIcon} alt="img" width={48} height={48} />
        </Avatar>
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          Mesa {table.numberTable}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="left"
          paragraph
          className={classes.description}
        >
          {table.sector}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TableCard;
