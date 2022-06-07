import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    country: ''
}

const DictCountryEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictCountry} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictCountry}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="country"
                label="страна"
                required
                type='search'
                fullWidth
                name='country'
                autoFocus
            />
        </FormFields>
    );
};

export default DictCountryEdit;