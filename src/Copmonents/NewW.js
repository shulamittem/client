// import React, { useState, useEffect } from 'react';
// import { Form, Field } from 'react-final-form';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { InputMask } from 'primereact/inputmask';
// import { Password } from 'primereact/password';
// import { Checkbox } from 'primereact/checkbox';
// import { Dialog } from 'primereact/dialog';
// import { Divider } from 'primereact/divider';
// import { classNames } from 'primereact/utils';
// import { useNavigate } from 'react-router-dom';
//  import { Calendar } from 'primereact/calendar';
//  import { Create } from '../Hooks/axiosApi';


// export default function NewWorker(props) {
//     const [showErrorMessage, setShowErrorMessage] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [showMessage, setShowMessage] = useState(false);
//     const [message, setMessage] = useState(<></>);
//    const [formData, setFormData] = useState(props.details);
  

//     const validate = (data) => {
//         let errors = {};
//         if (!data.firstName) {
//             errors.firstName = 'First Name is required.';
//         }
//         if (!data.lastName) {
//             errors.lastName = 'Last Name is required.';
//         }
//         if (!data.email) {
//             errors.email = 'Email is required.';
//         }
//         else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
//             errors.email = 'Invalid email address. E.g. example@email.com';
//         }

//         if (!data.password) {
//             errors.password = 'Password is required.';
//         }
//         else if (data.password.length < 6 || data.password.length > 12) {
//             errors.password = 'Password length is at least 6 and at most 12.';
//         }

//         if (!data.idNumber) {
//             errors.idNumber = 'ID number is required.';
//         }
//         else if (data.idNumber.length !== 9 || !/^\d+$/.test(data.idNumber)) {
//             errors.idNumber = 'ID Number is invalid.'
//         }
       
//         return errors;
//     };

//     const onSubmit = async (data, form) => {
//         console.log("ljhlkg");
//         setFormData(data);
//         form.restart();
//         await HandleClick(data);
//     };

//     const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
//     const getFormErrorMessage = (meta) => {
//         return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
//     };

//     const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {setShowMessage(false); navigate('/home-page');}} /></div>;
//     const errorDialodFooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => setShowErrorMessage(false)} /></div>;
//     const passwordHeader = <h6>Pick a password</h6>;
//     const passwordFooter = (
//         <React.Fragment>
//             <Divider />
//             <p className="mt-2">Suggestions</p>
//             <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
//                 <li>At least one lowercase</li>
//                 <li>At least one uppercase</li>
//                 <li>At least one numeric</li>
//                 <li>Minimum 8 characters</li>
//             </ul>
//         </React.Fragment>
//     );
//     const navigate = useNavigate();
//     async function HandleClick(data) {
//         console.log(data);
//         const obj = {
//            idemploying_details:data.idNumber
//             // firstName: data.firstName,
//             // lastName: data.lastName,
//             // idNumber: data.idNumber,
//             // email: data.email,
//             // password: data.password,
//             // image: data.image
//             //date:data.birthDate
//         }
//          const res = await Create('worker', obj);
//         if (res.status && res.status === 201) {
//             setMessage(<>
//                 <h5>Registration Successful!</h5>
//                     <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
//                         Your account is registered under name <b>{data.firstName} {data.lastName}</b>.<br />Please check <b>{data.email}</b> for activation instructions.
//                     </p>
//             </>)
//             setShowMessage(true);
//         }
//        // why - ??? it still does not work out.
//         else if (res.response && res.response.data.message === 'Duplicate student') {
//             setMessage(<>
//                 <h5>You Are Signed Up already!</h5>
//             </>)       
//         }
//         else {
//             setErrorMessage(res.data.message);
//             setShowErrorMessage(true);
//         }
//     };
//     const initialValues={"firstName": formData!=null?formData.firstName:"",lastName: '', email: '', password: '', idNumber: ''}
//     return (
//         <div className="form-demo">
//             <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
//                 <div className="flex align-items-center flex-column pt-6 px-3">
//                     <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
//                     {message}
//                 </div>
//             </Dialog>
//             <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={errorDialodFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
//                 <div className="flex align-items-center flex-column pt-6 px-3">
//                     <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
//                     <h5>Failed Registration</h5>
//                     <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
//                         Your registration failed because of some errors that occured. Error Description: <b>{errorMessage}</b><br />You should try again.
//                     </p>
//                 </div>
//             </Dialog>
//             <div className="flex justify-content-center">
//                 <div className="card">
//                     <h1 className="text-center">הוספת עובד חדש</h1>
//                     <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate} render={({ handleSubmit }) => (
//                         <form onSubmit={handleSubmit} className="p-fluid">
//                             <div style={{display:"flex", flexWrap:"wrap"}}>
//                                 <div style={{width:"250px" ,padding:"20px"}}>
//                                     <Field name="firstName" render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label">
//                                                 <InputText id="firstName" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                                 <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>FirstName*</label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />
//                                     <Field name="lastName" render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label">
//                                                 <InputText id="lastName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                                 <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>lastName*</label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />
                                    
//                                     <Field name="idNumber" render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label">
//                                                 <InputText id="ID number" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                                 <label htmlFor="ID number" className={classNames({ 'p-error': isFormFieldValid(meta) })}>ID number*</label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />
//                                      <Field name="birth" render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label">
//                                                 <InputMask id="birth" {...input} mask="99/99/9999"  slotChar="mm/dd/yyyy" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                                 <label htmlFor="birth" className={classNames({ 'p-error': isFormFieldValid(meta) })}>תאריך </label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />
                                     
//                                     <Field name="email" render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label p-input-icon-right">
//                                                 <i className="pi pi-envelope" />
//                                                 <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                                 <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />
//                                 </div>
//                                 <div style={{width:"250px" ,padding:"22px" }}>
//                                     <Field name="password"  style={{width:"200px" }}render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label">
//                                                 <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
//                                                 <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />

//                                     <Field name="birthDate " render={({ input, meta }) => (
//                                         <div className="field">
//                                             <span className="p-float-label p-input-icon-right">
//                                                 <i className="pi pi-calendar" />
//                                                 <Calendar  id="birthDate" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                                 <label htmlFor="birthDate" className={classNames({ 'p-error': isFormFieldValid(meta) })}>birthDate</label>
//                                             </span>
//                                             {getFormErrorMessage(meta)}
//                                         </div>
//                                     )} />
//                                 </div>   
//                             </div>   
//                             <Button type="submit"  label="הוספת עובד" className="mt-2" />
//                         </form>
//                     )} />
//                 </div>
//             </div>
//         </div>
//     );
//  }