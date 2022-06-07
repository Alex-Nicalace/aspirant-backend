import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import {Input} from "../controls/react-hook-form";
import ChoiseOrderFromTable from "../controls/react-hook-form/choise-order-from-table";

const schema = yup.object().shape({
    tblOrderId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("приказ обязательное поле"),
    note: yup
        .string()
});

const FaceOrdersEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        defaultValues: {tblOrderId: null, note: ''},
        resolver: yupResolver(schema),
    });
    const {
        faceOrders: {
            insertRec,
            updateRec,
            dataset,
            faceId
        }
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
                error={!!errors.firstname}
                helperText={errors?.firstname?.message}
                fullWidth
            />

        </FormWrapField>
    );
};

export default FaceOrdersEdit;