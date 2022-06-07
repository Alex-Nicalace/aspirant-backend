import React from "react";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import {useHistory, useLocation} from "react-router-dom";
import {authRoutes} from "../../routes";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

const AppDrawer = ({isVisibleAppDrawer, toggleAppDrawer}) => {
    const {user: {usersData}} = useAspirantApiContext();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    const list = () => (
        <List >
            {authRoutes
                .filter(item => !item?.isAdmin || item?.isAdmin === usersData?.isAdmin )
                .map((i) => (
                <ListItem
                    button
                    key={i.path}
                    selected={location.pathname.split('/')[1] === i.path.split('/')[1]}
                    onClick={() => history.push(i.path)}
                >
                    <ListItemIcon> {i.icon} </ListItemIcon>
                    <ListItemText primary={i.label}/>
                </ListItem>
            ))}

        </List>
    );

    return (
        <div className={classes.root}>
            <Drawer
                variant='permanent'
                //anchor={anchor}
                //open={isVisibleAppDrawer}
                //onClose={toggleAppDrawer}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isVisibleAppDrawer,
                    [classes.drawerClose]: !isVisibleAppDrawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isVisibleAppDrawer,
                        [classes.drawerClose]: !isVisibleAppDrawer,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleAppDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {list()}
            </Drawer>
        </div>
    )
}

export default AppDrawer;