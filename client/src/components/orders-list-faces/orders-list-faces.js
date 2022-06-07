import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import OrdersList from "../orders-list";
import OrderFaces from "../order-faces";
import {makeStyles} from "@material-ui/core/styles";
import FrameWithTitle from "../frame-with-title";

const useStyles = makeStyles(theme => ({
    root: {
        margin: `0px ${-theme.spacing(1)/2}px`,
        '& > div': {
            padding: theme.spacing(1)/2, 
        }
    },
}));

const OrdersListFaces = () => {
    const [orderId, setOrderId] = useState(null);
    const classes = useStyles();

    return (
        <Grid className={classes.root} container>
            <Grid item lg={4}>
                <FrameWithTitle head='Приказы'>
                    <OrdersList changeSelected={setOrderId}/>
                </FrameWithTitle>
            </Grid>
            <Grid item lg={8}>
                <FrameWithTitle head='Лица, фигурирующие в приказе'>
                    <OrderFaces orderId={orderId}/>
                </FrameWithTitle>
            </Grid>
        </Grid>
    );
};

export default OrdersListFaces;