import React from 'react';
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const ButtonDel = ({children = 'удалить', ...props}) => {
    return (
        <Button
            variant='outlined'
            //classes={styles.btnDel}
            size='small'
            color='secondary'
            startIcon={<DeleteOutlineIcon/>}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonDel;