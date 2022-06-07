import React from 'react';
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import ButtonAdd from "../UI/button-add";
import ButtonDel from "../UI/button-del";
import ButtonEdit from "../UI/button-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const useStyles = makeStyles(theme => ({
    root: {
        '& div': {
            margin: theme.spacing(1),
        },
        '& div:last-child': {
            marginRight: 0,
        }
    },
    btnAdd: {
        color: green[500]
    },
    btnDel: {
        color: green[500]
    },
    btnUpd: {
        color: yellow[500]
    }
}))

const ButtonsPanel = ({deleteRec, setModeEdit, currentRec}) => {
    const { user: { usersData } } = useAspirantApiContext()
    const styles = useStyles();
    return (
        <Grid
            container
            justifyContent='flex-end'
            className={styles.root}
        >
            <Grid item className='btn'>
                <ButtonAdd
                    disabled={!usersData?.canInsert}
                    onClick={(e) => setModeEdit('insert', e) }
                />
            </Grid>

            <Grid item>
                <ButtonDel
                    onClick={deleteRec} disabled={!currentRec || !usersData?.canDelete}
                />
            </Grid>

            <Grid item>
                <ButtonEdit
                    onClick={(e) => setModeEdit('update', e)}
                    disabled={!currentRec  || !usersData?.canUpdate}
                />
            </Grid>

        </Grid>
    );
};

export default ButtonsPanel;