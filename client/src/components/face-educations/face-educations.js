import React from 'react';
import TableEdit from "../table-edit";
import FaceEducationsEdit from "../face-educations-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'dateFinished', disablePadding: false, label: 'дата окончания', dataType: 'date'},
    {id: 'specialty', disablePadding: false, label: 'специальность'},
    {id: 'isExcellent', disablePadding: false, label: 'отличник'},
    {id: 'quantitySatisfactory', disablePadding: false, label: 'кол. уд. оценок'},
    {id: 'educationLevel', disablePadding: false, label: 'ур. образования'},
];

const FaceEducations = ({faceId}) => {
    const {
        faceEducations: {
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
            FormEdit={FaceEducationsEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceEducations;