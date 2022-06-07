import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceContactsEdit from "../face-contacts-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'contactType', disablePadding: false, label: 'тип контакта',},
    {id: 'contact', disablePadding: false, label: 'контакт'},
];

const FaceContacts = ({faceId}) => {
    const {
        faceContacts: {
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
            FormEdit={FaceContactsEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceContacts;