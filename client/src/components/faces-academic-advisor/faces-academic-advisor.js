import React, {useState} from 'react';
import TableEdit from "../table-edit";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceAcademicAdvisorEdit from "../faces-academic-advisor-edit";
import {ACADEMIC_ADVISOR_LIST_ROUTE} from "../../utils/consts";
import PopoverFaceAllData from "../popover-face-all-data";

const FacesAcademicAdvisor = ({
                                  changeSelected = () => {
                                  },
                                  selected,
                                  viewCardMode = 'popover'
                              }) => {
    const {
        facesAcademicAdvisor: {
            datasetModify, isLoading, error,
            fetch,
            deleteRec,
        },
    } = useAspirantApiContext();

    const [faceId, setFaceId] = useState(null);
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const idPopover = isOpenPopover ? 'simple-popover' : undefined;

    const getFaceIdById = (id) => {
        const rec = datasetModify.find(i => +i.id === +id)
        if (!rec) return null;
        return rec.tblFaceId;
    }

    const changeAcademicAdvisorIdHandle = (id) => {
        changeSelected(id);
        setFaceId(getFaceIdById(id));
    }

    const openPopoverHandler = () => {
        setIsOpenPopover(true);
    }

    const closePopoverHandler = () => {
        setIsOpenPopover(false);
    }

    const headCells = [
        {id: 'id', disablePadding: false, key: true},
        {id: 'tblFaceId', disablePadding: false},
        {id: 'lastname', disablePadding: false, label: 'фамилия',},
        {id: 'firstname', disablePadding: false, label: 'имя'},
        {id: 'middleName', disablePadding: false, label: 'отчество'},
        {id: 'birthdate', disablePadding: false, label: 'дата рождения', dataType: 'date'},
    ];

    if (viewCardMode === 'popover') {
        headCells[2].onClick = openPopoverHandler;
        headCells[2].style = {color: 'blue', textDecoration: 'underline'};
    }
    if (viewCardMode === 'link') {
        headCells[2].linkArgument = 'tblFaceId';
        headCells[2].link = `${ACADEMIC_ADVISOR_LIST_ROUTE}`;
    }

    return (
        <>
            <TableEdit
                headCells={headCells}
                isLoading={isLoading}
                dataset={datasetModify}
                error={error}
                deleteRec={deleteRec}
                fetch={fetch}
                FormEdit={FaceAcademicAdvisorEdit}
                initialOrderBy='createdAt'
                onGetKeyValue={changeAcademicAdvisorIdHandle}
                currentRecInitial={selected}
            />

            <PopoverFaceAllData
                faceId={faceId}
                closePopoverHandler={closePopoverHandler}
                idPopover={idPopover}
                isOpenPopover={isOpenPopover}
            />
        </>
    );
};

export default FacesAcademicAdvisor;