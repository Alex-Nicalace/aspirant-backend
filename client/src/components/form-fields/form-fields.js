import React, {useEffect, useState} from 'react';
import FormButtons from "../form-buttons";

const FormFields = ({closeEdit, modeEdit, currentRec, data, children, recInit, valuesToState}) => {
        const {
            insertRec,
            updateRec,
            dataset
        } = data;
        //const [rec, setRec] = useState(recInit);
        const [rec, setRec] = useState(null);
        //const initState = {};

        // useEffect(() => {
        //     // чтобы в момоент редактирования в форме оказались редактируемые данные
        //     if (modeEdit === 'update') {
        //         const result = dataset.find(i => i.id === currentRec);
        //         result && setRec(result);
        //         return;
        //     }
        //
        //     setRec(recInit);
        // }, [modeEdit]);

        useEffect(() => {
            // чтобы в момоент редактирования в форме оказались редактируемые данные
            if (modeEdit === 'update') {
                const result = dataset.find(i => i.id === currentRec);
                result && setRec(result);
                return;
            }
            !recInit
                ? setRec({...buildInitState(children), ...valuesToState})
                : setRec(recInit)
            //console.log({...buildInitState(children), ...valuesToState});
        }, [])

        // useEffect(() => {
        //     console.log(rec)
        // }, [rec])

        const buildInitState = (childrenMy) => {
            //console.log(childrenMy);
            //  в циуле перебераю всех чилов
            const res = {};
            const func = (childrenMy) => {
                React.Children.forEach(childrenMy, ((child) => {
                    if (typeof (child) === 'object') {
                        if (Array.isArray(child.props?.children)) {
                            // если масив значит имется чилдрены
                            func(child.props.children)
                        }
                        if (child.props.hasOwnProperty('name')) {
                            // если имеется пропс имеет name то создать ему onChange и value
                            res[child.props.name] = child.props.hasOwnProperty('value')
                                ? child.props.value
                                : '';
                        }
                    }
                }))
            }
            func(childrenMy);
            return res;
        }

        const changeValueHandle = (value, name) => {
            setRec((state) => {
                return {
                    ...state,
                    [name]: value
                }
            });

        }

        const saveChangesHandle = async (e) => {
            e.preventDefault();

            closeEdit();

            switch (modeEdit) {
                case 'insert':
                    await insertRec({...rec});
                    return
                case 'update':
                    await updateRec({id: currentRec, ...rec});
                    return
                default:
                    return
            }
        }

        const addToCompPropValueAndEventOnChange = (childrenMy) => {
            return (
                //  в циуле перебераю всех чилов
                React.Children.map(childrenMy, ((child) => {
                    let childrenModify = null;
                    let controlModify = null;

                    if (Array.isArray(child.props?.children)) {
                        // если масив значит имется чилдрены
                        childrenModify = addToCompPropValueAndEventOnChange(child.props?.children)
                    }
                    if (child.props?.hasOwnProperty('control')) {
                        controlModify = addToCompPropValueAndEventOnChange(child.props.control)
                    }
                    const propsModify = {...child.props};
                    if (childrenModify) {
                        // если имеются измененные чилдрены то присвоить их
                        propsModify.children = childrenModify
                    }
                    if (propsModify.hasOwnProperty('name')) {
                        // если имеется пропс имеет name то создать ему onChange и value
                        propsModify.onChange =
                            !child.props.isDataPicker // у DataPicker другой интерфейс
                                ? ({
                                       target: {
                                           value,
                                           name,
                                           checked
                                       }
                                   }) => changeValueHandle(child.props.isCheckBox ? checked : value, name)
                                : (date) => changeValueHandle(date, child.props.name);
                        propsModify.value = rec[child.props.name]
                        propsModify.checked = rec[child.props.name]
                    }
                    if (controlModify) {
                        propsModify.control = controlModify[0]
                    }
                    return (typeof (child) === 'object')
                        ? React.cloneElement(child, {
                            ...propsModify
                        })
                        : child;
                }))

            )
        }

        return (
            <FormButtons saveBtn={saveChangesHandle} closeEdit={closeEdit} isSubMit>
                {rec && addToCompPropValueAndEventOnChange(children)}
            </FormButtons>
        );
    }
;

export default FormFields;