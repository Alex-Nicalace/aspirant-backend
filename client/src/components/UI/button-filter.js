import React from 'react';
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";

const ButtonFilter = ({children = 'добавить', ...props}) => {
    return (
        <Button
            variant='outlined'
            //className={styles.btnUpd}
            color='primary'
            size='small'
            startIcon={<FilterListIcon/>}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonFilter;