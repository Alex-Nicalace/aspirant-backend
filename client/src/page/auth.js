import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Input} from "../components/controls/react-hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAspirantApiContext} from "../components/context/aspirant-api-context/aspirant-api-context";

const useStyles = makeStyles(theme => ({
    root: {
        margin: '2rem auto 0 auto',
        maxWidth: theme.spacing(60),
        '& div': {
            '& > *': {
                padding: theme.spacing(1),
            },
            '& div': {
                textAlign: 'center'
            }
        }
    }
}));

const schema = yup.object().shape({
    login: yup
        .string()
        .nullable()
        .required("обязательное поле"),
    password: yup
        .string()
        .nullable()
        .required("обязательное поле"),
});

const Auth = () => {
    const classes = useStyles();
    const {control, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const {user: {login}} = useAspirantApiContext();

    const onLogin = async (data) => {
        await login(data);
    }

    return (
        <form onSubmit={handleSubmit(onLogin)} className={classes.root}>
            <Paper elevation={3}>
                <Typography
                    align='center'
                    variant='h5'
                    display={'block'}
                >
                    Вход
                </Typography>
                <Input
                    control={control}
                    name='login'
                    rules={{required: true}}
                    defaultValue=''
                    label="логин"
                    required
                    error={!!errors.login}
                    helperText={errors?.login?.message}
                    fullWidth
                    variant='outlined'
                />
                <Input
                    control={control}
                    name='password'
                    rules={{required: true}}
                    defaultValue=''
                    label="пароль"
                    required
                    type='password'
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    fullWidth
                    variant='outlined'
                />
                <div>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        Войти
                    </Button>
                </div>
            </Paper>
        </form>
    );
};

export default Auth;