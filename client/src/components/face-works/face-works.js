import React from 'react';
import TableEdit from "../table-edit";
import FaceWorksEdit from "../face-works-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'dateOn', disablePadding: false, label: 'с', dataType: 'date'},
    {id: 'dateOff', disablePadding: false, label: 'по', dataType: 'date'},
    {id: 'enterprise', disablePadding: false, label: 'место работы'},
    {id: 'jobTitle', disablePadding: false, label: 'должность'},
    {id: 'lenOfService', disablePadding: false, label: 'период'},
];

const FaceWorks = ({faceId}) => {
    const {
        faceWorks: {
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
            FormEdit={FaceWorksEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceWorks;