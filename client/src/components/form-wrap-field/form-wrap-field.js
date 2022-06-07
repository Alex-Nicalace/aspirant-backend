import React, {useEffect} from 'react';
import FormButtons from "../form-buttons";

const FormWrapField = ({
                           children,
                           modeEdit,
                           currentRec,
                           setValue,
                           closeEdit,
                           insertRec,
                           updateRec,
                           dataset,
                           valuesToState,
                           handleSubmit
                       }) => {

    useEffect(() => {
        if (modeEdit === 'update') {
            const result = dataset.find(i => i.id === currentRec);
            for (const key in result) {
                setValue(key, result[key]);
            }
        }
    }, []);

    const saveChangesHandle = async (data, e = null) => {
        closeEdit();
        e && e.preventDefault();

        switch (modeEdit) {
            case 'insert':
                await insertRec({...data, ...valuesToState});
                return
            case 'update':
                await updateRec({id: currentRec, ...data, ...valuesToState});
                return
            default:
                return
        }
    }

    return (
        <FormButtons saveBtn={handleSubmit(saveChangesHandle)} closeEdit={closeEdit}>
            {children}
        </FormButtons>
    );
};

export default FormWrapField;