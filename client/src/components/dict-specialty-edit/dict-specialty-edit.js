import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {Input} from "../controls/react-hook-form";
import ChoiseDivision from "../controls/react-hook-form/choise-division";

const schema = yup.object().shape({
    DirectionalityOrSpecialty: yup
        .string()
        .required("'специальность' обязательное поле"),
    tblDictEnterpriseId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("'кафедра' обязательное поле"),
});

const DictSpecialtyEdit = ({closeEdit, modeEdit, currentRec}) => {
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
            datasetSpecialty,
        },
    } = useAspirantApiContext();

    return (
        <FormWrapField
            dataset={datasetSpecialty}
            closeEdit={closeEdit}
            currentRec={currentRec}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit={modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            //valuesToState={valuesToState}
        >
            <Input
                id='specialty'
                control={control}
                name='DirectionalityOrSpecialty'
                rules={{required: true}}
                defaultValue=''
                label="наименование специальности"
                required
                type='search'
                error={!!errors.DirectionalityOrSpecialty}
                helperText={errors?.DirectionalityOrSpecialty?.message}
                fullWidth
                autoFocus
            />
            {/*<DictEnterpriseAsTree*/}
            {/*    selected={tblDictEnterpriseId}*/}
            {/*    changeSelected={changeEnterpriseIdHandle}*/}
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

export default DictSpecialtyEdit;