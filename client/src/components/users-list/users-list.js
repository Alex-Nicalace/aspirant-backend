import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import TableEdit from "../table-edit";
import FrameWithTitle from "../frame-with-title";
import UsersListEdit from "../users-list-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'login', disablePadding: false, label: 'логин'},
    {id: 'isAdmin', disablePadding: false, label: 'админ', padding: 'checkbox'},
    {id: 'canInsert', disablePadding: false, label: 'вставка', padding: 'checkbox'},
    {id: 'canUpdate', disablePadding: false, label: 'обновление', padding: 'checkbox'},
    {id: 'canDelete', disablePadding: false, label: 'удаление', padding: 'checkbox'},
];

const UsersList = () => {
    const {
        usersList: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
        user: {
            usersData
        }
    } = useAspirantApiContext();

    if (!usersData?.isAdmin) {
        return null
    }

    return (
        <FrameWithTitle head='Пользователи ПО "Аспирант"'>
            <TableEdit
                headCells={headCells}
                isLoading={isLoading}
                dataset={dataset}
                error={error}
                deleteRec={deleteRec}
                fetch={fetch}
                FormEdit={UsersListEdit}
                initialOrderBy='document'
            />
        </FrameWithTitle>
    );
}

export default UsersList;