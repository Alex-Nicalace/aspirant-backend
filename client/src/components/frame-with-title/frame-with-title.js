import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
//import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),

    }
}))

const FrameWithTitle = ({head, children/*, hideIfNotExistsCurrentDataset*/}) => {
    //const context = useAspirantApiContext()
    const styles = useStyles();

    // if (hideIfNotExistsCurrentDataset) {
    //     const isExists = context[hideIfNotExistsCurrentDataset].dataset.length > 0;
    //     if (!isExists)
    //         return null;
    // }

    return (
        <Paper className={styles.root} variant='outlined'>
            <Typography component='h6' variant='h6' align='center'>
                {head}
            </Typography>
            {children}
        </Paper>
    );
};

export default FrameWithTitle;