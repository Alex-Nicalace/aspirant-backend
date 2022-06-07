import React from 'react';
import DictCountry from "../dict-country";
import DictCity from "../dict-city";
import DictStreet from "../dict-street";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        '& > div': {
            flexGrow: '1',
            //border: '1px solid red'
        },
    }
}));

const DictAddress = () => {
    const classes = useStyles();
    const lg = true
    return (
        <Grid className={classes.root} container spacing={1}>
            <Grid item lg={lg}><DictCountry/></Grid>
            <Grid item lg={lg}><DictCity/> </Grid>
            <Grid item lg={lg}><DictStreet/> </Grid>
        </Grid>
    );
};

export default DictAddress;