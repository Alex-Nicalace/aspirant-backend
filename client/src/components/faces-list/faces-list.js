import React, {useEffect, useMemo, useState} from 'react';
import TableEdit from "../table-edit";
import FacesEdit from "../faces-edit";
import {FACES_LIST_ROUTE} from "../../utils/consts";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import PopoverFaceAllData from "../popover-face-all-data";
import FrameWithTitle from "../frame-with-title";
import FaceFindForm from "../UI/face-find-form";
import SwitchWithLabel from "../controls/switch-with-label";
import ButtonFilter from "../UI/button-filter";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {CSSTransition} from "react-transition-group";
import {TextField} from "@material-ui/core";
import useInput from "../../hooks/use-input";
import {searchByName} from "../../utils/my-func";
import Grid from "@material-ui/core/Grid";

const headCellsInit = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'lastname', disablePadding: false, label: 'фамилия'},
    {id: 'firstname', disablePadding: false, label: 'имя'},
    {id: 'middleName', disablePadding: false, label: 'отчество'},
    {id: 'birthdate', disablePadding: false, label: 'дата рождения', dataType: 'date'},
    {id: 'sexStr', disablePadding: false, label: 'пол'},
    {id: 'isAspirant', disablePadding: false, label: 'аспирант', padding: 'checkbox'},
    {id: 'isWasAspirant', disablePadding: false, label: 'быв. аспирант', padding: 'checkbox'},
    {id: 'isAcademicAdvisor', disablePadding: false, label: 'науч. рук.', padding: 'checkbox'},
];

const useStyles = makeStyles(theme => ({
    searchDiv: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
}));

const FacesList = ({
                       changeSelected = () => {
                       },
                       selected,
                       viewCardMode = 'popover'
                   }) => {
    const classes = useStyles();
    const {
        faces: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

    useEffect(() => {
        //if (dataset.length === 0)
        fetch();
    }, [])

    const [faceId, setFaceId] = useState(null);
    const [showPhoto, setShowPhoto] = useState(false);
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const [headCells, setHeadCells] = useState(headCellsInit);
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const nameSearch = useInput('');

    useEffect(() => {
        setHeadCells((prev) => {
            const arr = [...prev];
            if (viewCardMode === 'popover') {
                arr[1].onClick = openPopoverHandler;
                arr[1].style = {color: 'blue', textDecoration: 'underline'};
                arr[1].linkArgument = undefined;
                arr[1].link = undefined;
            }
            if (viewCardMode === 'link') {
                arr[1].linkArgument = 'id';
                arr[1].link = `${FACES_LIST_ROUTE}`;
                arr[1].onClick = undefined;
                arr[1].style = undefined;
            }

            const idx = arr.findIndex(({id}) => id === 'photo')
            if (showPhoto && (idx < 0)) {
                arr.splice(1, 0, {id: 'photo', disablePadding: false, label: 'фото', dataType: 'image',});
            }
            if (!showPhoto && (idx > 0)) {
                arr.splice(idx, 1);
            }
            return arr;
        })
    }, [showPhoto])

    const filter = useMemo(() => {
        return (
            <Box m={1}>
                <CSSTransition
                    in={showSearchPanel}
                    timeout={400}
                    classNames='search-panel-face'
                    unmountOnExit
                >
                    <FaceFindForm fetch={fetch}/>
                </CSSTransition>
            </Box>
        )
    }, [showSearchPanel])

    const idPopover = isOpenPopover ? 'simple-popover' : undefined;

    const changeFaceIdHandle = (id) => {
        setFaceId(id);
        changeSelected(id);
    }

    const openPopoverHandler = () => {
        setIsOpenPopover(true);
    }

    const closePopoverHandler = () => {
        setIsOpenPopover(false);
    }

    // if (viewCardMode === 'popover') {
    //     headCells[1].onClick = openPopoverHandler;
    //     headCells[1].style = {color: 'blue', textDecoration: 'underline'};
    // }
    // if (viewCardMode === 'link') {
    //     headCells[1].linkArgument = 'id';
    //     headCells[1].link = `${FACES_LIST_ROUTE}`;
    // }

    const toggleShowPhotoHandle = () => {
        setShowPhoto(prev => !prev)
    }

    const toggleSearchPanelHandle = () => {
        setShowSearchPanel((prev) => !prev)
    }

    const faces = searchByName(nameSearch.value, dataset);

    const table = useMemo(() => {
        return (
            <TableEdit
                headCells={headCells}
                isLoading={isLoading}
                dataset={faces}
                error={error}
                deleteRec={deleteRec}
                //fetch={fetchTst}
                FormEdit={FacesEdit}
                initialOrderBy='lastname'
                onGetKeyValue={changeFaceIdHandle}
                currentRecInitial={selected}
                tableName='faces-list'
            />
        )
    }, [faces, headCells])

    return (
        <FrameWithTitle head='Лица, имеющиеся в базе данных'>
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
            <Grid container spacing={2} alignItems='flex-end'>
                <Grid item lg={10}>
                    <TextField
                        //placeholder='поиск по ФИО'
                        label='поиск по ФИО'
                        {...nameSearch}
                        fullWidth
                    />
                </Grid>
                <Grid item >
                    <SwitchWithLabel
                        label='фото'
                        checked={showPhoto}
                        onChange={toggleShowPhotoHandle}
                    />
                </Grid>
            </Grid>

            {table}

            <PopoverFaceAllData
                faceId={faceId}
                closePopoverHandler={closePopoverHandler}
                idPopover={idPopover}
                isOpenPopover={isOpenPopover}
            />
        </FrameWithTitle>
    );
};

export default FacesList;