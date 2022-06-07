import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormWrapField from "../form-wrap-field";
import {DropdownList, Input} from "../controls/react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("название обязательное поле"),
    whatIsIt: yup
        .string()
        .nullable()
        .required("'что это' обязательное поле"),
    note: yup
        .string()
        .nullable()
});

const renderWhatIsIt = [
    <MenuItem value='another'><em>другое</em></MenuItem>,
    <MenuItem value='faculty'>факультет</MenuItem>,
    <MenuItem value='department'>кафедра</MenuItem>,
]

const DictEnterpriseEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        dictEnterprise: {
            insertRec,
            updateRec,
            dataset,
        }
    } = useAspirantApiContext();

    if (modeEdit === 'insert')
        setValue('parentId', currentRec);

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
            //valuesToState={valuesToState}
        >
            <Input
                control={control}
                name='name'
                rules={{required: true}}
                defaultValue=''
                label="название"
                required
                type='search'
                error={!!errors.name}
                helperText={errors?.name?.message}
                fullWidth
                autoFocus
            />
            <DropdownList
                style={{minWidth: "200px"}}
                control={control}
                name='whatIsIt'
                rules={{required: true}}
                defaultValue='another'
                label='что это'
                required
                renderItem={renderWhatIsIt}
                error={!!errors.whatIsIt}
                helperText={errors?.whatIsIt?.message}
                fullWidth
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

export default DictEnterpriseEdit;