import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import {Backdrop, useTheme} from "@material-ui/core";
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {NavLink} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './table-enhanced.scss';
import IndicatorNoData from "../UI/indicator-no-data";
import ListVisibleColumns from "./list-visible-columns";
import DotsVertIcon from '@material-ui/icons/MoreVert'
import Grid from "@material-ui/core/Grid";
import MenuPopupColumns from "./menu-popup-columns";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: ({maxHeight}) => maxHeight,
        // minHeight: '300px'
        position: 'relative'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 500,
        '& th': {
            fontWeight: 'bold',
        }

    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    dotIcon: {
        // //visibility: 'hidden',
        // opacity: 0,
        // '&:hover': {
        //     //visibility: 'visible',
        //     opacity: 1,
        // }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        position: 'absolute'
    },

    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function TablePaginationActions({count, page, rowsPerPage, onPageChange}) {
    const classes = useStyles();
    const theme = useTheme();

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.pagination}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

function EnhancedTableHead({classes, order, orderBy, onRequestSort, headCells, showPopup}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.filter(headCell => headCell.label).map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.padding}
                        //sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <Grid container wrap='nowrap' alignItems='baseline'>
                            <Grid item>
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </Grid>
                            <Grid item className={classes.dotIcon}>
                                <IconButton size='small' onClick={(e) => showPopup(e, headCell.id)} className='test'>
                                    <DotsVertIcon fontSize='small'/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function formatingOnType(value, dataType) {
    if ((typeof value === 'boolean') && !dataType)
        dataType = 'boolean';
    switch (dataType) {
        case 'date':
            return value && new Date(value).toLocaleDateString();
        case 'time':
            return value && new Date(value).toLocaleTimeString()
        case 'datetime':
            return value && new Date(value).toLocaleString()
        case 'boolean':
            return <Checkbox size='small' color='default' checked={value}/> //value && 'да'
        case 'image':
            return value && <img src={value} alt="фото" style={{width: '100px'}}/>
        default:
            return value;
    }

}

function formatingCell(row, column) {
    if (column.Component) {
        const params = {};
        column.componentParams.forEach(({nameParam}) => params[nameParam] = row[nameParam]);
        return column.Component(params)
    }

    const value = formatingOnType(row[column.id], column.dataType);

    function joinLink() {
        /*    linkDivided: [
                {value: 'tabs', isField: false},
                {value: 'ObjectName', isField: true},
                {value: 'AddrTreeID', isField: true},
            ]*/

        return column.linkDivided.reduce((prevValue, item) => {
            return `${prevValue}${item.isField ? row[item.value] : item.value}`
        }, '');

    }

    if (column.link)
        return (
            <Link component={NavLink} to={`${column.link}${row[column.linkArgument]}`}> {value} </Link>
        )

    if (column.linkDivided)
        return (
            <Link component={NavLink} to={joinLink()}> {value} </Link>
        )

    return value

}

