import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {academicAdvisorSubRoutes} from "../../routes";

const AcademicAdvisorRoutes = () => {
    return (
        <Switch>
            {academicAdvisorSubRoutes.map(({path, render, exact}) =>
                <Route key={path} path={path} render={render} exact={ exact }/>)};
            <Redirect to={academicAdvisorSubRoutes[0].path}/>
        </Switch>
    );
};

export default AcademicAdvisorRoutes;