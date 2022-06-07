import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceBusinessTripEdit from "../face-business-trip-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'dateOn', disablePadding: false, label: 'с', dataType: 'date'},
    {id: 'dateOff', disablePadding: false, label: 'по', dataType: 'date'},
    {id: 'info', disablePadding: false, label: 'инф. о командировке'},
];

const FaceBusinessTrip = ({faceId}) => {
    const {
        faceBusinessTrip: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

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
            FormEdit={FaceBusinessTripEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceBusinessTrip;