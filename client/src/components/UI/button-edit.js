import React from 'react';
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

const ButtonEdit = ({children = 'редактировать', ...props}) => {
    return (
        <Button
            variant='outlined'
            size='small'
            startIcon={<EditIcon/>}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonEdit;