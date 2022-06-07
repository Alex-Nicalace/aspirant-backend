import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {Input, DropdownList, InputDate} from "../controls/react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    tblDictDocId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .default(null)
        .required("тип документа обязательное поле"),
    tblDictCountryId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .default(null)
        .required("страна обязательное поле"),
    numDocument: yup
        .string(),
    dateOn: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата'),
    dateOff: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата')
});

const FaceDocumentsEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceDocuments: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
        dictDoc,
        dictCountry
    } = useAspirantApiContext();

    const valuesToState = {tblFaceId: faceId};

    useEffect(() => {
        dictDoc.fetch();
        dictCountry.fetch();
    }, [])

    const renderDocsKind = dictDoc.dataset.map((i) => <MenuItem key={i.id} value={i.id}>{i.document} </MenuItem>);
    renderDocsKind.unshift(<MenuItem key='dictDoc-key' value=''> <em>не выбрано</em> </MenuItem>);

    const renderCountry = dictCountry.dataset.map((i) => <MenuItem key={i.id} value={i.id}>{i.country} </MenuItem>);
    renderCountry.unshift(<MenuItem key='dictCountry-key' value=''> <em>не выбрано</em> </MenuItem>);

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
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictDocId'
                rules={{required: true}}
                defaultValue=''
                label='документ'
                required
                renderItem={renderDocsKind}
                error={!!errors.tblDictDocId}
                helperText={errors?.tblDictDocId?.message}
                fullWidth
            />

            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictCountryId'
                rules={{required: true}}
                defaultValue=''
                label='страна'
                required
                renderItem={renderCountry}
                error={!!errors.tblDictCountryId}
                helperText={errors?.tblDictCountryId?.message}
                fullWidth
            />

            <InputDate
                control={control}
                name='dateOn'
                //rules={{required: true}}
                defaultValue={null}
                label='выдан'
                //required
                error={!!errors.dateOn}
                helperText={errors?.dateOn?.message}
            />

            <InputDate
                control={control}
                name='dateOff'
                //rules={{required: true}}
                defaultValue={null}
                label='действителен до'
                //required
                error={!!errors.dateOff}
                helperText={errors?.dateOff?.message}
            />

            <Input
                control={control}
                name='numDocument'
                //rules={{required: true}}
                defaultValue=''
                label="номер документа"
                //required
                type='search'
                error={!!errors.numDocument}
                helperText={errors?.numDocument?.message}
                fullWidth
            />

        </FormWrapField>
    );
};

export default FaceDocumentsEdit;