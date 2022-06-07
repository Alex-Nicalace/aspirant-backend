import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictStreetEdit from "../dict-street-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'street', disablePadding: false, label: 'улица'},
];

const DictStreet = () => {
    const {
        dictStreet: {
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
            FormEdit={DictStreetEdit}
            initialOrderBy='street'
        />
    );
};

export default DictStreet;