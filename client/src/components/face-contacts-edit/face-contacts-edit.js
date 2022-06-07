import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";

const schema = yup.object().shape({
    tblDictContactTypeId: yup
        .number()
        .nullable()
        .transform(value => (isNaN(value) ? undefined : value))
        .required("тип контакта обязательное поле"),
    contact: yup
        .string()
        .required("контакт обязательное поле"),
});

const FaceContactsEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceContacts: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
        dictContactType
    } = useAspirantApiContext();

    useEffect(() => {
        dictContactType.fetch();
    }, [])

    const valuesToState = {tblFaceId: faceId};

    const renderContactType = dictContactType.dataset.map((i) => <MenuItem key={i.id}
                                                                           value={i.id}>{i.contactType} </MenuItem>);
    renderContactType.unshift(<MenuItem key='dictContactType-key' value=''> <em>не выбрано</em> </MenuItem>);

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
                name='tblDictContactTypeId'
                rules={{required: true}}
                defaultValue=''
                label='тип контакта'
                required
                renderItem={renderContactType}
                error={!!errors.tblDictContactTypeId}
                helperText={errors?.tblDictContactTypeId?.message}
                fullWidth
            />
            <Input
                control={control}
                name='contact'
                rules={{required: true}}
                defaultValue=''
                label="контакт"
                required
                type='search'
                error={!!errors.contact}
                helperText={errors?.contact?.message}
                fullWidth
            />
        </FormWrapField>
    );
}

export default FaceContactsEdit;