import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";
import ChoiseOrderFromTable from "../controls/react-hook-form/choise-order-from-table";

const typeRel = [
    {id: 'in', label: 'зачислен', kod: 0},
    {id: 'out', label: 'отчислен', kod: 1},
    {id: 'reIn', label: 'переведен', kod: 1},
    {id: 'academ-on', label: 'убыл в академ.', kod: 2},
    {id: 'academ-off', label: 'прибыл из академ.', kod: 3}
]

const schema = yup.object().shape({
    tblFaceAspirantId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    tblFaceAspirantAcademId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable(),
    tblOrderId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("приказ обязательное поле"),
    note: yup
        .string()
        .nullable(),
    typeRel: yup
        .string()
        .required("приказ обязательное поле"),
});

const FaceAspirantOrdersEdit = ({closeEdit, modeEdit, currentRec, valuesToState,
                                insertRecProp, whatRel}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        defaultValues: {tblOrderId: null, note: ''},
        resolver: yupResolver(schema),
    });
    const {
        faceAspirantOrders: {
            insertRec,
            updateRec,
            dataset,
            faceAspirantId
        }
    } = useAspirantApiContext();

    setValue('tblFaceAspirantId', valuesToState?.tblFaceAspirantId ?? faceAspirantId);
    setValue('tblFaceAspirantAcademId', valuesToState?.tblFaceAspirantAcademId);

    const itemsTypeRel = typeRel.filter(({kod}) => kod === whatRel)

    return (
        <FormWrapField
            dataset={dataset}
            closeEdit={closeEdit}
            currentRec={currentRec}
            handleSubmit={handleSubmit}
            insertRec={insertRecProp || insertRec}
            modeEdit={modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            //valuesToState={valuesToState}
        >
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='typeRel'
                rules={{required: true}}
                defaultValue={itemsTypeRel.length === 1 ? itemsTypeRel[0].id : ''}
                label='о чем приказ'
                required
                //renderItem={typeRel}
                error={!!errors.typeRel}
                helperText={errors?.typeRel?.message}
                fullWidth
                items={itemsTypeRel}
                itemKey={'id'}
                itemVisibleName={'label'}
            />
            <ChoiseOrderFromTable
                control={control}
                name='tblOrderId'
                label='выберите приказ'
                defaultValue=''
                error={!!errors.tblOrderId}
                helperText={errors?.tblOrderId?.message}
            />

            <Input
                control={control}
                name='note'
                //rules={{required: true}}
                defaultValue=''
                label="примечание"
                //required
                type='search'
                error={!!errors.note}
                helperText={errors?.note?.message}
                fullWidth
            />

        </FormWrapField>
    );
};

export default FaceAspirantOrdersEdit;