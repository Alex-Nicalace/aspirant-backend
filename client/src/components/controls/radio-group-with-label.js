import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import {FormLabel} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const RadioGroupWithLabel = ({label, value, onChange, options, ...props}) => {
    return (
        <FormControl component='fieldset' >
            <FormLabel component='legend' >
                {label}
                <RadioGroup
                    value={value}
                    name='modeView'
                    onChange={onChange}
                    {...props}
                >
                    {options.map(({label, value}) =>
                        <FormControlLabel
                            key={value}
                            control={<Radio/>}
                            label={label}
                            value={value}
                        />
                    )}
                </RadioGroup>
            </FormLabel>
        </FormControl>
    );
};

export default RadioGroupWithLabel;