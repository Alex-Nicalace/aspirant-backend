import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    street: ''
}

const DictStreetEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictStreet} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictStreet}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="street-id"
                label="улица"
                required
                type='search'
                fullWidth
                name='street'
                autoFocus
            />
        </FormFields>
    );
};

export default DictStreetEdit;