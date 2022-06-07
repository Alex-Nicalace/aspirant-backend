import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {Input, InputDate} from "../controls/react-hook-form";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FaceAspirantOrdersEdit from "../face-aspirant-orders-edit";
import ShowMessage from "../show-message";
//import ShowMessage from "../show-message";

const schema = yup.object().shape({
    tblFaceId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("лицо обязательное поле"),
    dateOn: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата')
        .required("обязательное поле"),
    dateOff: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата'),
    note: yup
        .string(),
});

const useStyles = makeStyles(theme => ({
    btnClose: {
        textAlign: 'right',
        // margin: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    btnSelect: {
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    btnSelect__spec: {
        alignSelf: 'center',
    }
}));

const FaceAspirantAcademEdit = ({closeEdit, modeEdit, currentRec}) => {
    const classes = useStyles();
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        faceAspirantAcadem: {
            insertRec,
            updateRec,
            datasetModify: dataset,
            faceId
        },
        faceAspirantOrders
    } = useAspirantApiContext();
    const [record, setRecord] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [tblFace_tblOrder_id, set_tblFace_tblOrder_id] = useState(null);
    const [typeOrder, setTypeOrder] = useState(null);
    const [currentRecInserted, setCurrentRecInserted] = useState(null);
    const [openDlgSaveRecord, setOpenDlgSaveRecord] = useState(false);

    useEffect(() => {
        const recId = currentRecInserted ?? currentRec
        if (faceId)
            setValue('tblFaceId', faceId);
        if (recId && dataset.length > 0) {
            const record = dataset.find(({id}) => +id === (+recId));
            setRecord(record);
        }
    }, [faceId, dataset, currentRec, currentRecInserted]);

    useEffect(() => {
        faceAspirantOrders.fetch();
    }, [])

    const openDiaologHandle = (whatBtn) => {
        if (!currentRec && !currentRecInserted) {
            setOpenDlgSaveRecord(true);
            return;
        }
        setOpenDialog(true);
        switch (whatBtn) {
            case 'academ-on': {
                set_tblFace_tblOrder_id(record.set_tblFace_tblOrder_id_on);
                setTypeOrder(2);
                break;
            }
            case 'academ-off': {
                set_tblFace_tblOrder_id(record.set_tblFace_tblOrder_id_off);
                setTypeOrder(3);
            }
            default: {

            }
        }
    }

    const closeDialogHandle = () => {
        setOpenDialog(false);
    }

    const closeDlgSaveRecord = () => {
        setOpenDlgSaveRecord(false);
    }

    const insertRecord = async (data) => {
       const insertedRecord = await insertRec(data);
       if (insertedRecord) {
           setCurrentRecInserted(insertedRecord.id);
       }
        setOpenDlgSaveRecord(false);
    }

    return (
        <FormWrapField
            dataset={dataset}
            closeEdit={closeEdit}
            currentRec={currentRec || currentRecInserted}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit={currentRecInserted ? 'update' : modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            //valuesToState={valuesToState}
        >
            <Grid container >
                <Grid item lg={4}>
                    <InputDate
                        control={control}
                        name='dateOn'
                        rules={{required: true}}
                        defaultValue={null}
                        label='с'
                        required
                        error={!!errors.dateOn}
                        helperText={errors?.dateOn?.message}
                        autoFocus
                    />
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        id='order-in-aspirant'
                        label='приказ'
                        //required
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{shrink: !!record.orderAcademOn}}
                        value={record.orderAcademOn ?? ''}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} className={classes.btnSelect}>
                    <Button
                        type='button'
                        onClick={() => openDiaologHandle('academ-on')}
                        variant='outlined'
                        size='small'
                    >
                        приказ
                    </Button>

                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={4}>
                    <InputDate
                        control={control}
                        name='dateOff'
                        //rules={{required: true}}
                        defaultValue={null}
                        label='по'
                        //required
                        error={!!errors.dateOff}
                        helperText={errors?.dateOff?.message}
                    />
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        id='order-in-aspirant'
                        label='приказ'
                        //required
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{shrink: !!record.orderAcademOff}}
                        value={record.orderAcademOff ?? ''}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} className={classes.btnSelect}>
                    <Button
                        type='button'
                        onClick={() => openDiaologHandle('academ-off')}
                        variant='outlined'
                        size='small'
                    >
                        приказ
                    </Button>

                </Grid>
            </Grid>

            <Input
                control={control}
                name='note'
                //rules={{required: true}}
                defaultValue=''
                label="примечание"
                //required
                type='search'
                error={!!errors.note}
                helperText={errors?.note?.message}
                fullWidth
            />
            <Dialog open={openDialog} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <FaceAspirantOrdersEdit
                        closeEdit={closeDialogHandle}
                        modeEdit={tblFace_tblOrder_id ? 'update' : 'insert'}
                        currentRec={tblFace_tblOrder_id}
                        valuesToState={{tblFaceAspirantAcademId: currentRec || currentRecInserted}}
                        whatRel={typeOrder}
                    />
                </DialogContent>
            </Dialog>

            <ShowMessage
                message='Чтобы указать приказ необходимо сохранить текущие введенные данные. Сохранить?'
                title='ВНИМАНИЕ'
                handleClose={closeDlgSaveRecord}
                open={openDlgSaveRecord}
                buttons={[
                    {label: 'Да', onClick: handleSubmit(insertRecord), },
                    {label: 'Нет', onClick: closeDlgSaveRecord, }
                ]}
            />

        </FormWrapField>
    );
};

export default FaceAspirantAcademEdit;