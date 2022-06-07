import React from 'react';
import {Checkbox, FormControlLabel} from "@material-ui/core";

const CheckboxWithLabel = ({label, checked, onChange, name, ...props}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    name={name}
                    {...props}
                />
            }
            label={label}
        />
    );
};

export default CheckboxWithLabel;