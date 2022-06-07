import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../../routes";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import {CircularProgress} from "@material-ui/core";

// логика навигации по страницам
const AppRouter = () => {
        const {user: {isAuth, isLoading, auth}} = useAspirantApiContext();

        useEffect(() => {
            auth();
        }, [])

        if (isLoading)
            return <CircularProgress />

        return (
            isAuth
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
                        <Redirect to={publicRoutes[0].path}/>
                    </Switch>
                )
        )


    }
;

export default AppRouter;