import React from 'react';
import {Controller} from "react-hook-form";
import {KeyboardDatePicker} from "@material-ui/pickers";

const InputDate = ({control, name, defaultValue, rules, ...props}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{...rules}}
            render={({field}) => (
                <KeyboardDatePicker
                    variant='inline' // календарь где показывать
                    format='dd.MM.yyyy'
                    autoOk
                    KeyboardButtonProps={{
                        'arial-label': 'secondary checkbox',
                    }}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    {...props}
                />
            )}
        />
    );
}

export default InputDate;