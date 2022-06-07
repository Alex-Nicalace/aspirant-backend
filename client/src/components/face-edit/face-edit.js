import React from 'react';
import TextField from "@material-ui/core/TextField";
import FormFields from "../form-fields";
import {KeyboardDatePicker} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const recInit = {
    lastname: '',
    firstname: '',
    middleName: '',
    sex: '',
    birthdate: null,
}

const FaceEdit = ({closeEdit, modeEdit, currentRec}) => {
    const {faces} = useAspirantApiContext();
    return (
        <FormFields
            data={faces}
            currentRec={currentRec}
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            recInit={recInit}
        >
            <TextField
                id="lastname-id"
                label="фамилия"
                required
                type='search'
                fullWidth
                name='lastname'
                autoFocus
            />
            <TextField
                id="firstname-id"
                label="имя"
                required
                type='search'
                fullWidth
                name='firstname'
            />
            <TextField
                id="middleName-id"
                label="отчество"
                type='search'
                fullWidth
                name='middleName'
            />
            <KeyboardDatePicker
                id='birthdate-id'
                label='дата рождения'
                //disableToolbar
                variant='inline' // календарь где показывать
                format='dd.MM.yyyy'
                //margin='normal'
                //value='23.03.1983'
                //onChange={(date) => changeValueHandle(date, 'birthdate')}
                name='birthdate'
                autoOk
                isDataPicker={true}
                KeyboardButtonProps={{
                    'arial-label': 'secondary checkbox',
                }}
            />
            <FormControl fullWidth>
                <InputLabel id='sex-label-id'>пол</InputLabel>
                <Select
                    labelId='sex-label-id'
                    id='sex-select-id'
                    //value={sex}
                    name='sex'
                    //onChange={handleChangeState}
                >
                    <MenuItem value=''><em>пусто</em></MenuItem>
                    <MenuItem value={true}>мужской</MenuItem>
                    <MenuItem value={false}>женский</MenuItem>
                </Select>
            </FormControl>
        </FormFields>
    );
};

export default FaceEdit;