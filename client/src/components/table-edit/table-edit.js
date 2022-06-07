import React, {useEffect, useState} from "react";
import TableEnhanced from "../table-enhanced";
import ButtonsPanel from "../buttons-panel";
import DialogAlert from "../dialog-alert";
import ErrorIndicator from "../error-indicator";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const TableEdit = ({
                       headCells,
                       dataset,
                       error,
                       fetch = () => {
                       },
                       deleteRec,
                       FormEdit,
                       initialOrderBy,
                       onGetKeyValue = () => {
                       },
                       valuesToState, // какието переменные которые нужно вставить при добавлении новых записей
                       currentRecInitial,
                       maxHeight,
                       tableName
                   }) => {

    const [modeEdit, setModeEdit] = useState(null)
    const [currentRec, setCurrentRec] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isShowDialog, setIsShowDialog] = useState(false);

    const open = Boolean(anchorEl);

    useEffect(() => {
        setCurrentRec(currentRecInitial)
    }, [currentRecInitial])

    useEffect(() => {
        fetch();
    }, [])

    useEffect(() => {
        if (currentRec) {
            const result = dataset.find(i => i.id === currentRec);
            !result && setCurrentRec(null);
        }

    }, [dataset])

    // useEffect(() => {
    //     onGetKeyValue(currentRec)
    // }, [currentRec])

    const setModeEditHandle = (modeEdit, event) => {
        if (modeEdit === 'update' && !currentRec)
            return;
        setModeEdit(modeEdit);
        setAnchorEl(event.currentTarget);
    }

    const closeEditHandle = () => {
        setModeEdit(null);
        setAnchorEl(null);
    }

    const deleteRecHandle = async () => {
        if (currentRec) {
            await deleteRec(currentRec);
        }
        setIsShowDialog(false);
    }

    const handleClickOpenDialog = () => {
        if (currentRec) {
            setIsShowDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setIsShowDialog(false);
    };

    const handleSetCurrentRec = (id) => {
        setCurrentRec(id);
        onGetKeyValue(id)
    }

    if (error)
        return <ErrorIndicator error={error}/>

    // if (isLoading)
    //     return <CircularProgress/>

    return (
        <>
            <ButtonsPanel
                setModeEdit={setModeEditHandle}
                deleteRec={handleClickOpenDialog}
                currentRec={currentRec}

            />
            <TableEnhanced
                dataset={dataset}
                headCells={headCells}
                initialOrderBy={initialOrderBy}
                onGetKeyValue={handleSetCurrentRec}
                selectedKey={currentRec}
                maxHeight={maxHeight}
                tableName={tableName}
            />
            <DialogAlert
                message='Вы действительно хотите удалить запись?'
                title='УДАЛЕНИЕ'
                isShowDialog={isShowDialog}
                handleClose={handleCloseDialog}
                handleYes={deleteRecHandle}
            />

            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <FormEdit
                        closeEdit={closeEditHandle}
                        modeEdit={modeEdit}
                        currentRec={currentRec}
                        valuesToState={valuesToState}
                    />
                </DialogContent>
            </Dialog>


        </>
    );
}

export default TableEdit;