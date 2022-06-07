import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBirthdateFioSex from "../input-birthdate-fio-sex";
import {DropdownList, Input} from "../../controls/react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import InputParsedDate from "../input-parsed-date";
import {useAspirantApiContext} from "../../context/aspirant-api-context/aspirant-api-context";
import {useSortedArray} from "../../../hooks/use-sorted-array";

const schema = yup.object().shape({
    dd: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(1, 'ошибка')
        .max(31, 'ошибка')
        .nullable(),
    mm: yup
        .number()
        .min(1, 'ошибка')
        .max(12, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    yyyy: yup
        .number()
        .min(1900, 'ошибка')
        .max(2099, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    sex: yup
        .boolean()
        .transform(value => (value === '' ? undefined : value))
        .nullable(),
    firstname: yup
        .string()
        .nullable()
        .matches(/^([^0-9]*)$/, "не может содержать цифры"),
    lastname: yup
        .string()
        .nullable()
        .matches(/^([^0-9]*)$/, "не может содержать цифры"),
    middleName: yup
        .string()
        .nullable()
        .matches(/^([^0-9]*)$/, "не может содержать цифры"),
    isRecommendation: yup
        .boolean()
        .transform(value => (value === '' ? undefined : value))
        .nullable(),
    isProtocol: yup
        .boolean()
        .transform(value => (value === '' ? undefined : value))
        .nullable(),
    isAgree: yup
        .boolean()
        .transform(value => (value === '' ? undefined : value))
        .nullable(),
    isHeadDepartment: yup
        .boolean()
        .transform(value => (value === '' ? undefined : value))
        .nullable(),
    // зачислен
    ddIn: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(1, 'ошибка')
        .max(31, 'ошибка')
        .nullable(),
    mmIn: yup
        .number()
        .min(1, 'ошибка')
        .max(12, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    yyyyIn: yup
        .number()
        .min(1900, 'ошибка')
        .max(2099, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    // исключен
    ddOut: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(1, 'ошибка')
        .max(31, 'ошибка')
        .nullable(),
    mmOut: yup
        .number()
        .min(1, 'ошибка')
        .max(12, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    yyyyOut: yup
        .number()
        .min(1900, 'ошибка')
        .max(2099, 'ошибка')
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    dissertationTheme: yup
        .string(),
    tblDictEducationFormId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    tblDictNameDirectionId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    tblDictSpecialtyId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    facultyId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    departmentId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    tblDictSubjectId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    tblAcademicAdvisorId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
});

const useStyles = makeStyles(theme => ({
    button: {
        //alignSelf: 'flex-end',
        marginTop: `${theme.spacing(2)}px`,
        textAlign: 'center'
    },
    flexContainer:{
        '& div': {
            flexGrow: 1
        }
    }
}))

const AspirantFindForm = ({fetch}) => {
    const classes = useStyles();
    const {control, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        dictEducationForm,
        dictDirection,
        dictDirectionalityAndSpecialty: dictDirAndSpec,
        dictEnterprise,
        dictSubject,
        facesAcademicAdvisor,
    } = useAspirantApiContext();

    useEffect(() => {
        dictEducationForm.fetch();
        dictDirection.fetch();
        dictDirAndSpec.fetch();
        dictEnterprise.fetch();
        dictSubject.fetch();
        facesAcademicAdvisor.fetch();
    }, [])

    const dictDirAndSpecDatasetSorted = useSortedArray(dictDirAndSpec.datasetAll, 'DirectionalityOrSpecialty');
    const subjects =  useSortedArray(dictSubject.dataset, 'subject');
    const directions = useSortedArray(dictDirection.dataset, 'nameDirection');
    const advisors = useSortedArray(facesAcademicAdvisor.datasetModify, 'lastname')
        .map(({id, lastname, firstname, middleName, birthdate}) => ({id, name: `${lastname} ${firstname} ${middleName}, ${new Date(birthdate).toLocaleDateString()} г.р.`}))

    const dictEnterpriseSorted = useSortedArray(dictEnterprise.dataset, 'name');
    const faculties = dictEnterpriseSorted.filter(({whatIsIt}) => whatIsIt === 'faculty');
    const departments = dictEnterpriseSorted.filter(({whatIsIt}) => whatIsIt === 'department');


    const submitHandle = (data, e = null) => {
        e && e.preventDefault();
        fetch(data);
    }

    const renderBoolean = [
        <MenuItem key='1' value=''><em>пусто</em></MenuItem>,
        <MenuItem key='2' value={true}>да</MenuItem>,
        <MenuItem key='3' value={false}>нет</MenuItem>
    ]

    const renderDictEducationForm = dictEducationForm.dataset.map((i) =>
        <MenuItem key={i.id} value={i.id}>{i.educationForm} </MenuItem>);
    renderDictEducationForm.unshift(
        <MenuItem key='renderDictEducationForm-key' value=''>
            <em>не выбрано</em>
        </MenuItem>);

    const renderDictDirAndSpec = dictDirAndSpecDatasetSorted.map(({
                                                                      DirectionalityOrSpecialty: name,
                                                                      id,
                                                                      tblDictNameDirectionId
                                                                  }) =>
        <MenuItem key={id}
                  value={id}>{`${name} (${tblDictNameDirectionId ? 'направленность' : 'специальность'})`}</MenuItem>);
    renderDictDirAndSpec.unshift(
        <MenuItem key='renderDictDirAndSpec-key' value=''>
            <em>не выбрано</em>
        </MenuItem>);

    return (
        <form /*onSubmit={handleSubmit(submitHandle)}*/>
            <div>
                <InputBirthdateFioSex
                    control={control}
                    errors={errors}
                    lastname='lastname'
                    firstname='firstname'
                    middleName='middleName'
                    dd='dd'
                    mm='mm'
                    yyyy='yyyy'
                    sex='sex'
                />
            </div>

            <Grid className={classes.flexContainer} container spacing={1}>
                <Grid item>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='isRecommendation'
                        //rules={{required: true}}
                        defaultValue=''
                        label='реком. сов. фак.'
                        //required
                        renderItem={renderBoolean}
                        error={!!errors.isRecommendation}
                        helperText={errors?.isRecommendation?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='isProtocol'
                        //rules={{required: true}}
                        defaultValue=''
                        label='вып. из прот.'
                        //required
                        renderItem={renderBoolean}
                        error={!!errors.isProtocol}
                        helperText={errors?.isProtocol?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='isAgree'
                        //rules={{required: true}}
                        defaultValue=''
                        label='согл. на науч. рук.'
                        //required
                        renderItem={renderBoolean}
                        error={!!errors.isAgree}
                        helperText={errors?.isAgree?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='isHeadDepartment'
                        //rules={{required: true}}
                        defaultValue=''
                        label='согл. зав. каф.'
                        //required
                        renderItem={renderBoolean}
                        error={!!errors.isHeadDepartment}
                        helperText={errors?.isHeadDepartment?.message}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item>
                    <InputParsedDate
                        control={control}
                        dd='ddIn'
                        mm='mmIn'
                        yyyy='yyyyIn'
                        errors={errors}
                        label='зачислен:'
                    />
                </Grid>
                <Grid item>
                    <InputParsedDate
                        control={control}
                        dd='ddOut'
                        mm='mmOut'
                        yyyy='yyyyOut'
                        errors={errors}
                        label='исключен:'
                    />
                </Grid>
            </Grid>

            <Grid className={classes.flexContainer} container spacing={1}>
                <Grid item lg={3}>
                    <Input
                        control={control}
                        name='dissertationTheme'
                        //rules={{required: true}}
                        defaultValue=''
                        label="тема диссертации"
                        //required
                        type='search'
                        error={!!errors.dissertationTheme}
                        helperText={errors?.dissertationTheme?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='tblDictEducationFormId'
                        defaultValue=''
                        label='форма обучения'
                        items={dictEducationForm.dataset}
                        itemKey='id'
                        itemVisibleName='educationForm'
                        error={!!errors.tblDictEducationFormId}
                        helperText={errors?.tblDictEducationFormId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='tblDictNameDirectionId'
                        defaultValue=''
                        label='направление'
                        //renderItem={renderDictNameDirection}
                        items={directions}
                        itemKey='id'
                        //itemValue='id'
                        itemVisibleName='nameDirection'
                        error={!!errors.tblDictNameDirectionId}
                        helperText={errors?.tblDictNameDirectionId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "400px"}}
                        control={control}
                        name='tblDictSpecialtyId'
                        defaultValue=''
                        label='направленностьть/специальность'
                        renderItem={renderDictDirAndSpec}
                        error={!!errors.tblDictSpecialtyId}
                        helperText={errors?.tblDictSpecialtyId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='departmentId'
                        defaultValue=''
                        label='кафедра'
                        //renderItem={renderDepartment}
                        items={departments}
                        itemKey='id'
                        //itemValue='id'
                        itemVisibleName='name'
                        error={!!errors.departmentId}
                        helperText={errors?.departmentId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='facultyId'
                        defaultValue=''
                        label='факультет'
                        //renderItem={renderFaculty}
                        items={faculties}
                        itemKey='id'
                        //itemValue='id'
                        itemVisibleName='name'
                        error={!!errors.facultyId}
                        helperText={errors?.facultyId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "200px"}}
                        control={control}
                        name='tblDictSubjectId'
                        defaultValue=''
                        label='ин. яз'
                        items={subjects}
                        itemKey='id'
                        //itemValue='id'
                        itemVisibleName='subject'
                        error={!!errors.tblDictSubjectId}
                        helperText={errors?.tblDictSubjectId?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3}>
                    <DropdownList
                        style={{minWidth: "300px"}}
                        control={control}
                        name='tblAcademicAdvisorId'
                        defaultValue=''
                        label='научный руководитель'
                        items={advisors}
                        itemKey='id'
                        //itemValue='id'
                        itemVisibleName='name'
                        error={!!errors.tblAcademicAdvisorId}
                        helperText={errors?.tblAcademicAdvisorId?.message}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <div className={classes.button}>
                <Button
                    //type='submit'
                    // закрывает окно в случае когда на форме надо найти лицо => закоментил
                    type='button'
                    onClick={handleSubmit(submitHandle)}
                    variant='contained'
                    size='small'
                    color='primary'>
                    найти
                </Button>
            </div>
        </form>
    );
};

export default AspirantFindForm;