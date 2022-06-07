import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormWrapField from "../form-wrap-field";
import ChoiseFaceFromTable from "../controls/react-hook-form/choise-face-from-table";

const schema = yup.object().shape({
    tblFaceId: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .nullable()
        .required("лицо обязательное поле"),
});

const FaceAcademicAdvisorEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        //defaultValues: {tblFaceId: null},
        resolver: yupResolver(schema),
    });
    const {
        facesAcademicAdvisor: {
            insertRec,
            updateRec,
            datasetModify,
        }
    } = useAspirantApiContext();

    return (
        <FormWrapField
            dataset={datasetModify}
            closeEdit={closeEdit}
            currentRec={currentRec}
            handleSubmit={handleSubmit}
            insertRec={insertRec}
            modeEdit={modeEdit}
            setValue={setValue}
            updateRec={updateRec}
            //valuesToState={valuesToState}
        >
            <ChoiseFaceFromTable
                control={control}
                name='tblFaceId'
                label='выберите лицо'
                defaultValue=''
                error={!!errors.tblFaceId}
                helperText={errors?.tblFaceId?.message}
            />
        </FormWrapField>
    );
};

export default FaceAcademicAdvisorEdit;