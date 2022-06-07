import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Input} from "../../controls/react-hook-form";

const useStyles = makeStyles(theme => ({
    date: {
        //border: '1px solid red',
        '&  input': {
            //border: '1px solid red',
            width: '60px',
        },
        '& .label': {
            //border: '1px solid green',
            //alignSelf: 'center',
            //marginRight: theme.spacing(1),
            margin: `${theme.spacing(3)-3}px ${theme.spacing(1)}px 0 0`
        }
    },
}))

const InputParsedDate = ({control, errors, dd, mm, yyyy, label}) => {
    const classes = useStyles();
    return (
        <Grid className={classes.date}
              container
            //spacing={1}
            //alignItems='flex-end'
            //style={{border: '1px solid red'}}
        >
            <Grid item className='label'>
                <Typography color='textSecondary'>
                    {label}
                </Typography>
            </Grid>
            <Grid item>
                <Input
                    control={control}
                    name={dd}
                    //rules={{required: true}}
                    defaultValue=''
                    label="дд"
                    //required
                    type='search'
                    error={!!errors[dd]}
                    helperText={errors?.[dd]?.message}
                    //fullWidth
                />
            </Grid>
            <Grid item>
                <Input
                    control={control}
                    name={mm}
                    //rules={{required: true}}
                    defaultValue=''
                    label="мм"
                    //required
                    type='search'
                    error={!!errors[mm]}
                    helperText={errors?.[mm]?.message}
                    //fullWidth
                />
            </Grid>
            <Grid item>
                <Input
                    control={control}
                    name={yyyy}
                    //rules={{required: true}}
                    defaultValue=''
                    label="гггг"
                    //required
                    type='search'
                    error={!!errors[yyyy]}
                    helperText={errors?.[yyyy]?.message}
                    //fullWidth
                />
            </Grid>

        </Grid>
    );
};

export default InputParsedDate;