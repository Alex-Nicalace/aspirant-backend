import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";

const schema = yup.object().shape({
    tblDictSubjectId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("предмет обязательное поле"),
    estimate: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(1, 'мин. зн. 1')
        .max(5, 'макс. зн. 5')
        .required("оценка обязательное поле")
        .typeError('некорректная оценка'),
    semesterNum: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(1, 'мин. зн. 1')
        .required("семестр обязательное поле")
        .typeError('некорректный семестр'),
});

const FaceExaminationsEdit = ({closeEdit, modeEdit, currentRec, valuesToState}) => {
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
        faceExaminations: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
        dictSubject
    } = useAspirantApiContext();

    useEffect(() => {
        dictSubject.fetch();
    }, [])

    valuesToState = {...valuesToState, tblFaceId: faceId};

    const renderSubject = dictSubject.dataset.map((i) => <MenuItem key={i.id}
                                                                   value={i.id}>{i.subject} </MenuItem>);
    renderSubject.unshift(<MenuItem key='renderSubject-key' value=''> <em>не выбрано</em> </MenuItem>);

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
            <Input
                control={control}
                name='semesterNum'
                rules={{required: true}}
                defaultValue=''
                label="семестр"
                required
                type='search'
                error={!!errors.semesterNum}
                helperText={errors?.semesterNum?.message}
                fullWidth
                autoFocus
            />
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictSubjectId'
                rules={{required: true}}
                defaultValue=''
                label='предмет'
                required
                renderItem={renderSubject}
                error={!!errors.tblDictSubjectId}
                helperText={errors?.tblDictSubjectId?.message}
                fullWidth
            />
            <Input
                control={control}
                name='estimate'
                rules={{required: true}}
                defaultValue=''
                label="оценка"
                required
                type='search'
                error={!!errors.estimate}
                helperText={errors?.estimate?.message}
                fullWidth
            />
        </FormWrapField>
    );
}

export default FaceExaminationsEdit;