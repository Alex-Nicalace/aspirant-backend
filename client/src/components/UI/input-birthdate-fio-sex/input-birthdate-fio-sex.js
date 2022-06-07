import React from 'react';
import Grid from "@material-ui/core/Grid";
import InputParsedDate from "../input-parsed-date";
import {DropdownList, Input} from "../../controls/react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";

const renderSex = [
    <MenuItem key={1} value=''><em>пусто</em></MenuItem>,
    <MenuItem key={2} value={true}>мужской</MenuItem>,
    <MenuItem key={3} value={false}>женский</MenuItem>
]

const InputBirthdateFioSex = ({control, errors, dd, mm, yyyy, lastname, firstname, middleName, sex}) => {
    return (
        <Grid
            container
            spacing={2}
            //alignItems='flex-end'
        >
            <Grid item>
                <InputParsedDate
                    control={control}
                    dd={dd}
                    mm={mm}
                    yyyy={yyyy}
                    errors={errors}
                    label='дата рождения:'
                />
            </Grid>
            <Grid item>
                <Input
                    control={control}
                    name={lastname}
                    //rules={{required: true}}
                    defaultValue=''
                    label="фамилия"
                    //required
                    type='search'
                    error={!!errors[lastname]}
                    helperText={errors?.[lastname]?.message}
                    autoFocus
                    //fullWidth
                />
                <Input
                    control={control}
                    name={firstname}
                    //rules={{required: true}}
                    defaultValue=''
                    label="имя"
                    //required
                    type='search'
                    error={!!errors[firstname]}
                    helperText={errors?.[firstname]?.message}
                    //fullWidth
                />
                <Input
                    control={control}
                    name={middleName}
                    //rules={{required: true}}
                    defaultValue=''
                    label="отчество"
                    //required
                    type='search'
                    error={!!errors[middleName]}
                    helperText={errors?.[middleName]?.message}
                    //fullWidth
                />
            </Grid>
            <Grid item>
                <DropdownList
                    style={{minWidth: "200px"}}
                    control={control}
                    name={sex}
                    //rules={{required: true}}
                    defaultValue=''
                    label='пол'
                    //required
                    renderItem={renderSex}
                    error={!!errors[sex]}
                    helperText={errors?.[sex]?.message}
                    //fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default InputBirthdateFioSex;