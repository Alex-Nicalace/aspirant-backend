import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictCountryEdit from "../dict-country-edit/dict-country-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'country', disablePadding: false, label: 'страна'},
];

const DictCountry = () => {
    const {
        dictCountry: {
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
            FormEdit={DictCountryEdit}
            initialOrderBy='country'
        />
    );
};

export default DictCountry;