import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import FaceCitizenshipsEdit from "../face-citizenships-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'citizenship', disablePadding: false, label: 'гражданство'},
];

const FaceCitizenships = ({faceId}) => {
    const {
        faceCitizenships: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useContext(AspirantApiContext);

    const fetchForCurrentId = () => {
        fetch(faceId);
    }

    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={dataset}
            error={error}
            deleteRec={deleteRec}
            fetch={fetchForCurrentId}
            FormEdit={FaceCitizenshipsEdit}
            initialOrderBy='citizenship'
        />
    );
};

export default FaceCitizenships;