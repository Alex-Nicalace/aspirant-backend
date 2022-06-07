import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {CheckboxWithLabel, DropdownList, Input, InputDate} from "../controls/react-hook-form";

const schema = yup.object().shape({
    tblDictEducationLevelId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("уровень образования обязательное поле"),
    specialty: yup
        .string()
        .required("специальность обязательное поле"),
    dateFinished: yup
        .date()
        .nullable()
        .typeError('некорректная дата')
        .required("дата окончания обязательное поле"),
    quantitySatisfactory: yup
        .number()
        .min(0, 'не может быть отрицательным')
        .transform(value => (isNaN(value) ? undefined : value))
        .typeError('некорректные данные'),
});

const FaceEducationsEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceEducations: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
        dictEducationLevels
    } = useAspirantApiContext();

    useEffect(() => {
        dictEducationLevels.fetch();
    }, [])

    const valuesToState = {tblFaceId: faceId};

    const renderEducationLevel = dictEducationLevels.dataset.map((i) => <MenuItem key={i.id}
                                                                                  value={i.id}>{i.educationLevel} </MenuItem>);
    renderEducationLevel.unshift(<MenuItem key='dictEducationLevel-key' value=''> <em>не выбрано</em> </MenuItem>);

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
                name='dateFinished'
                rules={{required: true}}
                defaultValue={null}
                label='дата окончания'
                required
                error={!!errors.dateFinished}
                helperText={errors?.dateFinished?.message}
                autoFocus
            />
            <Input
                control={control}
                name='specialty'
                rules={{required: true}}
                defaultValue=''
                label="специальность"
                required
                type='search'
                error={!!errors.specialty}
                helperText={errors?.specialty?.message}
                fullWidth
            />

            <CheckboxWithLabel
                control={control}
                name='isExcellent'
                defaultValue={false}
                label='отличник'
                onChange={(e) => e.target.checked && setValue('quantitySatisfactory', 0)}
                error={!!errors.isExcellent}
                helperText={errors?.isExcellent?.message}
                fullWidth
            />

            <Input
                control={control}
                name='quantitySatisfactory'
                //rules={{required: true}}
                defaultValue=''
                label="кол. уд. оценок"
                //required
                type='search'
                error={!!errors.quantitySatisfactory}
                helperText={errors?.quantitySatisfactory?.message}
                onChange={() => setValue('isExcellent', false)}
                fullWidth
            />
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictEducationLevelId'
                rules={{required: true}}
                defaultValue=''
                label='уровень образования'
                required
                renderItem={renderEducationLevel}
                error={!!errors.tblDictEducationLevelId}
                helperText={errors?.tblDictEducationLevelId?.message}
                fullWidth
            />

        </FormWrapField>
    );
}

export default FaceEducationsEdit;