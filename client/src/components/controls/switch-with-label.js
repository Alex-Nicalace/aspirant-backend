import React from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";

const SwitchWithLabel = ({label, checked, onChange, name, ...props}) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={onChange}
                    name={name}
                    {...props}
                />
            }
            label={label}
        />
    );
}

export default SwitchWithLabel;