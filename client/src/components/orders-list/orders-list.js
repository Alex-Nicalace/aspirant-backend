import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import TableEdit from "../table-edit";
import OrdersEdit from "../orders-edit";
import OrderFindForm from "../UI/order-find-form";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'numOrder', disablePadding: false, label: '№'},
    {id: 'dateOrder', disablePadding: false, label: 'дата', dataType: 'date'},
    {id: 'text', disablePadding: false, label: 'содержание'},
    {
        id: 'pathFile', disablePadding: false, label: 'файл', componentParams: [{nameParam:"pathFile"}],
        Component: (params) => {
            const {pathFile} = params
            return pathFile && <button onClick={ () => {
                window.open(pathFile);
            } }>Открыть</button>
        }
    }
];

const OrdersList = ({
                        changeSelected = () => {
                        },
                        selected
                    }) => {
    const {
        orders: {
            dataset, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

    const changeOrderIdHandle = (id) => {
        changeSelected(id);
    }

    return (
        <>
            <OrderFindForm fetch={fetch}
            />
            <TableEdit
                headCells={headCells}
                isLoading={isLoading}
                dataset={dataset}
                error={error}
                deleteRec={deleteRec}
                fetch={fetch}
                FormEdit={OrdersEdit}
                initialOrderBy='dateOrder'
                onGetKeyValue={changeOrderIdHandle}
                currentRecInitial={selected}
                tableName='orders-list'
            />
        </>
    );
}

export default OrdersList;