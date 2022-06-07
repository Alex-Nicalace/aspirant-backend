import React from 'react';
import ChoiseObjectFromTable from "./choise-object-from-table";
import DictEnterpriseAsTree from "../../dict-enterprise-as-tree";

const ChoiseDivision = (props) => {
    return (
        <ChoiseObjectFromTable
            {...props}
            ComponentX={DictEnterpriseAsTree}
        />
    );
};

export default ChoiseDivision;