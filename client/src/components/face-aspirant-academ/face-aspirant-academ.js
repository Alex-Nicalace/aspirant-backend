import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import TableEdit from "../table-edit";
import FaceAspirantAcademEdit from "../face-aspirant-academ-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'dateOn', disablePadding: false, label: 'с', dataType: 'date'},
    {id: 'dateOff', disablePadding: false, label: 'по', dataType: 'date'},
    {id: 'note', disablePadding: false, label: 'примечание'},
    {id: 'orderAcademOn', disablePadding: false, label: 'приказ об убытии'},
    {id: 'orderAcademOff', disablePadding: false, label: 'приказ о прибытии'},
];

const FaceAspirantAcadem = ({faceId}) => {
    const {
        faceAspirantAcadem: {
            datasetModify: dataset, isLoading, error,
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
            FormEdit={FaceAspirantAcademEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceAspirantAcadem;