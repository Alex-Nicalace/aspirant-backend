import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceOrdersEdit from "../face-orders-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'numOrder', disablePadding: false, label: 'номер'},
    {id: 'dateOrder', disablePadding: false, label: 'дата', dataType: 'date'},
    {id: 'text', disablePadding: false, label: 'содержание'},
    {id: 'action', disablePadding: false, label: 'суть'},
    {id: 'note', disablePadding: false, label: 'примечание'},
];

const FaceOrders = ({faceId}) => {
    const {
        faceOrders: {
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
            FormEdit={FaceOrdersEdit}
            initialOrderBy='dateOn'
        />
    );
};


export default FaceOrders;