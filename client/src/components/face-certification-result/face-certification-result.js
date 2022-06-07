import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceCertificationResultEdit from "../face-certification-result-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'year', disablePadding: false, label: 'год'},
    {id: 'certificationResult', disablePadding: false, label: 'результат аттестации',},
];

const FaceCertificationResult = ({faceId}) => {
    const {
        faceCertificationResult: {
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
            FormEdit={FaceCertificationResultEdit}
            initialOrderBy='semesterNum'
        />
    );
};

export default FaceCertificationResult;