import React, {useState} from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {CssBaseline} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircle";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import Button from "@material-ui/core/Button";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
    }
}));

const AppHeader = ({toggleAppDrawer, isVisibleAppDrawer}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const {user: {logout, usersData, isAuth}} = useAspirantApiContext()
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        logout();
        handleClose();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isVisibleAppDrawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={toggleAppDrawer}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: isVisibleAppDrawer,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        className={classes.title}
                        variant='h6'
                    >
                        Аспирант
                    </Typography>
                    {isAuth &&
                    <Button
                        color="inherit"
                        onClick={handleMenu}
                        startIcon={<AccountIcon/>}
                    >
                        {usersData?.login}
                    </Button>}
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogOut}>Выход</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default AppHeader;