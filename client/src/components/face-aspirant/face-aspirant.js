import React from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceAspirantEdit from "../face-aspirant-edit";

const headCells = [
    {id: 'id', disablePadding: false, key: true},
    {id: 'dateOn', disablePadding: false, label: 'зачислен', dataType: 'date'},
    {id: 'dateOff', disablePadding: false, label: 'отчислен', dataType: 'date'},
    {id: 'orderIn', disablePadding: false, label: 'пр. о зачислении'},
    //{id: 'orderIn_tblFace_tblOrderId', disablePadding: false, label: 'id'},
    {id: 'orderOut', disablePadding: false, label: 'пр. о отчислении'},
    //{id: 'orderOut_tblFace_tblOrderId', disablePadding: false, label: 'id'},
    {id: 'isRecommendation', disablePadding: false, label: 'реком. сов. фак.', padding:'checkbox'},
    {id: 'isProtocol', disablePadding: false, label: 'выписка из протокола', padding:'checkbox'},
    {id: 'isAgree', disablePadding: false, label: 'согласие на науч. рук.', padding:'checkbox'},
    {id: 'isHeadDepartment', disablePadding: false, label: 'согласование зав. каф.', padding:'checkbox'},
    {id: 'dissertationTheme', disablePadding: false, label: 'тема диссертации'},
    {id: 'educationForm', disablePadding: false, label: 'форма обучения'},
    {id: 'nameDirection', disablePadding: false, label: 'направление обучения'},
    {id: 'DirectionalityOrSpecialty', disablePadding: false, label: 'направленность/специальность'},
    {id: 'subDiv', disablePadding: false, label: 'кафедра'},
    {id: 'faculty', disablePadding: false, label: 'факультет'},
    {id: 'subject', disablePadding: false, label: 'ин. яз'},
    {id: 'academicAdvisor', disablePadding: false, label: 'научный руководитель'},

];

const FaceAspirant = ({faceId}) => {
    const {
        faceAspirant: {
            datasetModify, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

    const fetchForCurrentId = () => {
        fetch(faceId);
    }

    return (
        <TableEdit
            headCells={headCells}
            isLoading={isLoading}
            dataset={datasetModify}
            error={error}
            deleteRec={deleteRec}
            fetch={fetchForCurrentId}
            FormEdit={FaceAspirantEdit}
            initialOrderBy='dateOn'
        />
    );
};

export default FaceAspirant;