import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import 'fontsource-roboto';
import {ThemeProvider} from "@material-ui/core";
import createTheme from "@material-ui/core/styles/createTheme";
import {ruRU} from '@material-ui/core/locale'; // локализация компонентов MU
// для функционирования пакета Material-UI pickers
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import format from "date-fns/format";
// -------------------------------------------------

import App from "./components/app";
import store from "./store";
import {AspirantApi} from "./components/context/aspirant-api-context";
import ErrorBoundary from "./components/error-boundry";

const theme = createTheme({
    // palette: {
    //     //primary: {main: '#8276d1'}
    // },
    // breakpoints: {
    //     values: {
    //         xs: '0px',
    //         sm: '600px',
    //         md: '900px',
    //         lg: '1200px',
    //         xl: '1800px'
    //     }
    // }
}, ruRU)

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "LLLL", {locale: ruLocale});
    }

    getDatePickerHeaderText(date) {
        return format(date, "dd MMMM", {locale: ruLocale});
    }
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AspirantApi>
                    <ErrorBoundary>
                        <BrowserRouter>
                            <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                                <App/>
                            </MuiPickersUtilsProvider>
                        </BrowserRouter>
                    </ErrorBoundary>
                </AspirantApi>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

