import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceScientificPublEdit from "../face-scientific-publ-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'date', disablePadding: false, label: 'дата', dataType: 'date'},
    {id: 'info', disablePadding: false, label: 'публикация', },
];

const FaceScientificPubl = ({faceId}) => {
    const {
        faceScientificPubl: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext()

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
            FormEdit={FaceScientificPublEdit}
            initialOrderBy='date'
        />
    );
};

export default FaceScientificPubl;