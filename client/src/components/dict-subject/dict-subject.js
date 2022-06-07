import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictSubjectEdit from "../dict-subject-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'subject', disablePadding: false, label: 'предмет'},
];

const DictSubject = () => {
    const {
        dictSubject: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useContext(AspirantApiContext);
    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={dataset}
            error={error}
            deleteRec={deleteRec}
            fetch={fetch}
            FormEdit={DictSubjectEdit}
            initialOrderBy='subject'
        />
    );
};

export default DictSubject;
