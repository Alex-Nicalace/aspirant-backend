import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    educationLevel: '',
    weightEducationLevel: '',
}

const DictEducationLevelEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictEducationLevels} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictEducationLevels}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="educationLevel"
                label="уровень образования"
                required
                type='search'
                fullWidth
                name='educationLevel'
                autoFocus
            />
            <TextField
                id="weightEducationLevel"
                label="приоритет"
                required
                type='search'
                fullWidth
                name='weightEducationLevel'
            />
        </FormFields>
    );
};

export default DictEducationLevelEdit;