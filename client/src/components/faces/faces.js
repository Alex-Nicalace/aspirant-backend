import React, {useContext, useEffect, useState} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import FacesEdit from "../faces-edit";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {Container} from "@material-ui/core";
import FaceAllData from "../face-all-data";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'lastname', disablePadding: false, label: 'фамилия'},
    {id: 'firstname', disablePadding: false, label: 'имя'},
    {id: 'middleName', disablePadding: false, label: 'отчество'},
    {id: 'birthdate', disablePadding: false, label: 'дата рождения', dataType: 'date'},
];

const Faces = () => {
    const {
        faces: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useContext(AspirantApiContext);
    const [faceId, setFaceId] = useState(null);
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const idPopover = isOpenPopover ? 'simple-popover' : undefined;

    const changeFaceIdHandle = (id) => {
        setFaceId(id);
    }

    const openPopoverHandler = () => {
        setIsOpenPopover(true);
    }

    const closePopoverHandler = () => {
        setIsOpenPopover(false);
    }

    return (
        <>
            <TableEdit
                headCells={headCells}
                isLoading={isLoading}
                dataset={dataset}
                error={error}
                deleteRec={deleteRec}
                fetch={fetch}
                FormEdit={FacesEdit}
                initialOrderBy='lastname'
                onGetKeyValue={changeFaceIdHandle}
                tableName='faces'
            />
            <Button onClick={openPopoverHandler}>редактировать</Button>

            <Popover
                id={idPopover}
                open={isOpenPopover}
                //anchorEl={anchorEl}
                onClose={closePopoverHandler}
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
                    <FaceAllData faceId={faceId} />
                </Container>
            </Popover>
        </>

    );
};

export default Faces;