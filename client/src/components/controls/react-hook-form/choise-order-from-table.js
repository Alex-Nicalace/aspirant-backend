import React from 'react';
import ChoiseObjectFromTable from "./choise-object-from-table";
import OrdersList from "../../orders-list";

const ChoiseOrderFromTable = (props) => {
    return (
        <ChoiseObjectFromTable
            {...props}
            ComponentX={OrdersList}
        />
    );
};

export default ChoiseOrderFromTable;