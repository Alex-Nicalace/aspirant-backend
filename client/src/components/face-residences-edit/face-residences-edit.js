import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input, InputDate} from "../controls/react-hook-form";

const schema = yup.object().shape({
    tblDictCountryId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("страна обязательное поле"),
    tblDictCityId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("населенный пункт обязательное поле"),
    tblDictStreetId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    dateOn: yup
        .date()
        .nullable()
        .default(null)
        .typeError('некорректная дата')
});

const FaceResidencesEdit = ({closeEdit, modeEdit, currentRec}) => {
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
        faceResidences: {
            insertRec,
            updateRec,
            dataset,
            faceId
        },
        dictCountry,
        dictCity,
        dictStreet,
    } = useAspirantApiContext();

    useEffect(() => {
        dictCountry.fetch();
        dictCity.fetch();
        dictStreet.fetch();
    }, [])

    const valuesToState = {tblFaceId: faceId};

    const renderCountry = dictCountry.dataset.map((i) => <MenuItem key={i.id} value={i.id}>{i.country} </MenuItem>);
    renderCountry.unshift(<MenuItem key='dictCountry-key' value=''> <em>не выбрано</em> </MenuItem>);

    const renderCity = dictCity.dataset.map((i) => <MenuItem key={i.id} value={i.id}>{i.city} </MenuItem>);
    renderCity.unshift(<MenuItem key='dictCity-key' value=''> <em>не выбрано</em> </MenuItem>);

    const renderStreet = dictStreet.dataset.map((i) => <MenuItem key={i.id} value={i.id}>{i.street} </MenuItem>);
    renderStreet.unshift(<MenuItem key='dictStreet-key' value=''> <em>не выбрано</em> </MenuItem>);

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
                label='страна'
                required
                renderItem={renderCountry}
                error={!!errors.tblDictCountryId}
                helperText={errors?.tblDictCountryId?.message}
                fullWidth
            />
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictCityId'
                rules={{required: true}}
                defaultValue=''
                label='населенный пункт'
                required
                renderItem={renderCity}
                error={!!errors.tblDictCityId}
                helperText={errors?.tblDictCityId?.message}
                fullWidth
            />
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='tblDictStreetId'
                //rules={{required: true}}
                defaultValue=''
                label='улица'
                //required
                renderItem={renderStreet}
                error={!!errors.tblDictStreetId}
                helperText={errors?.tblDictStreetId?.message}
                fullWidth
            />
            <Input
                control={control}
                name='house'
                //rules={{required: true}}
                defaultValue=''
                label="дом"
                //required
                type='search'
                error={!!errors.house}
                helperText={errors?.house?.message}
                fullWidth
            />
            <Input
                control={control}
                name='apartment'
                //rules={{required: true}}
                defaultValue=''
                label="квартира"
                //required
                type='search'
                error={!!errors.apartment}
                helperText={errors?.apartment?.message}
                fullWidth
            />
            <InputDate
                control={control}
                name='dateOn'
                rules={{required: true}}
                defaultValue={null}
                label='актуально на'
                required
                error={!!errors.dateOn}
                helperText={errors?.dateOn?.message}
            />
        </FormWrapField>
    );
}

export default FaceResidencesEdit;