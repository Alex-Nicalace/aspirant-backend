import React, {useEffect, useState} from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";
import ChoiseFaceFromTable from "../controls/react-hook-form/choise-face-from-table";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import {getFaceById} from "../../utils/my-func";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {useStylesPopupContent} from "../../hooks/use-styles-popup-content";
import {makeStyles} from "@material-ui/core/styles";

const schema = yup.object().shape({
    tblFaceId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("лицо обязательное поле"),
    tblOrderId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("приказ обязательное поле"),
    note: yup
        .string(),
    typeRel: yup
        .string()
        .required("приказ обязательное поле"),
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

const OrderFacesEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue, watch} = useForm({
        mode: "onBlur",
        //defaultValues: { tblFaceId: null, note: '' },
        resolver: yupResolver(schema),
    });
    const {
        orderFaces: {
            insertRec,
            updateRec,
            datasetModify,
            orderId
        },
        faces
    } = useAspirantApiContext();

    const classesPopup = useStylesPopupContent();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [componentOfPopover, setComponentOfPopover] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        faces.fetch();
    }, [])

    const [face, setFace] = useState('');

    useEffect(() => {
        setFace(getFaceById(watch('tblFaceId'), faces.dataset));
    }, [watch('tblFaceId'), faces.dataset])

    //const valuesToState = {tblOrderId: orderId};
    setValue('tblOrderId', orderId);

    const showFaceSelectionHandle = (e) => {
        setComponentOfPopover('faces');
        setAnchorEl(e.currentTarget);
    }

    const closeEditHandle = () => {
        setAnchorEl(null);
    }

    const typeRel = [
        <MenuItem key='in' value='in'>зачислен</MenuItem>,
        <MenuItem key='out' value='out'>отчислен</MenuItem>,
        <MenuItem key='reIn' value='reIn'>переведен</MenuItem>,
    ]

    return (
        <FormWrapField
            dataset={datasetModify}
            closeEdit={closeEdit}
            currentRec={currentRec}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit={modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            //valuesToState={valuesToState}
        >
            <Grid container>
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='typeRel'
                rules={{required: true}}
                defaultValue=''
                label='о чем приказ'
                required
                renderItem={typeRel}
                error={!!errors.typeRel}
                helperText={errors?.typeRel?.message}
                fullWidth
            />
            <Grid container spacing={1}>
                <Grid item lg={10}>
                    <TextField
                        id='face-aspirant'
                        label='аспирант'
                        required
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{shrink: !!face}}
                        value={face}
                        error={!!errors.tblFaceId}
                        helperText={errors?.tblFaceId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} className={classes.btnSelect}>
                    <Button
                        variant='outlined'
                        type='button'
                        onClick={showFaceSelectionHandle}
                        size='small'
                    >
                        выбрать
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
                error={!!errors.firstname}
                helperText={errors?.firstname?.message}
                fullWidth
            />
            </Grid>

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
                    <div hidden={componentOfPopover !== 'faces'}>
                        <ChoiseFaceFromTable
                            control={control}
                            name='tblFaceId'
                            label='выберите лицо'
                            defaultValue=''
                            error={!!errors.tblFaceId}
                            helperText={errors?.tblFaceId?.message}
                        />
                    </div>
                    <div
                        className={classes.btnClose}
                    >
                        <Button
                            type='button'
                            variant='contained'
                            color='primary'
                            size='small'
                            onClick={closeEditHandle}
                        >
                            закрыть
                        </Button>
                    </div>
                </div>
            </Popover>

        </FormWrapField>
    );
};

export default OrderFacesEdit;