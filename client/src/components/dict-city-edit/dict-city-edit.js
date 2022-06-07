import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    city: ''
}

const DictCityEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictCity} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictCity}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="city"
                label="город"
                required
                type='search'
                fullWidth
                name='city'
                autoFocus
            />
        </FormFields>
    );
};

export default DictCityEdit;