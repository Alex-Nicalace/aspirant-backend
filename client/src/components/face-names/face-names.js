import React from 'react';
import TableEdit from "../table-edit";
import FaceNamesEdit from "../face-names-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'dateOn', disablePadding: false, label: 'актуально с', dataType: 'date'},
    {id: 'lastname', disablePadding: false, label: 'фамилия'},
    {id: 'firstname', disablePadding: false, label: 'имя'},
    {id: 'middleName', disablePadding: false, label: 'отчество'},
];

const FaceNames = ({faceId}) => {
    const {
        faceNames: {
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
            FormEdit={FaceNamesEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceNames;