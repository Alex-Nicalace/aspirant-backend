import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceEntranceExaminEdit from "../face-entrance-examin-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'date', disablePadding: false, label: 'дата', dataType: 'date'},
    {id: 'estimate', disablePadding: false, label: 'оценка'},
    {id: 'subject', disablePadding: false, label: 'предмет'},
];

const FaceEntranceExamin = ({faceId, isCandidateMin}) => {
    const {
        faceEntranceExamin: {
            entranceExaminDataset, candidateMinDataset, isLoading, error,
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
            dataset={isCandidateMin ? candidateMinDataset : entranceExaminDataset}
            error={error}
            deleteRec={deleteRec}
            fetch={fetchForCurrentId}
            FormEdit={FaceEntranceExaminEdit}
            initialOrderBy='dateOn'
            valuesToState={{isCandidateMin}}
        />
    );
};

export default FaceEntranceExamin;