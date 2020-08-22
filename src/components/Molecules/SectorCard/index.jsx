import React from "react";

// Material UI
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

// Atoms
import { DropdownMenu } from "../../../components/Atoms";

import TableIcon from "../../../assets/icons/table.svg";

import styles from "./styles";

const SectorCard = ({ sector, deleteSector, editSector }) => {
  const classes = styles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography variant="subtitle2" color="textPrimary" className={classes.price}>
          Sector
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
          eliminarProducts={() => deleteSector(sector)}
          edit={() => editSector(sector)}
        />
        <Avatar className={classes.avatar}>
          <img src={TableIcon} alt="img" width={48} height={48} />
        </Avatar>
        <Typography variant="body1" color="textPrimary" align="left" className={classes.title}>
          {sector.nameSector}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectorCard;
