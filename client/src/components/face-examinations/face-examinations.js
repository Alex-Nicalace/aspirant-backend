import React, {useEffect, useState} from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceExaminationsEdit from "../face-examinations-edit";
import {TableBody, TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import DialogAlert from "../dialog-alert";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ButtonsPanel from "../buttons-panel";
import IndicatorNoData from "../UI/indicator-no-data";
import ErrorIndicator from "../error-indicator";

// const headCells = [
//     {id: 'id', disablePadding: false, key: true},
//     {id: 'semesterNum', disablePadding: false, label: 'семестр'},
//     {id: 'subject', disablePadding: false, label: 'предмет',},
//     {id: 'estimate', disablePadding: false, label: 'оценка'},
//
// ];

const useStyles1 = makeStyles((theme) => ({
    selectedCell: {
        background: 'lightpink',

    },
    cursPointer: {cursor: "pointer"},
    fixedCell : {fontWeight: 'bold', background: theme.palette.grey[50]}
}));

const FaceExaminations = ({faceId}) => {
    const classes = useStyles1();
    const {
        faceExaminations: {
            error,
            datasetPivot,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();
    useEffect(() => {
        fetch(faceId);
    }, [])
    const [cellId, setCellId] = useState(null);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [modeEdit, setModeEdit] = useState(null)
    const [isShowEditDialog, setIsShowEditDialog] = useState(false);

    const handleClickOpenDialog = () => {
        if (cellId) {
            setIsShowDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setIsShowDialog(false);
    };

    const deleteRecHandle = async () => {
        if (cellId) {
            await deleteRec(cellId);
        }
        setIsShowDialog(false);
    }

    const setModeEditHandle = (modeEdit) => {
        if (modeEdit === 'update' && !cellId)
            return;
        setModeEdit(modeEdit);
        setIsShowEditDialog(true);
    }

    const closeEditHandle = () => {
        setModeEdit(null);
        setIsShowEditDialog(false);
    }

    if (error)
        return <ErrorIndicator error={error}/>

    return (
        <>
            {/*<TableEdit*/}
            {/*    headCells={headCells}*/}
            {/*    isLoading={isLoading}*/}
            {/*    dataset={dataset}*/}
            {/*    error={error}*/}
            {/*    deleteRec={deleteRec}*/}
            {/*    fetch={fetchForCurrentId}*/}
            {/*    FormEdit={FaceExaminationsEdit}*/}
            {/*    initialOrderBy='semesterNum'*/}
            {/*/>*/}

            <ButtonsPanel
                setModeEdit={setModeEditHandle}
                deleteRec={handleClickOpenDialog}
                currentRec={cellId}
            />
            {!(datasetPivot.length > 1)
                ? <IndicatorNoData/>
                : <><TableContainer component={Paper}>
                    <Table
                        size='small'
                    >
                        <TableBody>
                            {datasetPivot.map((row) => (
                                <TableRow key={row.field0}>
                                    {Object.keys(row).map(keyName =>
                                        <TableCell
                                            align='center'
                                            variant={typeof (row[keyName]) === 'object' ? 'body' : 'head'}
                                            onClick={() => setCellId(row[keyName]?.id)}
                                            className={`${(cellId === row[keyName]?.id && cellId) ? classes.selectedCell : null} 
                                            ${typeof (row[keyName]) === 'object' ? classes.cursPointer : null}
                                            ${typeof (row[keyName]) !== 'object' && classes.fixedCell}
                                            `
                                            }
                                        >
                                            {typeof (row[keyName]) === 'object' ? row[keyName].estimate : row[keyName]}
                                        </TableCell>
                                    )}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                    <DialogAlert
                        message='Вы действительно хотите удалить запись?'
                        title='УДАЛЕНИЕ'
                        isShowDialog={isShowDialog}
                        handleClose={handleCloseDialog}
                        handleYes={deleteRecHandle}
                    />
                </>
            }
            <Dialog open={isShowEditDialog} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <FaceExaminationsEdit
                        closeEdit={closeEditHandle}
                        modeEdit={modeEdit}
                        currentRec={cellId}
                        //valuesToState={valuesToState}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default FaceExaminations;