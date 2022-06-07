import React, {useEffect, useMemo, useState} from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FacesAspirantsEdit from "../faces-aspirants-edit";
import {ASPIRANTS_LIST_ROUTE} from "../../utils/consts";
import FrameWithTitle from "../frame-with-title";
import AspirantFindForm from "../UI/aspirant-find-form";
import {CSSTransition} from "react-transition-group";
import './faces-aspirants.scss';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonFilter from "../UI/button-filter";
import Box from "@material-ui/core/Box";
import {TextField} from "@material-ui/core";
import useInput from "../../hooks/use-input";
import UseDebounce from "../../hooks/use-debounce";
import {searchByName} from "../../utils/my-func";

const headCells = [
    {id: 'id', key: true},
    {id: 'tblFaceId', disablePadding: false},
    {
        id: 'lastname',
        label: 'фамилия',
        link: `${ASPIRANTS_LIST_ROUTE}`,
        linkArgument: 'tblFaceId'
    },
    {id: 'firstname', label: 'имя'},
    {id: 'middleName', label: 'отчество'},
    {id: 'birthdate', label: 'дата рождения', dataType: 'date'},
    {id: 'sex', label: 'пол'},
    {id: 'id', key: true},
    {id: 'isRecommendation', disablePadding: true, label: 'реком. сов. фак.', padding: 'checkbox'},
    {id: 'isProtocol', disablePadding: true, label: 'выписка из протокола', padding: 'checkbox'},
    {id: 'isAgree', label: 'согласие на науч. рук.', padding: 'checkbox'},
    {id: 'isHeadDepartment', label: 'согласование зав. каф.', padding: 'checkbox'},
    {id: 'dateOn', label: 'зачислен', dataType: 'date'},
    {id: 'dateOff', label: 'отчислен', dataType: 'date'},
    {id: 'dissertationTheme', label: 'тема диссертации'},
    {id: 'educationForm', label: 'форма обучения'},
    {id: 'nameDirection', label: 'направление обучения'},
    {id: 'DirectionalityOrSpecialty', label: 'направленность/специальность'},
    {id: 'subDiv', label: 'кафедра'},
    {id: 'faculty', label: 'факультет'},
    {id: 'subject', label: 'ин. яз'},
    {id: 'academicAdvisor', label: 'научный руководитель'},
    {id: 'orderIn', label: 'пр. о зачислении'},
    //{id: 'orderIn_tblFace_tblOrderId', label: 'id'},
    {id: 'orderOut', label: 'пр. о отчислении'},
    //{id: 'orderOut_tblFace_tblOrderId', label: 'id'},
];

const useStyles = makeStyles(theme => ({
    searchDiv: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    nameSearch: { margin: theme.spacing(1) }
}));

const FacesAspirants = ({
                            changeSelected = () => {
                            },
                            selected
                        }) => {
    const classes = useStyles();
    const {
        facesAspirants: {
            datasetModify, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [status, setStatus] = useState('active')
    const [paramsSearch, setParamsSearch] = useState(null);
    // const debouncedSearch = UseDebounce(searchByName, 500)
    const nameSearch = useInput('');
    useEffect(() => {
        fetch({...paramsSearch, status: status});
    }, [status])

    const changeAspirantIdHandle = (id) => {
        changeSelected(id);
    }

    const toggleSearchPanelHandle = () => {
        setShowSearchPanel((prev) => !prev)
    }

    const changeTabHandle = (event, newValue) => {
        setStatus(newValue);
        //setIndexTab(getIndexTab(newValue, dictionariesSubRoutes));
    };

    const fetchHandle = (params) => {
        fetch({...params, status: status});
        setParamsSearch(params);
    }

    const aspirants = searchByName(nameSearch.value, datasetModify)

    const table = useMemo(() => {
        return (
            <TableEdit
                headCells={headCells}
                isLoading={isLoading}
                dataset={aspirants}
                error={error}
                deleteRec={deleteRec}
                fetch={fetchHandle}
                FormEdit={FacesAspirantsEdit}
                //initialOrderBy='createdAt'
                onGetKeyValue={changeAspirantIdHandle }
                currentRecInitial={selected}
                maxHeight={'600px'}
                tableName='aspirants'
            />
        )
    }, [aspirants])

    const filter = useMemo(() => {
        return (
            <Box m={1}>
                <CSSTransition
                    in={showSearchPanel}
                    timeout={400}
                    classNames='search-panel-face'
                    unmountOnExit
                >
                    <AspirantFindForm fetch={fetchHandle}/>
                </CSSTransition>
            </Box>
        )
    }, [showSearchPanel])

    return (
        <FrameWithTitle head='Аспиранты'>
            {/*{!showSearchPanel && <Button onClick={toggleSearchPanelHandle}>поиск</Button>}*/}
            <Paper elevation={3}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={status}
                        onChange={changeTabHandle}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab value='active' label='действующие' key='active'/>
                        <Tab value='deleted' label='исключенные' key='deleted'/>
                        <Tab value='all' label='все' key='all'/>
                    </Tabs>
                </AppBar>
                <div className={classes.searchDiv}>
                    <ButtonFilter
                        onClick={toggleSearchPanelHandle}
                        variant='outlined'
                        color={showSearchPanel ? 'secondary' : 'primary'}
                        size='small'
                    >
                        фильтр {showSearchPanel ? 'скрыть' : 'показать'}
                    </ButtonFilter>
                </div>
                {filter}
                <TextField
                    className={classes.nameSearch}
                    label='поиск по ФИО'
                    {...nameSearch}
                    fullWidth

                />
                {table}
            </Paper>
        </FrameWithTitle>
    );
};

export default FacesAspirants;