import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    subject: '',
}

const DictSubjectEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictSubject} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictSubject}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="subject"
                label="предмет"
                required
                type='search'
                fullWidth
                name='subject'
                autoFocus

            />
        </FormFields>
    );
};

export default DictSubjectEdit;