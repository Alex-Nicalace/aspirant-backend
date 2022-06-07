import React from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MenuPopupColumns = ({anchorEl, open, closePopupMenuColumn, openListColumns, hideColumn}) => {
    return (
        <Menu
            id='menu-table-column'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={closePopupMenuColumn}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <MenuItem onClick={hideColumn}>скрыть</MenuItem>
            <MenuItem onClick={openListColumns}>скрыть столбцы</MenuItem>
        </Menu>
    );
};

export default MenuPopupColumns;