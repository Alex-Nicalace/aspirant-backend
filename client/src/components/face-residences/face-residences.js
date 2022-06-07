import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceResidencesEdit from "../face-residences-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'country', disablePadding: false, label: 'страна', },
    {id: 'city', disablePadding: false, label: 'город'},
    {id: 'street', disablePadding: false, label: 'улица'},
    {id: 'house', disablePadding: false, label: 'дом'},
    {id: 'apartment', disablePadding: false, label: 'квартира'},
    {id: 'dateOn', disablePadding: false, label: 'актуально на', dataType: 'date'},
];

const FaceResidences = ({faceId}) => {
    const {
        faceResidences: {
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
            FormEdit={FaceResidencesEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceResidences;