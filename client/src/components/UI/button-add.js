import React from 'react';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const ButtonAdd = ({children = 'добавить', ...props}) => {
    return (
        <Button
            variant='outlined'
            //className={styles.btnUpd}
            color='primary'
            size='small'
            startIcon={<AddCircleOutlineIcon/>}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonAdd;