import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormWrapField from "../form-wrap-field";
import {Input, InputDate} from "../controls/react-hook-form";

const schema = yup.object().shape({
    enterprise: yup
        .string()
        .required("место работы обязательное поле"),
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

const FaceWorksEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceWorks: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
    } = useAspirantApiContext();

    const valuesToState = {tblFaceId: faceId};

    return (
        <FormWrapField
            dataset={dataset}
            closeEdit={closeEdit}
            currentRec={currentRec}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit={modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            valuesToState={valuesToState}
        >
            <InputDate
                control={control}
                name='dateOn'
                //rules={{required: true}}
                defaultValue={null}
                label='с'
                //required
                error={!!errors.dateOn}
                helperText={errors?.dateOn?.message}
                autoFocus
            />

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

            <Input
                control={control}
                name='enterprise'
                rules={{required: true}}
                defaultValue=''
                label="место работы"
                required
                type='search'
                error={!!errors.enterprise}
                helperText={errors?.enterprise?.message}
                fullWidth
            />

            <Input
                control={control}
                name='jobTitle'
                //rules={{required: true}}
                defaultValue=''
                label="должность"
                //required
                type='search'
                error={!!errors.jobTitle}
                helperText={errors?.jobTitle?.message}
                fullWidth
            />

            <Input
                control={control}
                name='lenOfService'
                //rules={{required: true}}
                defaultValue=''
                label="период"
                //required
                type='search'
                error={!!errors.lenOfService}
                helperText={errors?.lenOfService?.message}
                fullWidth
            />

        </FormWrapField>
    );
};

export default FaceWorksEdit;