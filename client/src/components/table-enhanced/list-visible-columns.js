import React from 'react';
import Popover from "@material-ui/core/Popover";
import {FormGroup, TextField} from "@material-ui/core";
import SwitchWithLabel from "../controls/switch-with-label";
import {useStylesPopupContent} from "../../hooks/use-styles-popup-content";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useInput from "../../hooks/use-input";

const ListVisibleColumns = ({
                                id,
                                open,
                                anchorEl,
                                close,
                                columns,
                                hiddenColumns,
                                toggleHideColumn,
                                clearListHiddenColumn,
                                hideAllColumns,
                            }) => {
    const classesPopupContent = useStylesPopupContent();
    const columnSearch = useInput('');

    function searchColumns (term, arr) {
        if (term.length === 0) {
            return arr;
        }
        return arr.filter(({label}) => {
            return label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    const columnsFound = searchColumns(columnSearch.value, columns)

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div className={classesPopupContent.popupContent}>
                <TextField
                    placeholder='найти колонку'
                    fullWidth
                    type='search'
                    {...columnSearch}
                />
                <FormGroup>
                    {columnsFound.map(({id, label}) => <SwitchWithLabel
                        key={id} label={label}
                        size='small'
                        disabled={!hiddenColumns.includes(id) && (columns.length - hiddenColumns.length) === 1}
                        checked={!hiddenColumns.includes(id)}
                        onChange={() => toggleHideColumn(id)}
                    />)
                    }
                </FormGroup>
                <Grid container justifyContent='space-between'>
                    <Grid item>
                        <Button onClick={hideAllColumns} size='medium' color='primary'>
                            спрятать все
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={clearListHiddenColumn} size='medium' color='primary'>
                            показать все
                        </Button>
                    </Grid>
                </Grid>

            </div>

        </Popover>
    );
};

export default ListVisibleColumns;