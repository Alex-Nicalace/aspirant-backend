import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {DropdownList} from "../controls/react-hook-form";

const schema = yup.object().shape({
    tblDictCountryId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("гражданство обязательное поле"),
});

const FaceCitizenshipsEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceCitizenships: {
            insertRec,
            updateRec,
            dataset,
            faceId
        }, dictCountry
    } = useAspirantApiContext();

    const valuesToState = {tblFaceId: faceId};

    useEffect(() => {
        dictCountry.fetch();
    }, [])

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
                name='tblDictCountryId'
                rules={{required: true}}
                defaultValue=''
                label='гражданство'
                required
                renderItem={renderCountry}
                error={!!errors.tblDictCountryId}
                helperText={errors?.tblDictCountryId?.message}
                fullWidth
            />

        </FormWrapField>
    );
};

export default FaceCitizenshipsEdit;