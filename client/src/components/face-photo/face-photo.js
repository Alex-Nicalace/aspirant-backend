import React, {useEffect, useMemo, useState} from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import ErrorIndicator from "../error-indicator";
import CircularProgress from "@material-ui/core/CircularProgress";
import PanelButtons from "./panel-buttons";
import {makeStyles} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import FacePhotoEdit from "../face-photo-edit";
import DialogAlert from "../dialog-alert";
import ButtonAdd from "../UI/button-add";
import ButtonDel from "../UI/button-del";
import Grid from "@material-ui/core/Grid";
import {useStylesPopupContent} from "../../hooks/use-styles-popup-content";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: '275px',
        textAlign: 'center',
        //borderRadius: '10px',
        //padding: theme.spacing(1),
        //border: `1px solid ${theme.palette.grey[300]}`,

        '& .img-container': {
            height: 330, width: 260, overflow: 'hidden', margin: '0px auto',

            '& img': {
                width: '100%', height: '100%', objectFit: 'contain'
            }
        }

    },
}));

function sortDataset(arr) {
    return [...arr].sort((a, b) => new Date(b.dateOn) - new Date(a.dateOn));
}

const FacePhoto = ({faceId}) => {
    const classes = useStyles();
    const classesPopup = useStylesPopupContent();
    const {
        facePhoto: {
            dataset: datasetNotSorted, isLoading, error,
            fetch, deleteRec,
        },
    } = useAspirantApiContext();
    const [pathPhoto, setPathPhoto] = useState('');
    const [idxPhoto, setIdxPhoto] = useState(0);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dataset, setDataset] = useState([]);

    useMemo(() => {
        setDataset(sortDataset(datasetNotSorted))
    }, [datasetNotSorted])

    useEffect(() => {
        fetch(faceId);
    }, [])

    useEffect(() => {
        setPathPhoto(dataset[idxPhoto]?.pathFile);
    }, [idxPhoto, dataset])

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const closeEditHandle = () => {
        setAnchorEl(null);
    }

    const openEditHandle = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const countPhoto = dataset.length;

    const changeIdxPhoto = (mode) => {
        switch (mode) {
            case 'first':
                setIdxPhoto(0)
                return
            case 'previous':
                setIdxPhoto((idx) => --idx)
                return
            case 'next':
                setIdxPhoto((idx) => ++idx)
                return
            case 'last':
                setIdxPhoto(countPhoto - 1)
                return
            default:
                return;
        }
    }

    if (isLoading)
        return <CircularProgress/>
    if (error)
        return <ErrorIndicator message={dataset.error}/>

    const deleteRecHandle = async () => {
        if (dataset?.length !== 0 && idxPhoto >= 0) {
            const id = dataset[idxPhoto].id;
            await deleteRec(id);
            if (idxPhoto > 0)
                setIdxPhoto(prev => --prev)
        }
        setIsShowDialog(false);
    }

    const handleClickOpenDialog = () => {
        if (dataset?.length !== 0 && idxPhoto >= 0) {
            setIsShowDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setIsShowDialog(false);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1} justifyContent='center'>
                <Grid item>
                    <ButtonAdd onClick={openEditHandle}/>
                </Grid>
                <Grid item>
                    <ButtonDel disabled={countPhoto === 0} onClick={handleClickOpenDialog}/>
                </Grid>
            </Grid>
            <div className='img-container'>
                {countPhoto
                    ? <img src={'/' + pathPhoto} alt='фото'/>
                    : <Typography style={{marginTop: '50%'}} color='textSecondary' > фото отсутствует </Typography>
                }
            </div>
            <PanelButtons idxPhoto={idxPhoto} changeIdxPhoto={changeIdxPhoto} countPhoto={countPhoto}/>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                //onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classesPopup.popupContent}>
                    <FacePhotoEdit closeEdit={closeEditHandle}/>
                </div>

            </Popover>

            <DialogAlert
                message='Вы действительно хотите удалить фото?'
                title='УДАЛЕНИЕ'
                isShowDialog={isShowDialog}
                handleClose={handleCloseDialog}
                handleYes={deleteRecHandle}
            />
        </div>
    );
}

export default FacePhoto;