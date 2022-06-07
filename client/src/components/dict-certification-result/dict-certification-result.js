import React, {useContext} from 'react';
import {AspirantApiContext} from "../context/aspirant-api-context";
import TableEdit from "../table-edit";
import DictCertificationResultEdit from "../dict-certification-result-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'result', disablePadding: false, label: 'результат аттестации'},
];

const DictCertificationResult = () => {
    const {
        dictCertificationResult: {
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
            FormEdit={DictCertificationResultEdit}
            initialOrderBy='result'
        />
    );
};

export default DictCertificationResult;
