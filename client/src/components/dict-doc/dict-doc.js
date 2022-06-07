import React, {useContext} from "react";
import {AspirantApiContext} from "../context/aspirant-api-context";
import DictDocEdit from "../dict-doc-edit";
import TableEdit from "../table-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'document', disablePadding: false, label: 'документ'},
];

const DictDoc = () => {
    const {
        dictDoc: {
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
            FormEdit={DictDocEdit}
            initialOrderBy='document'
        />
    );
}

export default DictDoc;