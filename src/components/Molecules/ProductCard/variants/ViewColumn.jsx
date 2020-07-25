import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from "./styles";

const ProductCardViewColumn = ({ products }) => {

  const useStyles = makeStyles((theme) => ({
    contentColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: 'auto',
      justifyContent: "center",
    },
  }));
  const classes = styles();
  const classes2 = useStyles();
  return (


    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="170"
          image={"https://s03.s3c.es/imag/_v0/770x420/2/8/d/Comida-basura.jpg"}
          title="Contemplative Reptile"
        />
        <CardContent className={classes2.contentColumn}>
          <Typography gutterBottom variant="h5" component="h2">
            {products.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {products.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {`$ ${
            products.precioUnitario ? products.precioUnitario : products.precio
            }`}
        </Button>
        <Button size="small" color="primary">
          Learn More
      </Button>
      </CardActions>
    </Card>



  );
};

export default ProductCardViewColumn;


/*


 <Card style={{ height: 200 }}>
      <img src={"https://s03.s3c.es/imag/_v0/770x420/2/8/d/Comida-basura.jpg"}>
      </img>
      <CardContent className={classes2.contentColumn}>
        <Typography variant="body1" className={classes.title}>
          {products.nombre}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          // paragraphs
          className={classes.priceColumnRight}
        >
          {`$ ${
            products.precioUnitario ? products.precioUnitario : products.precio
            }`}
        </Typography>
      </CardContent>
    </Card>
*/