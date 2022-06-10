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
        id: 'orderFile', disablePadding: false, label: 'файл', componentParams: [{nameParam:"orderFile"}, {nameParam: "typeFile"}],
        Component: (params) => {
            const {orderFile, typeFile} = params
            const base64 = orderFile
                ? URL.createObjectURL(new Blob([new Uint8Array(orderFile.data)], {type: typeFile}))
                : null;
            return orderFile && <button onClick={ () => {
                window.open(base64);
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