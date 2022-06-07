import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceAspirantOrdersEdit from "../face-aspirant-orders-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'numOrder', disablePadding: false, label: 'номер приказа'},
    {id: 'dateOrder', disablePadding: false, label: 'дата приказа', dataType: 'date'},
    {id: 'typeRel', disablePadding: false, label: 'отношение'},
    {id: 'note', disablePadding: false, label: 'примечание'},
];

const FaceAspirantOrders = ({faceAspirantId}) => {
    const {
        faceAspirantOrders: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

    const fetchForCurrentId = () => {
        fetch(faceAspirantId);
    }

    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={dataset}
            error={error}
            deleteRec={deleteRec}
            fetch={fetchForCurrentId}
            FormEdit={FaceAspirantOrdersEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceAspirantOrders;