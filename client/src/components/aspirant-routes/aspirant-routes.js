import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {aspirantsSubRoutes} from "../../routes";

const AspirantRoutes = () => {
    return (
        <Switch>
            {aspirantsSubRoutes.map(({path, render, exact}) =>
                <Route key={path} path={path} render={render} exact={ exact }/>)};
            <Redirect to={aspirantsSubRoutes[0].path}/>
        </Switch>
    );
};

export default AspirantRoutes;