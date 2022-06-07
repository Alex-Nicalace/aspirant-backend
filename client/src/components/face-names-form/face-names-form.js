import React, {useEffect} from 'react';
import {useForm, Controller} from "react-hook-form";
import {KeyboardDatePicker} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormButtons from "../form-buttons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
        .required('дата обязательное поле')
});

const FaceNamesForm = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({mode: "onBlur", resolver: yupResolver(schema),});
    const {
        faceNames: {
            insertRec,
            updateRec,
            dataset,
            faceId
        }
    } = useAspirantApiContext();

    useEffect(() => {
        if (modeEdit === 'update') {
            const result = dataset.find(i => i.id === currentRec);
            for (const key in result) {
                // этот код будет вызван для каждого свойства объекта
                // ..и выведет имя свойства и его значение

                setValue(key, result[key]);
            }
        }
    }, [])

    const saveChangesHandle = async (data) => {
        closeEdit();

        switch (modeEdit) {
            case 'insert':
                await insertRec({...data, tblFaceId: faceId});
                return
            case 'update':
                await updateRec({id: currentRec, ...data, tblFaceId: faceId});
                return
            default:
                return
        }
    }

    return (
        <FormButtons saveBtn={handleSubmit(saveChangesHandle)} closeEdit={closeEdit}>
            <Controller
                name="dateOn"
                //rules={{ required: true }}
                control={control}
                defaultValue={null}
                rules={{required: true}}
                render={({field}) => (
                    <KeyboardDatePicker
                        //id='dateOn-id'
                        label='актуально с'
                        variant='inline' // календарь где показывать
                        format='dd.MM.yyyy'
                        autoOk
                        required
                        KeyboardButtonProps={{
                            'arial-label': 'secondary checkbox',
                        }}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}
                        error={!!errors.dateOn}
                        helperText={errors?.dateOn?.message}
                        //inputRef={field.ref}
                    />
                )}
            />

            <Controller
                name="lastname"
                control={control}
                defaultValue=''
                rules={{required: true}}
                render={({field}) => (
                    <TextField
                        label="фамилия"
                        required
                        type='search'
                        fullWidth
                        error={!!errors.lastname}
                        helperText={errors?.lastname?.message}
                        {...field}
                    />
                )}
            />

            <Controller
                name="firstname"
                control={control}
                defaultValue=''
                rules={{required: true}}
                render={({field}) => (
                    <TextField
                        label="имя"
                        required
                        type='search'
                        fullWidth
                        error={!!errors.firstname}
                        helperText={errors?.firstname?.message}
                        {...field}
                    />
                )}
            />

            <Controller
                name="middleName"
                control={control}
                defaultValue=''
                render={({field}) => (
                    <TextField
                        label="отчество"
                        //required
                        type='search'
                        fullWidth
                        error={!!errors.middleName}
                        helperText={errors?.middleName?.message}
                        {...field}
                    />
                )}
            />

        </FormButtons>

    );
};

export default FaceNamesForm;