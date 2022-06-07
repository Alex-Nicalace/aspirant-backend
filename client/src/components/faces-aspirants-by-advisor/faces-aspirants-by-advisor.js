import React, {useEffect} from 'react';
import TableEdit from "../table-edit";
import {ASPIRANTS_LIST_ROUTE} from "../../utils/consts";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FacesAspirantsByAdvisorEdit from "../faces-aspirants-by-advisor-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'tblFaceId', disablePadding: false},
    {id: 'lastname', disablePadding: false, label: 'фамилия', link: `${ASPIRANTS_LIST_ROUTE}`, linkArgument: 'tblFaceId'},
    {id: 'firstname', disablePadding: false, label: 'имя'},
    {id: 'middleName', disablePadding: false, label: 'отчество'},
    {id: 'birthdate', disablePadding: false, label: 'дата рождения', dataType: 'date'},
    {id: 'sex', disablePadding: false, label: 'пол'},
    // {id: 'isRecommendation', disablePadding: false, label: 'реком. сов. фак.', padding:'checkbox'},
    // {id: 'isProtocol', disablePadding: false, label: 'выписка из протокола', padding:'checkbox'},
    // {id: 'isAgree', disablePadding: false, label: 'согласие на науч. рук.', padding:'checkbox'},
    // {id: 'isHeadDepartment', disablePadding: false, label: 'согласование зав. каф.', padding:'checkbox'},
    // {id: 'dateOn', disablePadding: false, label: 'зачислен', dataType: 'date'},
    // {id: 'dateOff', disablePadding: false, label: 'отчислен', dataType: 'date'},
    {id: 'dissertationTheme', disablePadding: false, label: 'тема диссертации'},
    // {id: 'educationForm', disablePadding: false, label: 'форма обучения'},
    {id: 'nameDirection', disablePadding: false, label: 'направление обучения'},
    //{id: 'subject', disablePadding: false, label: 'ин. яз'},
    {id: 'DirectionalityOrSpecialty', disablePadding: false, label: 'направленность/специальность'},
    {id: 'subDiv', disablePadding: false, label: 'кафедра'},
    // {id: 'academicAdvisor', disablePadding: false, label: 'научный руководитель'},
    // {id: 'orderIn', disablePadding: false, label: 'пр. о зачислении'},
    //{id: 'orderIn_tblFace_tblOrderId', disablePadding: false, label: 'id'},
    // {id: 'orderOut', disablePadding: false, label: 'пр. о отчислении'},
    //{id: 'orderOut_tblFace_tblOrderId', disablePadding: false, label: 'id'},
];

const FacesAspirantsByAdvisor = ({advisorId} ) => {
    const {
        aspirantsByAdvisor: {
            datasetModify, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

    useEffect(() => {
        fetch(advisorId);
    }, [advisorId])

    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={datasetModify}
            error={error}
            deleteRec={deleteRec}
            //fetch={fetchForCurrentId}
            FormEdit={FacesAspirantsByAdvisorEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FacesAspirantsByAdvisor;