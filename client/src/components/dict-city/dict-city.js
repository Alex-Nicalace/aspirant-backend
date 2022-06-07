import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictCityEdit from "../dict-city-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'city', disablePadding: false, label: 'город'},
];

const DictCity = () => {
    const {
        dictCity: {
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
            FormEdit={DictCityEdit}
            initialOrderBy='city'
        />
    );
};

export default DictCity;