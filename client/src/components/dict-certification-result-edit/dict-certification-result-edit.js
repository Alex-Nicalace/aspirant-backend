import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";

const recInit = {
    result: ''
}

const DictCertificationResultEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {dictCertificationResult} = useContext(AspirantApiContext);
    return (
        <FormFields
            data={dictCertificationResult}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="dict-certification-result"
                label="результат аттестации"
                required
                type='search'
                fullWidth
                name='result'
                autoFocus
            />
        </FormFields>
    );
};

export default DictCertificationResultEdit;