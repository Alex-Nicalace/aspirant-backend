import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import FaceDocumentsEdit from "../face-documents-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'document', disablePadding: false, label: 'документ'},
    {id: 'country', disablePadding: false, label: 'страна'},
    {id: 'numDocument', disablePadding: false, label: 'номер документа'},
    {id: 'dateOn', disablePadding: false, label: 'выдан', dataType: 'date'},
    {id: 'dateOff', disablePadding: false, label: 'действителен до', dataType: 'date'},
];

const FaceDocuments = ({faceId}) => {
    const {
        faceDocuments: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useContext(AspirantApiContext);

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
            FormEdit={FaceDocumentsEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceDocuments;