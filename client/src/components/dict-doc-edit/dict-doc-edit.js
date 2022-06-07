import React from 'react';
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const recInit = {
    document: ''
}

const DictDocEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictDoc} = useAspirantApiContext();
    return (
        <FormFields
            data={dictDoc}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="kind-document"
                label="тип документа"
                required
                type='search'
                fullWidth
                name='document'
                autoFocus
            />
        </FormFields>
    )
};

export default DictDocEdit;