import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    contactType: ''
}

const DictContactTypeEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictContactType} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictContactType}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="dict-contact-type"
                label="тип контакта"
                required
                type='search'
                fullWidth
                name='contactType'
                autoFocus
            />
        </FormFields>
    );
};

export default DictContactTypeEdit;