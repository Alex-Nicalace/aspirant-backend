import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    educationForm: '',
}

const DictEducationFormEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictEducationForm} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictEducationForm}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="educationForm"
                label="форма обучения"
                required
                type='search'
                fullWidth
                name='educationForm'
                autoFocus
            />
        </FormFields>
    );
};

export default DictEducationFormEdit;
