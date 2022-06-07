import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from "@material-ui/core/Paper";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {dictionariesSubRoutes} from "../../routes";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        // width: 500,
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


function getIndexTab(value, arr = []) {
    return arr.findIndex(i => i.path === value)
}

export default function Dictionaries() {
    const history = useHistory();
    const classes = useStyles();
    const {pathname} = useLocation();
    const theme = useTheme();

    // если указан не существующий роут справочника то отпеределить значение из епервого элмента ройтов
    // иначе предупрежедние мол указано не существующее значение
    const pathCandidate = dictionariesSubRoutes.find(item => item.path === pathname)
    if (!pathCandidate)
        history.push(dictionariesSubRoutes[0].path);
    const value = pathCandidate ? pathname : dictionariesSubRoutes[0].path;
    const indexTab = getIndexTab(value, dictionariesSubRoutes)


    const handleChange = (event, newValue) => {
        history.push(newValue);
        //setIndexTab(getIndexTab(newValue, dictionariesSubRoutes));
    };

    return (
        <div className={classes.root}>
            <Paper elevation={3}>

                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        defaultValue={dictionariesSubRoutes[0].path}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {dictionariesSubRoutes.map(i => <Tab value={i.path} label={i.label} key={i.path}/>)}
                    </Tabs>
                </AppBar>

                <Switch>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={indexTab}
                        //onChangeIndex={index => setIndexTab(index)}
                    >
                        {dictionariesSubRoutes.map(({path, component}) =>
                            <Route key={path} path={path} render={() => component} exact/>)};
                        {/*<Redirect to={dictionariesSubRoutes[0].path}/>*/}
                    </SwipeableViews>

                </Switch>

            </Paper>
        </div>
    );
}