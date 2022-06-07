import React from 'react';
import {Controller} from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const Input = ({control, name, defaultValue, rules, ...props}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{...rules}}
            render={({field}) => (
                <TextField
                    {...props}
                    //{...field}
                    value={props?.type === 'file' ? undefined : field.value }
                    onChange={(e) => {
                        props.onChange && props.onChange(e);
                        // если тип file, то изменить onChange
                        field.onChange(props?.type === 'file' ? e.target.files[0] : e);
                    }}
                />
            )}
        />
    );
};

export default Input;