import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormWrapField from "../form-wrap-field";
import {Input, InputDate} from "../controls/react-hook-form";

const schema = yup.object().shape({
    info: yup
        .string()
        .required("информация обязательное поле"),
    date: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата')
        .required("дата обязательное поле"),
});

const FaceScientificPublEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceScientificPubl: {
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
                name='date'
                rules={{required: true}}
                defaultValue={null}
                label='дата'
                required
                error={!!errors.date}
                helperText={errors?.date?.message}
                autoFocus
            />
            <Input
                control={control}
                name='info'
                rules={{required: true}}
                defaultValue=''
                label="информация о публикации"
                required
                type='search'
                error={!!errors.info}
                helperText={errors?.info?.message}
                fullWidth
            />
        </FormWrapField>
    );
};

export default FaceScientificPublEdit;