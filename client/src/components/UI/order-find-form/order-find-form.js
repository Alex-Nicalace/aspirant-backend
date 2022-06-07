import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputParsedDate from "../input-parsed-date";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Input} from "../../controls/react-hook-form";
import Grid from "@material-ui/core/Grid";

const schema = yup.object().shape({
    dd: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(1, 'ошибка')
        .max(31, 'ошибка')
        .nullable(),
    mm: yup
        .number()
        .min(1, 'ошибка')
        .max(12, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    yyyy: yup
        .number()
        .min(1900, 'ошибка')
        .max(2099, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    numOrder: yup
        .string()
        .nullable(),
    text: yup
        .string()
        .nullable(),
})

const useStyles = makeStyles(theme => ({
    button: {
        //alignSelf: 'flex-end',
        marginTop: `${theme.spacing(2)}px`,
        textAlign: 'center'
    },
    flexContainer: {
        '& div': {
            flexGrow: 1
        }
    }
}))

const OrderFindForm = ({fetch}) => {
    const classes = useStyles();
    const {control, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const submitHandle = (data, e = null) => {
        e && e.preventDefault();
        fetch(data);
    }

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item>
                    <InputParsedDate
                        control={control}
                        errors={errors}
                        label='дата приказа'
                        dd='dd'
                        mm='mm'
                        yyyy='yyyy'
                    />
                </Grid>
                <Grid item>
                    <Input
                        control={control}
                        name='numOrder'
                        //rules={{required: true}}
                        defaultValue=''
                        label="№ приказа"
                        //required
                        type='search'
                        error={!!errors.numOrder}
                        helperText={errors?.numOrder?.message}
                        //fullWidth
                    />
                </Grid>
            </Grid>
            <Input
                control={control}
                name='text'
                //rules={{required: true}}
                defaultValue=''
                label="содержание приказа"
                //required
                type='search'
                error={!!errors.text}
                helperText={errors?.text?.message}
                multiline
                minRows={4}
                maxRows={30}
                fullWidth
            />
            <div className={classes.button}>
                <Button
                    //type='submit'
                    // закрывает окно в случае когда на форме надо найти лицо => закоментил
                    type='button'
                    onClick={handleSubmit(submitHandle)}
                    variant='contained'
                    size='small'
                    color='primary'>
                    найти
                </Button>
            </div>
        </form>
    );
};

export default OrderFindForm;