import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictContactTypeEdit from "../dict-contact-type-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'contactType', disablePadding: false, label: 'тип контакта'},
];

const DictContactType = () => {
    const {
        dictContactType: {
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
            FormEdit={DictContactTypeEdit}
            initialOrderBy='contactType'
        />
    );
};

export default DictContactType;