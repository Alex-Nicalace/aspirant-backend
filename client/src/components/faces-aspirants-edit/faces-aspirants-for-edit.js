import React, {useEffect, useState} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {
    CheckboxWithLabel,
    ChoiseAcademicAdvisorFromTable,
    DropdownList,
    Input,
    ChoiseDirectionalityOrSpecialtyFromTable, InputDate
} from "../controls/react-hook-form";
import Popover from "@material-ui/core/Popover";
import ChoiseFaceFromTable from "../controls/react-hook-form/choise-face-from-table";
import Button from "@material-ui/core/Button";
import FaceAspirantOrdersEdit from "../face-aspirant-orders-edit";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useStylesPopupContent} from "../../hooks/use-styles-popup-content";
import {getFaceById} from "../../utils/my-func";

const schema = yup.object().shape({
    tblFaceId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("лицо обязательное поле"),
    isRecommendation: yup
        .boolean()
        .nullable(),
    isProtocol: yup
        .boolean()
        .nullable(),
    isAgree: yup
        .boolean(),
    isHeadDepartment: yup
        .boolean(),
    tblDictSubjectId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("предмет обязательное поле"),
    tblDictEducationFormId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("форма обучения обязательное поле"),
    tblDictSpecialtyId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("направленность/спец. обязательное поле"),
    dissertationTheme: yup
        .string()
        .required("тема диссертации обязательное поле"),
    tblAcademicAdvisorId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("научный руководитель обязательное поле"),
    dateOn: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата'),
    dateOff: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата'),
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

const FacesAspirantsForEdit = ({closeEdit, modeEdit, currentRec, aspirantApiContext}) => {
    const classes = useStyles();
    const classesPopup = useStylesPopupContent();
    const {control, handleSubmit, formState: {errors}, setValue, watch} = useForm({
        mode: "onBlur",
        defaultValues: {tblFaceId: null/*, orderIn: ''*/},
        resolver: yupResolver(schema),
    });
    const {
        aspirant: {
            insertRec,
            updateRec,
            datasetModify,
            faceId,
            advisorId,
        },
        faces,
        facesAcademicAdvisor,
        dictSubject,
        dictEducationForm,
        faceAspirantOrders,
        orders,
        dictDirectionalityAndSpecialty,
    } = aspirantApiContext;

    useEffect(() => {
        facesAcademicAdvisor.fetch();
        dictSubject.fetch();
        dictEducationForm.fetch();
        faceAspirantOrders.fetch(currentRec)
        faces.fetch();
        dictDirectionalityAndSpecialty.fetch();
    }, []);

    const [face, setFace] = useState('');
    const [academicAdvisor, setAcademicAdvisor] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [direction, setDirection] = useState('');
    const [division, setDivision] = useState('');
    const [componentOfPopover, setComponentOfPopover] = useState(null);
    const [orderIn, setOrderIn] = useState('');
    const [orderOut, setOrderOut] = useState('');

    useEffect(() => {
        // чтобы отражать изменния приказов в режиме update
        if (!currentRec || (modeEdit !== 'update')) return;
        const result = datasetModify.find(i => i.id === currentRec);
        setOrderIn(result.orderIn);
        setOrderOut(result.orderOut);
    }, [datasetModify, currentRec, modeEdit])

    useEffect(() => {
        if (faceId)
            setValue('tblFaceId', faceId);
        if (advisorId)
            setValue('tblAcademicAdvisorId', advisorId);
    }, [faceId, advisorId])

    // if (faceId)
    //     setValue('tblFaceId', faceId);

    const [tblFace_tblOrder, setTblFace_tblOrder] = useState({
        face_order: {arr: [/*{}, {}*/]}
        //ordersArr: [{}, {}]
    });
    const [tblFace_tblOrderId, setTblFace_tblOrderId] = useState(null);
    const [typeOrder, setTypeOrder] = useState(null);

    //const orderIn = watch('orderIn');
    const orderIn_tblFace_tblOrderId = watch('orderIn_tblFace_tblOrderId');
    //const orderOut = watch('orderOut');
    const orderOut_tblFace_tblOrderId = watch('orderOut_tblFace_tblOrderId');

    useEffect(() => {
        setFace(getFaceById(watch('tblFaceId'), faces.dataset));
    }, [watch('tblFaceId'), faces.dataset])

    useEffect(() => {
        setAcademicAdvisor(getAcademicAdvisorById(watch('tblAcademicAdvisorId')));
    }, [watch('tblAcademicAdvisorId'), facesAcademicAdvisor.datasetModify]);

    useEffect(() => {
        const {direction, division, specialty} = getSpecialtyById(watch('tblDictSpecialtyId'));
        setSpecialty(specialty);
        setDirection(direction ?? '');
        setDivision(division);
    }, [watch('tblDictSpecialtyId'), dictDirectionalityAndSpecialty.datasetAll]);

    // const getFaceById = (id) => {
    //     const face = faces.dataset.find(i => +i.id === +id);
    //     return face && `${face.lastname} ${face.firstname} ${face.middleName}, ${new Date(face.birthdate).toLocaleDateString()} г.р.`
    // }

    const getOrderById = (id) => {
        const order = orders.dataset.find(i => +i.id === +id)
        return order && `№${order.numOrder} от ${new Date(order.dateOrder).toLocaleDateString()} г.`
    }

    const getAcademicAdvisorById = (id) => {
        const advisor = facesAcademicAdvisor.datasetModify.find(i => +i.id === +id)
        return advisor && `${advisor.lastname} ${advisor.firstname} ${advisor.middleName}, ${new Date(advisor.birthdate).toLocaleDateString()} г.р.`
    }

    const getSpecialtyById = (id) => {
        const specialty = dictDirectionalityAndSpecialty.datasetAll.find(i => +i.id === +id)
        //console.log(dictDirectionalityAndSpecialty.datasetAll)
        //return specialty && `${specialty.nameDirection || ''} ${specialty.nameDirection ? 'направленность' : 'специальность'}: - ${specialty.DirectionalityOrSpecialty} - ${specialty.nameSubDiv} `
        return {
            direction: specialty?.nameDirection,
            specialty: specialty?.DirectionalityOrSpecialty,
            division: specialty?.joinedName,
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const closeEditHandle = () => {
        //setModeEdit(null);
        setAnchorEl(null);
    }

    const showFaceSelectionHandle = (e) => {
        setComponentOfPopover('faces');
        setAnchorEl(e.currentTarget);
    }

    const showAcademicAdvisorSelectionHandle = (e) => {
        setComponentOfPopover('academicAdvisor');
        setAnchorEl(e.currentTarget);
    }

    const showSpecialtySelectionHandle = (e) => {
        setComponentOfPopover('specialty');
        setAnchorEl(e.currentTarget);
    }

    const showOrderSelectionHandle = (event, whatBtn) => {
        // if (modeEdit === 'update' && !currentRec)
        //     return;
        //setModeEdit(modeEdit);
        switch (whatBtn) {
            case 'in': {
                setTblFace_tblOrderId(orderIn_tblFace_tblOrderId);
                setTypeOrder(0);
                break;
            }
            case 'out': {
                setTblFace_tblOrderId(orderOut_tblFace_tblOrderId);
                setTypeOrder(1);
                break;
            }
            default: {

            }
        }
        setComponentOfPopover('order');
        setAnchorEl(event.currentTarget);
    }

    const takeDataOrder = (order) => {
        setTblFace_tblOrder(prev => {
            const temp = {...prev};
            temp.face_order.arr[typeOrder] = {...order};
            return temp
        })


    }

    const renderSubject = dictSubject.dataset.map((i) => <MenuItem key={i.id}
                                                                   value={i.id}>{i.subject} </MenuItem>);
    renderSubject.unshift(<MenuItem key='renderSubject-key' value=''> <em>не выбрано</em> </MenuItem>);

    const renderDictEducationForm = dictEducationForm.dataset.map((i) => <MenuItem key={i.id}
                                                                                   value={i.id}>{i.educationForm} </MenuItem>);
    renderDictEducationForm.unshift(<MenuItem key='renderDictEducationForm-key' value=''> <em>не выбрано</em>
    </MenuItem>);

    const orderInValue = orderIn || getOrderById(tblFace_tblOrder.face_order.arr[0]?.tblOrderId)
    const orderOutValue = orderOut || getOrderById(tblFace_tblOrder.face_order.arr[1]?.tblOrderId)

    let labelSpec = '';
    if (!specialty)
        labelSpec = 'специальность/направленность'
    if (direction)
        labelSpec = 'направленность'
    if (!direction && specialty)
        labelSpec = 'специальность'
    return (
        <>
            <FormWrapField
                dataset={datasetModify}
                closeEdit={closeEdit}
                currentRec={currentRec}
                handleSubmit={handleSubmit}
                insertRec={insertRec}
                modeEdit={modeEdit}
                setValue={setValue}
                updateRec={updateRec}
                valuesToState={tblFace_tblOrder} //приказы которые вставляются на этапе встаки
            >
                <div hidden={!!faceId}>
                    <Grid container>
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
                </div>
                <CheckboxWithLabel
                    control={control}
                    name='isRecommendation'
                    defaultValue={false}
                    label='реком. сов. фак.'
                    //fullWidth
                    error={!!errors.isRecommendation}
                    helperText={errors?.isRecommendation?.message}
                />
                <CheckboxWithLabel
                    control={control}
                    name='isProtocol'
                    defaultValue={false}
                    label='выписка из протокола'
                    error={!!errors.isProtocol}
                    helperText={errors?.isProtocol?.message}
                />
                <CheckboxWithLabel
                    control={control}
                    name='isAgree'
                    defaultValue={false}
                    label='согласие на науч. рук.'
                    error={!!errors.isAgree}
                    helperText={errors?.isAgree?.message}
                />
                <CheckboxWithLabel
                    control={control}
                    name='isHeadDepartment'
                    defaultValue={false}
                    label='согласование зав. каф.'
                    error={!!errors.isHeadDepartment}
                    helperText={errors?.isHeadDepartment?.message}
                />
                <div>
                    <Grid container>
                        <Grid item lg={3}>
                            <InputDate
                                control={control}
                                name='dateOn'
                                //rules={{required: true}}
                                defaultValue={null}
                                label='зачислен'
                                //required
                                error={!!errors.dateOn}
                                helperText={errors?.dateOn?.message}
                            />
                        </Grid>
                        <Grid item lg={7}>
                            <TextField
                                id='order-in-aspirant'
                                label='приказ'
                                //required
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{shrink: !!orderInValue}}
                                value={orderInValue}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.btnSelect}>
                            <Button
                                type='button'
                                onClick={(e) => showOrderSelectionHandle(e, 'in')}
                                variant='outlined'
                                size='small'
                            >
                                приказ
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item lg={3}>
                            <InputDate
                                control={control}
                                name='dateOff'
                                //rules={{required: true}}
                                defaultValue={null}
                                label='отчислен'
                                //required
                                error={!!errors.dateOff}
                                helperText={errors?.dateOff?.message}
                            />
                        </Grid>
                        <Grid item lg={7}>
                            <TextField
                                id='order-out-aspirant'
                                label='приказ'
                                //required
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{shrink: !!orderOutValue}}
                                value={orderOutValue}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.btnSelect}>
                            <Button
                                type='button'
                                onClick={(e) => showOrderSelectionHandle(e, 'out')}
                                variant='outlined'
                                size='small'
                            >
                                приказ
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <DropdownList
                    style={{minWidth: "200px"}}
                    control={control}
                    name='tblDictSubjectId'
                    rules={{required: true}}
                    defaultValue=''
                    label='предмет'
                    required
                    renderItem={renderSubject}
                    error={!!errors.tblDictSubjectId}
                    helperText={errors?.tblDictSubjectId?.message}
                    fullWidth
                />
                <DropdownList
                    style={{minWidth: "200px"}}
                    control={control}
                    name='tblDictEducationFormId'
                    rules={{required: true}}
                    defaultValue=''
                    label='форма обучения'
                    required
                    renderItem={renderDictEducationForm}
                    error={!!errors.tblDictEducationFormId}
                    helperText={errors?.tblDictEducationFormId?.message}
                    fullWidth
                />
                <Input
                    control={control}
                    name='dissertationTheme'
                    rules={{required: true}}
                    defaultValue=''
                    label="тема диссертации"
                    required
                    type='search'
                    error={!!errors.dissertationTheme}
                    helperText={errors?.dissertationTheme?.message}
                    fullWidth
                />
                <div hidden={!!advisorId}>
                    <Grid container>
                        <Grid item lg={10}>
                            <TextField
                                id='academic-advisor-id'
                                label='научный руководитель'
                                required
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{shrink: !!academicAdvisor}}
                                value={academicAdvisor}
                                error={!!errors.tblAcademicAdvisorId}
                                helperText={errors?.tblAcademicAdvisorId?.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.btnSelect}>
                            <Button
                                variant='outlined'
                                type='button'
                                onClick={showAcademicAdvisorSelectionHandle}
                                size='small'
                            >
                                выбрать
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Grid container>
                    <Grid item lg={10}>
                        <TextField
                            id='specialty-id'
                            label='направление'
                            //required
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{shrink: !!direction}}
                            value={direction}
                            error={!!errors.tblDictSpecialtyId}
                            helperText={errors?.tblDictSpecialtyId?.message}
                            fullWidth
                        />
                        <TextField
                            id='specialty-id'
                            label={labelSpec}
                            required
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{shrink: !!specialty}}
                            value={specialty}
                            error={!!errors.tblDictSpecialtyId}
                            helperText={errors?.tblDictSpecialtyId?.message}
                            fullWidth
                        />
                        <TextField
                            id='specialty-id'
                            label='кафедра'
                            required
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{shrink: !!division}}
                            value={division}
                            error={!!errors.tblDictSpecialtyId}
                            helperText={errors?.tblDictSpecialtyId?.message}
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={2} className={`${classes.btnSelect} ${classes.btnSelect__spec}`}>
                        <Button
                            variant='outlined'
                            type='button'
                            onClick={showSpecialtySelectionHandle}
                            size='small'
                        >
                            выбрать
                        </Button>
                    </Grid>
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
                        <div hidden={componentOfPopover !== 'academicAdvisor'}>
                            <ChoiseAcademicAdvisorFromTable
                                control={control}
                                name='tblAcademicAdvisorId'
                                rules={{required: true}}
                                defaultValue=''
                                label='выберите научного руководителя'
                                error={!!errors.tblAcademicAdvisorId}
                                helperText={errors?.tblAcademicAdvisorId?.message}
                            />
                        </div>
                        <div hidden={componentOfPopover !== 'specialty'}>
                            <ChoiseDirectionalityOrSpecialtyFromTable
                                control={control}
                                name='tblDictSpecialtyId'
                                rules={{required: true}}
                                defaultValue=''
                                label='выберите направленность/специальность'
                                error={!!errors.tblDictSpecialtyId}
                                helperText={errors?.tblDictSpecialtyId?.message}
                            />
                        </div>
                        {/*--------button-----------*/}
                        <div
                            hidden={componentOfPopover === 'order'}
                            className={classes.btnClose}
                            //style={{textAlign:'right'}}
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

                        <div hidden={componentOfPopover !== 'order'}>
                            <FaceAspirantOrdersEdit
                                closeEdit={closeEditHandle}
                                modeEdit={!tblFace_tblOrderId ? 'insert' : modeEdit}
                                currentRec={tblFace_tblOrderId}
                                valuesToState={{tblFaceAspirantId: currentRec}}
                                insertRecProp={modeEdit === 'insert' ? takeDataOrder : undefined}
                                whatRel={typeOrder}
                            />
                        </div>


                    </div>
                </Popover>
            </FormWrapField>
        </>
    )
}

export default FacesAspirantsForEdit;