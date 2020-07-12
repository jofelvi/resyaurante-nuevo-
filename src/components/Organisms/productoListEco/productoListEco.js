import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModalNew from '../Modals/ ModalNew';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

function productoListEco(props) {
    /* const item = {
         nombre: "jose",
         id: "5DAcUDDd4t8xWgl9kvXl",
         image: "https://d1ralsognjng37.cloudfront.net/18189fb4-2ed3-4c7d-bdd1-2819dc1274a5.jpeg",
         title: "titulo",
         detalle: " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
 
     }*/
    const classes = useStyles();
    const [modalShow, setModalShow] = useState(false);
    const [activeItemName, setActiveItemName] = useState("item.nombre");
    const [activeItemId, setActiveItemId] = useState();
    const [qty, setQty] = useState(1);
    const [products, setProducts] = useState();
    console.log(products)


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://d1ralsognjng37.cloudfront.net/18189fb4-2ed3-4c7d-bdd1-2819dc1274a5.jpeg"
                    title="Contemplative Reptile"
                    onClick={() => setModalShow(true)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    aquiiiiii """···"
                     {products}
                </Button>


            </CardActions>

            <ModalNew show={modalShow} onHide={() => setModalShow(false)}
                nombre={activeItemName}
                id={activeItemId}
                qty={qty}
            />


        </Card>

    );
}


export default productoListEco