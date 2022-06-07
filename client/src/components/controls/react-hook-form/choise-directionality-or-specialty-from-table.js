import React from 'react';
import ChoiseObjectFromTable from "./choise-object-from-table";
import DictDirectionalityAndSpecialty from "../../dict-directionality-and-specialty";

const ChoiseDirectionalityOrSpecialtyFromTableWithSwitch = ({
                  selected,
                  changeSelected = () => {}
              }) => {
    return (
        <DictDirectionalityAndSpecialty
            selected={selected}
            changeSelected={changeSelected}
            showDictDirectionInit={false}
            showSwitchDictDirection={true}
        />
    )
}

const ChoiseDirectionalityOrSpecialtyFromTable = (props) => {
    return (
        <ChoiseObjectFromTable
            {...props}
            ComponentX={ChoiseDirectionalityOrSpecialtyFromTableWithSwitch}
        />
    );
}

export default ChoiseDirectionalityOrSpecialtyFromTable;