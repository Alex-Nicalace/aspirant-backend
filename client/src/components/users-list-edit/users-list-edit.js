import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {CheckboxWithLabel, Input} from "../controls/react-hook-form";

const schema = yup.object().shape({
    login: yup
        .string()
        //.transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("обязательное поле"),
    password: yup
        .string()
        .nullable()
        .required("обязательное поле"),
    isAdmin: yup
        .boolean()
        .nullable()
        .transform(value => (value === '' ? undefined : value)),
    canInsert: yup
        .boolean()
        .nullable()
        .transform(value => (value === '' ? undefined : value)),
    canUpdate: yup
        .boolean()
        .nullable()
        .transform(value => (value === '' ? undefined : value)),
    canDelete: yup
        .boolean()
        .nullable()
        .transform(value => (value === '' ? undefined : value)),
});

const UsersListEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        usersList: {
            insertRec,
            updateRec,
            dataset,
        }
    } = useAspirantApiContext();

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
        >
            <Input
                control={control}
                name='login'
                rules={{required: true}}
                defaultValue=''
                label="логин"
                required
                type='search'
                error={!!errors.login}
                helperText={errors?.login?.message}
                fullWidth
            />
            <Input
                control={control}
                name='password'
                rules={{required: true}}
                defaultValue=''
                label="пароль"
                required
                type='password'
                error={!!errors.password}
                helperText={errors?.password?.message}
                fullWidth
            />
            <CheckboxWithLabel
                control={control}
                name='isAdmin'
                defaultValue={false}
                label='администратор'
                //fullWidth
                error={!!errors.isAdmin}
                helperText={errors?.isAdmin?.message}
            />
            <CheckboxWithLabel
                control={control}
                name='canInsert'
                defaultValue={false}
                label='вставка'
                //fullWidth
                error={!!errors.canInsert}
                helperText={errors?.canInsert?.message}
            />
            <CheckboxWithLabel
                control={control}
                name='canUpdate'
                defaultValue={false}
                label='обновление'
                //fullWidth
                error={!!errors.canUpdate}
                helperText={errors?.canUpdate?.message}
            />
            <CheckboxWithLabel
                control={control}
                name='canDelete'
                defaultValue={false}
                label='удаление'
                //fullWidth
                error={!!errors.canDelete}
                helperText={errors?.canDelete?.message}
            />

        </FormWrapField>
    )
};

export default UsersListEdit;