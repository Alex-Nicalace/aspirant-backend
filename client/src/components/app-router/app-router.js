import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../../routes";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

// логика навигации по страницам
const AppRouter = () => {
        const {user: {isAuth, isLoading, auth}} = useAspirantApiContext();
        const classes = useStyles()

        useEffect(() => {
            auth();
        }, [])

        return (
            <>
                {isAuth
                    ? (
                        <Switch> {authRoutes
                            .map(({path, render, exact}) =>
                                <Route key={path} path={path} render={render} exact={exact}/>)};
                            <Redirect to={authRoutes[0].path}/>
                        </Switch>
                    )
                    : (

                        <Switch>
                            {publicRoutes.map(({path, render, exact}) =>
                                <Route key={path} path={path} render={render} exact={exact}/>)}
                            {!isLoading && <Redirect to={publicRoutes[0].path}/>}
                        </Switch>
                    )
                }
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        )


    }
;

export default AppRouter;