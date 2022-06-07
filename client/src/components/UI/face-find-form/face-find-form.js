import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBirthdateFioSex from "../input-birthdate-fio-sex";

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
    sex: yup
        .boolean()
        .transform(value => (value === '' ? undefined : value))
        .nullable(),
    firstname: yup
        .string()
        .nullable()
        .matches(/^([^0-9]*)$/, "не может содержать цифры"),
    lastname: yup
        .string()
        .nullable()
        .matches(/^([^0-9]*)$/, "не может содержать цифры"),
    middleName: yup
        .string()
        .nullable()
        .matches(/^([^0-9]*)$/, "не может содержать цифры"),
});

const useStyles = makeStyles(theme => ({
    button: {
        //alignSelf: 'flex-end',
        marginTop: `${theme.spacing(2)}px`,
    }
}))

const FaceFindForm = ({fetch}) => {
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
        <form onSubmit={handleSubmit(submitHandle)}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>
                    <InputBirthdateFioSex
                        control={control}
                        errors={errors}
                        lastname='lastname'
                        firstname='firstname'
                        middleName='middleName'
                        dd='dd'
                        mm='mm'
                        yyyy='yyyy'
                        sex='sex'
                    />
                </Grid>
                <Grid item className={classes.button}>
                    <Button
                        //type='submit'
                        // закрывает окно в случае когда на форме надо найти лицо => закоментил
                        type='button'
                        onClick={handleSubmit(submitHandle)}
                        variant='outlined'
                        color='primary'>
                        найти
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default FaceFindForm;