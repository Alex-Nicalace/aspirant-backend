import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import FormWrapField from "../form-wrap-field";
import {Input, InputDate} from "../controls/react-hook-form";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object().shape({
    dateOn: yup
        .date()
        .typeError('некорректная дата')
        .required('дата обязательное поле'),
    tblFaceId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("обязательное поле"),
    file: yup
        .mixed()
        .required('обязательное поле')
        .nullable()
        .test('fileType', 'Только файлы: .jpeg, .jpg, .bmp, .png', value => SUPPORTED_FORMATS.includes(value.type))
});

const FacePhotoEdit = ({closeEdit}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        facePhoto: {
            insertRec,
            //updateRec,
            dataset,
            faceId
        }
    } = useAspirantApiContext();

    useEffect(() => {
        if (faceId)
            setValue('tblFaceId', faceId);
    }, [faceId])

    return (
        <FormWrapField
            dataset={dataset}
            closeEdit={closeEdit}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit='insert'
            setValue={setValue}
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
                name='file'
                rules={{required: true}}
                defaultValue=''
                label="выберите фото"
                required
                type='file'
                error={!!errors.file}
                helperText={errors?.file?.message}
                fullWidth
            />
        </FormWrapField>
    );
};

export default FacePhotoEdit;