import React from 'react';
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FacesAspirantsForEdit from "../faces-aspirants-edit/faces-aspirants-for-edit";

const FaceAspirantEdit = ({closeEdit, modeEdit, currentRec/*, valuesToState*/}) => {
    const {
        faceAspirant,
        faces,
        facesAcademicAdvisor,
        dictSubject,
        dictEducationForm,
        faceAspirantOrders,
        orders,
        dictDirectionalityAndSpecialty,
    } = useAspirantApiContext();

    const aspirantApiContext = {
        aspirant: faceAspirant,
        faces,
        facesAcademicAdvisor,
        dictSubject,
        dictEducationForm,
        faceAspirantOrders,
        orders,
        dictDirectionalityAndSpecialty,
    }
    return (
        <FacesAspirantsForEdit
            closeEdit={closeEdit}
            modeEdit={modeEdit}
            currentRec={currentRec}
            aspirantApiContext={aspirantApiContext}
        />
    );
};

export default FaceAspirantEdit;

// import React, {useEffect, useState} from 'react';
// import MenuItem from "@material-ui/core/MenuItem";
// import * as yup from "yup";
// import {useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";
// import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
// import FormWrapField from "../form-wrap-field";
// import {
//     CheckboxWithLabel,
//     ChoiseAcademicAdvisorFromTable,
//     DropdownList,
//     Input,
//     ChoiseDirectionalityOrSpecialtyFromTable, InputDate
// } from "../controls";
// import Popover from "@material-ui/core/Popover";
// import {Container} from "@material-ui/core";
// import FaceAspirantOrdersEdit from "../face-aspirant-orders-edit";
//
// const schema = yup.object().shape({
//     tblFaceId: yup
//         .number()
//         .transform(value => (isNaN(value) ? undefined : value))
//         .nullable()
//         .required("лицо обязательное поле"),
//     isRecommendation: yup
//         .boolean()
//         .nullable(),
//     isProtocol: yup
//         .boolean()
//         .nullable(),
//     isAgree: yup
//         .boolean(),
//     isHeadDepartment: yup
//         .boolean(),
//     tblDictSubjectId: yup
//         .number()
//         .transform(value => (isNaN(value) ? undefined : value))
//         .nullable()
//         .required("предмет обязательное поле"),
//     tblDictEducationFormId: yup
//         .number()
//         .transform(value => (isNaN(value) ? undefined : value))
//         .nullable()
//         .required("форма обучения обязательное поле"),
//     tblDictSpecialtyId: yup
//         .number()
//         .transform(value => (isNaN(value) ? undefined : value))
//         .nullable()
//         .required("направленность/спец. обязательное поле"),
//     dissertationTheme: yup
//         .string()
//         .required("тема диссертации обязательное поле"),
//     tblAcademicAdvisorId: yup
//         .number()
//         .transform(value => (isNaN(value) ? undefined : value))
//         .nullable()
//         .required("научный руководитель обязательное поле"),
//     dateOn: yup
//         .date()
//         .nullable()
//         .default(null)
//         .typeError('некорректная дата'),
//     dateOff: yup
//         .date()
//         .nullable()
//         .default(null)
//         .typeError('некорректная дата'),
// });
//
// const FaceAspirantEdit = ({closeEdit, modeEdit, currentRec/*, valuesToState*/}) => {
//     const {control, handleSubmit, formState: {errors}, setValue, watch} = useForm({
//         mode: "onBlur",
//         defaultValues: {tblFaceId: null/*, orderIn: ''*/},
//         resolver: yupResolver(schema),
//     });
//     const [tblFace_tblOrder, setTblFace_tblOrder] = useState({
//         face_order: {arr: [/*{}, {}*/]}
//         //ordersArr: [{}, {}]
//     });
//     const [tblFace_tblOrderId, setTblFace_tblOrderId] = useState(null);
//     const [typeOrder, setTypeOrder] = useState(null);
//
//     const orderIn = watch('orderIn');
//     const orderIn_tblFace_tblOrderId = watch('orderIn_tblFace_tblOrderId');
//     const orderOut = watch('orderOut');
//     const orderOut_tblFace_tblOrderId = watch('orderOut_tblFace_tblOrderId');
//
//     /*такие вот мысли .... редактирование хронологии как правило делается в контектсте редактирвания
//     данных о лице кот. уже загружены и в стейте на этот момент уже есть ИД лица
//     другой вариант это пробрасывать это свойство сюда через пропсы
//     пробую первый вариант брать из стейта
//     * */
//     const {
//         faceAspirant: {
//             insertRec,
//             updateRec,
//             datasetModify,
//             faceId
//         },
//         dictSubject,
//         dictEducationForm,
//         faceAspirantOrders,
//         orders,
//     } = useAspirantApiContext();
//
//     useEffect(() => {
//         dictSubject.fetch();
//         dictEducationForm.fetch();
//         faceAspirantOrders.fetch(currentRec)
//     }, []);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;
//
//     const getOrder = (id) => {
//         const order = orders.dataset.find(i => +i.id === +id)
//         return order && `№${order.numOrder} от ${new Date(order.dateOrder).toLocaleDateString()} г.`
//     }
//
//     const setOrderHandle = (event, whatBtn) => {
//         // if (modeEdit === 'update' && !currentRec)
//         //     return;
//         //setModeEdit(modeEdit);
//         switch (whatBtn) {
//             case 'in': {
//                 setTblFace_tblOrderId(orderIn_tblFace_tblOrderId);
//                 setTypeOrder(0);
//                 break;
//             }
//             case 'out': {
//                 setTblFace_tblOrderId(orderOut_tblFace_tblOrderId);
//                 setTypeOrder(1);
//             }
//             default: {
//
//             }
//         }
//         setAnchorEl(event.currentTarget);
//     }
//
//     const closeEditHandle = () => {
//         //setModeEdit(null);
//         setAnchorEl(null);
//     }
//
//     setValue('tblFaceId', faceId);
//
//     //const valuesToState = {}
//
//     const takeDataOrder = (order) => {
//         //console.log(tblFace_tblOrder);
//         setTblFace_tblOrder(prev => {
//             const temp = {...prev};
//             temp.face_order.arr[typeOrder] = {...order};
//             return temp
//         } )
//
//
//     }
//
//     const renderSubject = dictSubject.dataset.map((i) => <MenuItem key={i.id}
//                                                                    value={i.id}>{i.subject} </MenuItem>);
//     renderSubject.unshift(<MenuItem key='renderSubject-key' value=''> <em>не выбрано</em> </MenuItem>);
//
//     const renderDictEducationForm = dictEducationForm.dataset.map((i) => <MenuItem key={i.id}
//                                                                                    value={i.id}>{i.educationForm} </MenuItem>);
//     renderDictEducationForm.unshift(<MenuItem key='renderDictEducationForm-key' value=''> <em>не выбрано</em>
//     </MenuItem>);
//
//     //console.log(datasetModify.orderIn);
//
//     return (
//         <>
//             <FormWrapField
//                 dataset={datasetModify}
//                 closeEdit={closeEdit}
//                 currentRec={currentRec}
//                 handleSubmit={handleSubmit}
//                 insertRec={insertRec}
//                 modeEdit={modeEdit}
//                 setValue={setValue}
//                 updateRec={updateRec}
//                 valuesToState={tblFace_tblOrder}
//             >
//                 <CheckboxWithLabel
//                     control={control}
//                     name='isRecommendation'
//                     defaultValue={false}
//                     label='реком. сов. фак.'
//                     //fullWidth
//                     error={!!errors.isRecommendation}
//                     helperText={errors?.isRecommendation?.message}
//                 />
//                 <CheckboxWithLabel
//                     control={control}
//                     name='isProtocol'
//                     defaultValue={false}
//                     label='выписка из протокола'
//                     error={!!errors.isProtocol}
//                     helperText={errors?.isProtocol?.message}
//                 />
//                 <CheckboxWithLabel
//                     control={control}
//                     name='isAgree'
//                     defaultValue={false}
//                     label='согласие на науч. рук.'
//                     error={!!errors.isAgree}
//                     helperText={errors?.isAgree?.message}
//                 />
//                 <CheckboxWithLabel
//                     control={control}
//                     name='isHeadDepartment'
//                     defaultValue={false}
//                     label='согласование зав. каф.'
//                     error={!!errors.isHeadDepartment}
//                     helperText={errors?.isHeadDepartment?.message}
//                 />
//                 <div>
//                     <div>
//                         <InputDate
//                             control={control}
//                             name='dateOn'
//                             //rules={{required: true}}
//                             defaultValue={null}
//                             label='зачислен'
//                             //required
//                             error={!!errors.dateOn}
//                             helperText={errors?.dateOn?.message}
//                         />
//                         {orderIn || getOrder(tblFace_tblOrder.face_order.arr[0]?.tblOrderId)}
//                         <button type='button' onClick={(e) => setOrderHandle(e, 'in')}>приказ</button>
//                     </div>
//                     <div>
//                         <InputDate
//                             control={control}
//                             name='dateOff'
//                             //rules={{required: true}}
//                             defaultValue={null}
//                             label='отчислен'
//                             //required
//                             error={!!errors.dateOff}
//                             helperText={errors?.dateOff?.message}
//                         />
//                         {orderOut || getOrder(tblFace_tblOrder.face_order.arr[1]?.tblOrderId)}
//                         <button type='button' onClick={(e) => setOrderHandle(e, 'out')}>приказ</button>
//                     </div>
//                 </div>
//                 <DropdownList
//                     style={{minWidth: "200px"}}
//                     control={control}
//                     name='tblDictSubjectId'
//                     rules={{required: true}}
//                     defaultValue=''
//                     label='предмет'
//                     required
//                     renderItem={renderSubject}
//                     error={!!errors.tblDictSubjectId}
//                     helperText={errors?.tblDictSubjectId?.message}
//                     fullWidth
//                 />
//                 <DropdownList
//                     style={{minWidth: "200px"}}
//                     control={control}
//                     name='tblDictEducationFormId'
//                     rules={{required: true}}
//                     defaultValue=''
//                     label='форма обучения'
//                     required
//                     renderItem={renderDictEducationForm}
//                     error={!!errors.tblDictEducationFormId}
//                     helperText={errors?.tblDictEducationFormId?.message}
//                     fullWidth
//                 />
//                 <Input
//                     control={control}
//                     name='dissertationTheme'
//                     rules={{required: true}}
//                     defaultValue=''
//                     label="тема диссертации"
//                     required
//                     type='search'
//                     error={!!errors.dissertationTheme}
//                     helperText={errors?.dissertationTheme?.message}
//                     fullWidth
//                 />
//
//                 <ChoiseAcademicAdvisorFromTable
//                     control={control}
//                     name='tblAcademicAdvisorId'
//                     rules={{required: true}}
//                     defaultValue=''
//                     label='выберите научного руководителя'
//                     error={!!errors.tblAcademicAdvisorId}
//                     helperText={errors?.tblAcademicAdvisorId?.message}
//                 />
//                 <ChoiseDirectionalityOrSpecialtyFromTable
//                     control={control}
//                     name='tblDictSpecialtyId'
//                     rules={{required: true}}
//                     defaultValue=''
//                     label='выберите направленность/специальность'
//                     error={!!errors.tblDictSpecialtyId}
//                     helperText={errors?.tblDictSpecialtyId?.message}
//                 />
//                 {/*<FaceAspirantOrders*/}
//                 {/*    faceAspirantId={currentRec}*/}
//                 {/*/>*/}
//
//                 <Popover
//                     id={id}
//                     open={open}
//                     anchorEl={anchorEl}
//                     //onClose={handleClose}
//                     anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'center',
//                     }}
//                     transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'center',
//                     }}
//                 >
//                     <Container>
//                         <FaceAspirantOrdersEdit
//                             closeEdit={closeEditHandle}
//                             modeEdit={!tblFace_tblOrderId ? 'insert' : modeEdit}
//                             currentRec={tblFace_tblOrderId}
//                             valuesToState={{tblFaceAspirantId: currentRec}}
//                             insertRecProp={modeEdit === 'insert' ? takeDataOrder : undefined}
//                             whatRel={typeOrder}
//                         />
//                     </Container>
//                 </Popover>
//             </FormWrapField>
//
//         </>
//     );
// }
//
// export default FaceAspirantEdit;