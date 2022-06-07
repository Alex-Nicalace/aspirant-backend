import React, {useEffect, useState} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles" ;
import ButtonsPanel from "../buttons-panel";
import Popover from "@material-ui/core/Popover";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import DictEnterpriseEdit from "../dict-enterprise-edit";
import ErrorIndicator from "../error-indicator";
import DialogAlert from "../dialog-alert";
import Button from "@material-ui/core/Button";
import ShowMessage from "../show-message";
import Grid from "@material-ui/core/Grid";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import MovedIcon from '@material-ui/icons/SubdirectoryArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import MoveIcon from '@material-ui/icons/AccountTree';

const useStyles = makeStyles(theme => ({
    root: {
        //height: 216,
        flexGrow: 1,
        // maxWidth: 400,
    },
    buttonsMove: {
        '& button': {
            margin: theme.spacing(1),
            '&:last-child': {
                marginRight: 0,
            }
        },
    }
}));

const DictEnterpriseAsTree = ({
                                  changeSelected = () => {
                                  },
                                  selected
                              }) => {
    const {
        dictEnterprise: {
            datasetAsTree, isLoading, error, dataset,
            fetch,
            deleteRec,
            updateRec,
        },
    } = useAspirantApiContext();
    const classes = useStyles();
    const [expanded, setExpanded] = useState([2]); //контроль раскрытых веток
    const [selectedBranch, setSelectedBranch] = useState(2); // контроль выделенных веток
    const [modeEdit, setModeEdit] = useState(null); // вставка или обновление
    const [anchorEl, setAnchorEl] = useState(null);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [idForReParent, setIdForReParent] = useState(null);
    const [messageAboutReParent, setMessageAboutReParent] = useState(false);

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        // полсе удаления записи затереть значение ИД
        if (selectedBranch) {
            const result = dataset.find(i => +i.id === +selectedBranch);
            !result && setSelectedBranch(0);
        }

    }, [dataset])

    useEffect(() => {
        if (idForReParent) {
            setMessageAboutReParent(true);
            setExpanded(expanded => expanded.filter(i => i !== idForReParent))
        }
    }, [idForReParent]);

    const getExpandedBySelected = (id, array=[]) => {
        const record = dataset.find(i => +i.id === +id);
        if (!record?.parentId)
            return array;
        //const m = [];
        array.unshift(record.parentId);
        //m.push(...getParentsId(res.parentId))
        return getExpandedBySelected(record.parentId, array);
        //return getParentsId(res.parentId) + ',' + res.parentId??''

    }

    useEffect(() => {
        setSelectedBranch(selected);
        setExpanded(getExpandedBySelected(selected));
    }, [selected])

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleToggle = (event, nodeIds) => {
        //контроль раскрытых веток
        setExpanded(nodeIds.filter(i => i !== idForReParent));
    };

    const rememberIdForReParentHandler = () => {
        setIdForReParent(selectedBranch);
    }

    const reParentBranchHandler = () => {
        updateRec({id: idForReParent, parentId: selectedBranch});
        setIdForReParent(null);
    }

    const cancelReParentBranch = () => {
        setIdForReParent(null);
    }

    const handleSelect = (event, nodeIds) => {
        // контроль выделенных веток
        setSelectedBranch(nodeIds);
        changeSelected(nodeIds);
    };

    if (error)
        return <ErrorIndicator error={error}/>

    if (isLoading)
        return <CircularProgress/>

    const setModeEditHandle = (modeEdit, event) => { // вставка или обновление
        if (modeEdit === 'update' && !selectedBranch)
            return;
        setModeEdit(modeEdit);
        setAnchorEl(event.currentTarget);
    }

    const closeEditHandle = () => {
        // закрыть окно редактирвания
        setModeEdit(null);
        setAnchorEl(null);
    }

    const handleClickOpenDialog = () => {
        // открвть диалог удаления
        if (selectedBranch) {
            setIsShowDialog(true);
        }
    };

    const deleteRecHandle = async () => {
        // удалить запись
        if (selectedBranch) {
            await deleteRec(selectedBranch);
            setIsShowDialog(false);
        }
    }

    const handleCloseDialog = () => {
        setIsShowDialog(false);
    };

    const closeMessageAboutReParentHandle = () => {
        setMessageAboutReParent(false);
    }


    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}
                  style={nodes.id === idForReParent ? {fontStyle: 'italic', textDecoration: 'underline'} : null}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    const renderTreeMain = (dataset) => ( // отрисовка дерева
        <>
            {dataset.map(node => renderTree(node))}
        </>
    )
    return (
        <>
            <ButtonsPanel
                setModeEdit={setModeEditHandle}
                deleteRec={handleClickOpenDialog}
                currentRec={selectedBranch}

            />
            <Paper>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    expanded={expanded} //контролируемый компонент, раскрыты те ветки кот. в стейте
                    selected={selectedBranch} // выделенные записи
                    onNodeToggle={handleToggle} // контроль раскрытых веток
                    onNodeSelect={handleSelect} // контроль выделенных записей
                    // multiSelect
                >
                    {renderTreeMain(datasetAsTree)}
                </TreeView>
                {/*кнопки перемещения*/}
                <Grid className={classes.buttonsMove} container justifyContent='flex-end'>
                    <div hidden={!idForReParent}>
                        <Grid item>
                            <Button variant='outlined' size='small' onClick={reParentBranchHandler}
                                    disabled={!idForReParent}

                                    startIcon={<MovedIcon/>}
                                    color='primary'
                            >вставить
                            </Button>

                        </Grid>
                    </div>
                    <div hidden={!idForReParent}>
                        <Grid item>
                            <Button variant='outlined' size='small' onClick={cancelReParentBranch}
                                    disabled={!idForReParent}
                                    startIcon={<CancelIcon/>}
                                    color='secondary'
                            >отмена
                            </Button>
                        </Grid>
                    </div>
                    <Grid item>
                        <Button variant='outlined' size='small'
                                onClick={rememberIdForReParentHandler}
                                startIcon={<MoveIcon/>}
                                disabled={!!!selectedBranch}
                        >переместить
                        </Button>
                    </Grid>
                </Grid>
            </Paper>


            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                //onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Container>
                    <DictEnterpriseEdit
                        closeEdit={closeEditHandle}
                        modeEdit={modeEdit}
                        currentRec={selectedBranch}
                    />
                </Container>
            </Popover>

            <DialogAlert
                message='Вы действительно хотите удалить запись?'
                title='УДАЛЕНИЕ'
                isShowDialog={isShowDialog}
                handleClose={handleCloseDialog}
                handleYes={deleteRecHandle}
            />

            <ShowMessage
                message='Выберите новую ветку в качестве родительской и нажмите кнопку "ВСТАВИТЬ" или "ОТМЕНА", если передумали.'
                title='ИЗМЕНЕНИЕ ИЕРАРХИИ'
                handleClose={closeMessageAboutReParentHandle}
                open={messageAboutReParent}
                buttons={[{label: 'Ok', onClick: closeMessageAboutReParentHandle, color: 'primary'}]}
            />
        </>

    );
};

export default DictEnterpriseAsTree;