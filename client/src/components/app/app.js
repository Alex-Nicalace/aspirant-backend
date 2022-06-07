import React, {useContext, useState} from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import AppHeader from "../app-header";
import AppDrawer from "../app-drawer";
import AppRouter from "../app-router/app-router";
import Notification from "../notification";
import {DURATION_MESSAGE} from "../../utils/consts";
import {AspirantApiContext} from "../context/aspirant-api-context";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

const App = () => {
    const {messages: {messages, destroyMessage,}} = useContext(AspirantApiContext);

    const classes = useStyles();
    const [isVisibleAppDrawer, setIsVisibleAppDrawer] = useState(false);
    const openNotification = Boolean(messages.message)

    const toggleAppDrawerHandler = () => {
        setIsVisibleAppDrawer((visibleAppDrawer) => !visibleAppDrawer)
    }

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        destroyMessage();
    };

    return (
        <div className={classes.root}>
            <AppHeader
                toggleAppDrawer={toggleAppDrawerHandler}
                isVisibleAppDrawer={isVisibleAppDrawer}
            />
            <AppDrawer
                isVisibleAppDrawer={isVisibleAppDrawer}
                toggleAppDrawer={toggleAppDrawerHandler}
            />
            <Container style={{maxWidth:'97%'}}
            >
                <main className={classes.content} >
                    <div className={classes.toolbar}/>
                    <AppRouter/>

                    <Notification
                        message={messages.message}
                        type={messages.typeMessage}
                        autoHideDuration={DURATION_MESSAGE}
                        open={openNotification}
                        handleClose={handleCloseNotification}
                    />
                </main>
            </Container>


        </div>
    )

}

export default App;