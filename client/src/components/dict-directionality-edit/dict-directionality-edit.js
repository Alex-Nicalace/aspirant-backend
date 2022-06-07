import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import ChoiseDivision from "../controls/react-hook-form/choise-division";

const schema = yup.object().shape({
    tblDictNameDirectionId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("'наименование направления' обязательное поле"),
    DirectionalityOrSpecialty: yup
        .string()
        .required("'наименование направленности' обязательное поле"),
    tblDictEnterpriseId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("'кафедра' обязательное поле"),

});

const DictDirectionalityEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    /*такие вот мысли .... редактирование хронологии как правило делается в контектсте редактирвания
    данных о лице кот. уже загружены и в стейте на этот момент уже есть ИД лица
    другой вариант это пробрасывать это свойство сюда через пропсы
    пробую первый вариант брать из стейта
    * */
    const {
        dictDirectionalityAndSpecialty: {
            insertRec,
            updateRec,
            datasetDirectionality,
        },
        dictDirection
    } = useAspirantApiContext();

    useEffect(() => {
        dictDirection.fetch();
    }, [])

    const renderDictDirection = dictDirection.dataset.map((i) => <MenuItem key={i.id} value={i.id}>{i.nameDirection} </MenuItem>);
    renderDictDirection.unshift(<MenuItem key='dictCountry-key' value=''> <em>не выбрано</em> </MenuItem>);

    return (
        <FormWrapField
            dataset={datasetDirectionality}
            closeEdit={closeEdit}
            currentRec={currentRec}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit={modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            //valuesToState={valuesToState}
        >
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictNameDirectionId'
                rules={{required: true}}
                defaultValue=''
                label='направление'
                required
                renderItem={renderDictDirection}
                error={!!errors.tblDictNameDirectionId}
                helperText={errors?.tblDictNameDirectionId?.message}
                fullWidth
            />
            <Input
                id='directionality-id'
                control={control}
                name='DirectionalityOrSpecialty'
                rules={{required: true}}
                defaultValue=''
                label="наименование направленности"
                required
                type='search'
                error={!!errors.DirectionalityOrSpecialty}
                helperText={errors?.DirectionalityOrSpecialty?.message}
                fullWidth
            />
            {/*<DictEnterpriseAsTree*/}
            {/*    changeSelected={changeEnterpriseIdHandle}*/}
            {/*    selected={currentRecInit}*/}
            {/*/>*/}
            <ChoiseDivision
                control={control}
                name='tblDictEnterpriseId'
                rules={{required: true}}
                defaultValue=''
                label='выберите кафедру'
                error={!!errors.tblDictEnterpriseId}
                helperText={errors?.tblDictEnterpriseId?.message}
            />
        </FormWrapField>
    );
}

export default DictDirectionalityEdit;