import React from 'react';
import {Controller} from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";

const DropdownList = ({control, name, defaultValue, rules, renderItem, label, helperText, items, itemKey, itemValue, itemVisibleName, ...props}) => {
    //const [isShrink, setIsShrink] = useState(false);
    let renderItems;
    if (items) {
        renderItems = items.map(i =>
            <MenuItem key={i[itemKey]} value={i[itemValue] ?? i[itemKey]}>{i[itemVisibleName]} </MenuItem>);
        renderItems.unshift(
            <MenuItem key={`${itemVisibleName}-id`} value=''>
                <em>не выбрано</em>
            </MenuItem>);
    }

    return (
        <FormControl
            {...props}
        >
            <InputLabel
                //shrink={isShrink}
                id={`input-label-id-${name}`}
            >
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={{...rules}}
                render={({field}) => {
                    //setIsShrink(!!field.value)
                    return (
                        <Select
                            labelId={`input-label-id-${name}`}
                            id={`select-id-${name}`}
                            defaultValue={defaultValue}
                            {...field}
                        >
                            {renderItem || renderItems}
                        </Select>
                    )
                }}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default DropdownList;