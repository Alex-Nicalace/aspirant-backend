import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {facesSubRoutes} from "../../routes";

const FacesRoutes = () => {
    return (
        <Switch>
            {facesSubRoutes.map(({path, render, exact}) =>
                <Route key={path} path={path} render={render} exact={ exact }/>)};
            <Redirect to={facesSubRoutes[0].path}/>
        </Switch>
    );
};

export default FacesRoutes;