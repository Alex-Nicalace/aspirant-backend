import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";

const schema = yup.object().shape({
    tblDictCertificationResultId: yup
        .number()
        .required("результат аттестации обязательное поле")
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    year: yup
        .number()
        .min(1, 'мин. зн. 1')
        .transform(value => (isNaN(value) ? undefined : value))
        .required("год обязательное поле")
        .nullable(),
});

const FaceCertificationResultEdit = ({closeEdit, modeEdit, currentRec, valuesToState}) => {
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
        faceCertificationResult: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
        dictCertificationResult
    } = useAspirantApiContext();

    useEffect(() => {
        dictCertificationResult.fetch();
    }, [])

    valuesToState = {...valuesToState, tblFaceId: faceId};

    const renderSubject = dictCertificationResult.dataset.map((i) => <MenuItem key={i.id}
                                                                               value={i.id}>{i.result} </MenuItem>);
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
                name='year'
                rules={{required: true}}
                defaultValue=''
                label="год"
                required
                type='search'
                error={!!errors.year}
                helperText={errors?.year?.message}
                fullWidth
                autoFocus
            />
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictCertificationResultId'
                rules={{required: true}}
                defaultValue=''
                label='результат аттестации'
                required
                renderItem={renderSubject}
                error={!!errors.tblDictCertificationResultId}
                helperText={errors?.tblDictCertificationResultId?.message}
                fullWidth
            />
        </FormWrapField>
    );
}

export default FaceCertificationResultEdit;