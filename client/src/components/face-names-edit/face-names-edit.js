import React from 'react';
import {useForm} from "react-hook-form";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {Input, InputDate} from "../controls/react-hook-form";

const schema = yup.object().shape({
    firstname: yup
        .string()
        .matches(/^([^0-9]*)$/, "имя не может содержать цифры")
        .required("имя обязательное поле"),
    lastname: yup
        .string()
        .matches(/^([^0-9]*)$/, "фамилия не может содержать цифры")
        .required("фамилия обязательное поле"),
    middleName: yup
        .string()
        .matches(/^([^0-9]*)$/, "отчество не может содержать цифры"),
    dateOn: yup
        .date()
        .typeError('некорректная дата')
        .required('дата обязательное поле')
});

const FaceNamesEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        faceNames: {
            insertRec,
            updateRec,
            dataset,
            faceId
        }
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
                rules={{required: true}}
                defaultValue={null}
                label='актуально с'
                required
                error={!!errors.dateOn}
                helperText={errors?.dateOn?.message}
                autoFocus
            />

            <Input
                control={control}
                name='lastname'
                rules={{required: true}}
                defaultValue=''
                label="фамилия"
                required
                type='search'
                error={!!errors.lastname}
                helperText={errors?.lastname?.message}
                fullWidth
            />

            <Input
                control={control}
                name='firstname'
                rules={{required: true}}
                defaultValue=''
                label="имя"
                required
                type='search'
                error={!!errors.firstname}
                helperText={errors?.firstname?.message}
                fullWidth
            />

            <Input
                control={control}
                name='middleName'
                defaultValue=''
                label="отчество"
                type='search'
                error={!!errors.middleName}
                helperText={errors?.middleName?.message}
                fullWidth
            />

        </FormWrapField>

    );
};

export default FaceNamesEdit;