export default function TableEnhanced({
                                          dataset,
                                          isLoading,
                                          headCells,
                                          maxHeight = null,
                                          initialOrderBy,
                                          onGetKeyValue = () => {
                                          },
                                          selectedKey,
                                          masterFieldName,
                                          tableName
                                      }) {
    const classes = useStyles({maxHeight});
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(initialOrderBy);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const keyField = headCells.find(item => item.key).id;
    const [anchorEl, setAnchorEl] = useState(null);
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [openListVisibleColumns, setOpenListVisibleColumns] = useState(false);
    const [openPopupMenuColumn, setOpenPopupMenuColumn] = useState(false);
    const elTable = useRef(null);
    const [pressedColumn, setPressedColumn] = useState(null);

    const columns = headCells.filter(({label}) => label);
    const visibleColumns = columns.filter(({id}) => !hiddenColumns.includes(id));

    useEffect(() => {
        if (tableName) {
            const arr = JSON.parse(localStorage.getItem(tableName))
            if (arr) {
                setHiddenColumns([...arr]);
            }
        }
    }, [])

    useEffect(() => {
        if (tableName) {
            const serialObj = JSON.stringify(hiddenColumns);
            localStorage.setItem(tableName, serialObj);
        }
    }, [hiddenColumns])

    //const open = Boolean(anchorEl);
    //const id = open ? 'popover-list-columns' : undefined;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const closeListColumnsHandle = () => {
        // закрыть окно редактирвания
        setAnchorEl(null);
        setOpenListVisibleColumns(false);
    }

    const openListColumnsHandle = () => {
        //setAnchorEl(e.currentTarget);
        setOpenPopupMenuColumn(false);
        setOpenListVisibleColumns(true);
    }

    const toggleHideColumnHandle = (id) => {
        setHiddenColumns(prev => {
            const colExists = prev.indexOf(id);
            if (colExists > -1) {
                return [...prev.filter(value => value !== id)]
            } else {
                return [...prev, id]
            }
        })
    }

    const clearListHiddenColumnHandle = () => {
        setHiddenColumns([]);
    }

    const hideAllColumnsHandle = () => {
        setHiddenColumns([...columns.map(({id}) => id)]);
    }

    const openPopupMenuColumnHandle = (e, id) => {
        setAnchorEl(e.currentTarget);
        setOpenPopupMenuColumn(true);
        setPressedColumn(id);
    }

    const closePopupMenuColumnHandle = () => {
        setOpenPopupMenuColumn(false);
    }

    const hideColumnHandle = () => {
        setHiddenColumns([...hiddenColumns, pressedColumn]);
        setAnchorEl(null);
    }

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataset.length - page * rowsPerPage);

    masterFieldName = masterFieldName || keyField;

    if (!isLoading && !dataset.length)
        return (
            <IndicatorNoData/>
        )

    return (
        // <div className={classes.root}>
        <Paper className={classes.root}>
            <TableContainer
                className={classes.container}
                aria-describedby={`tbl-progress-${tableName}`}
                aria-busy={isLoading}
            >
                <Backdrop
                    className={classes.backdrop}
                    open={isLoading}
                >
                    <CircularProgress
                        id={`tbl-progress-${tableName}`}
                        color="inherit" />
                </Backdrop>
                <Table
                    stickyHeader
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='small'
                    aria-label="enhanced table"
                    //padding='none'
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={null}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={() => {
                        }}
                        onRequestSort={handleRequestSort}
                        rowCount={dataset.length}
                        headCells={visibleColumns}
                        showPopup={openPopupMenuColumnHandle}
                    />
                    <div ref={elTable} />
                    {/*<TableBody>*/}
                    <TransitionGroup component='tbody'>
                        {stableSort(dataset, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <CSSTransition
                                        key={row[keyField]}
                                        timeout={500}
                                        classNames="row-table"

                                    >

                                        <TableRow component='tr'
                                                  hover
                                                  tabIndex={-1}
                                            //key={row[keyField]}
                                                  onClick={() => onGetKeyValue(row[masterFieldName])}
                                                  selected={selectedKey && row[masterFieldName] === selectedKey}
                                                  style={{cursor: "pointer"}}
                                        >
                                            {visibleColumns.map((item) =>
                                                <TableCell component='td'
                                                           key={item.id}
                                                           onClick={item?.onClick}
                                                           padding={item?.padding}
                                                           style={item?.style}
                                                >
                                                    <div>{formatingCell(row, item)}</div>
                                                </TableCell>)}
                                        </TableRow>
                                    </CSSTransition>
                                );
                            })}
                    </TransitionGroup>
                    {/*{emptyRows > 0 && (*/}
                    {/*    <TableRow style={{height: 33 * emptyRows}}>*/}
                    {/*        <TableCell colSpan={5}/>*/}
                    {/*    </TableRow>*/}
                    {/*)}*/}
                    {/*</TableBody>*/}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 30, 60, {label: 'Всё', value: -1}]}
                colSpan={3}
                component="div"
                count={dataset.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                SelectProps={{
                    inputProps: {'aria-label': 'rows per page'},
                    native: true,
                }}
            />

            <MenuPopupColumns
                anchorEl={anchorEl}
                open={openPopupMenuColumn && anchorEl}
                closePopupMenuColumn={closePopupMenuColumnHandle}
                openListColumns={openListColumnsHandle}
                hideColumn={hideColumnHandle}
            />

            <ListVisibleColumns
                id={'list-visible-pressedColumn'}
                open={openListVisibleColumns && anchorEl}
                anchorEl={elTable.current}
                close={closeListColumnsHandle}
                columns={columns}
                hiddenColumns={hiddenColumns}
                toggleHideColumn={toggleHideColumnHandle}
                clearListHiddenColumn={clearListHiddenColumnHandle}
                hideAllColumns={hideAllColumnsHandle}
            />

        </Paper>
    );
}

