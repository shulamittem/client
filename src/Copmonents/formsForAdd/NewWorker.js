import React, { useState, useEffect, useContext, useInsertionEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { BiError} from 'react-icons/bi';

import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { Create, Update, Get} from '../../Hooks/axiosApi';
import { useParams } from "react-router-dom";
import { GetHook } from '../../Hooks/useAxiosApi';
import DaysTable from '../DaysTable';
// import ExportExcel from '../ExportExcel'
import UserContext from '../user/UserContext'
import { toFormData } from 'axios';


import CreateWorkerToDB from "../../Services/CreateWorker"



 


let  rolesForIndex, managerForIndex,travelingForIndex;

export default  function NewWorker(props) {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [roles, setRoles] = useState([]);
    const [managers, setManagers] = useState([]);
    const [traveling, setTraveling] = useState([]);

    
    const getRoles = async()=>{
       let rolesList =await Get('worker/role');
        rolesForIndex=rolesList.data;
        console.log(rolesForIndex,"rolesForIndex11");
        rolesList=rolesList.data.map(e=>e.role_name);
        setRoles(rolesList);
        }
      const getManagers = async()=>{
        let managersList =await Get('worker/manager');
        managerForIndex=managersList.data;
        console.log(managerForIndex,"managerForIndex");
        managersList= managersList.data.map(e=>e.manager_name);
       setManagers(managersList);
      }
       
    const getTraveling = async()=>{
        let travelingsList =await Get('worker/traveling');
        travelingForIndex=travelingsList.data;
        console.log(travelingForIndex,"travelingForIndex");
        travelingsList= travelingsList.data.map(e=>e.traveling_name);
       setTraveling(travelingsList);
      }
          useEffect(() => {
               getRoles();
               getManagers();
               getTraveling();
          }, []);
          
        
  


   //משתמש
    const user = useContext(UserContext);
    useEffect(() => {
        console.log("userAtWorkerComponent",user);
      }, [user]);

    const [formData, setFormData] = useState(props.details);
    
    
    //בדיקות תקינות לקלט שהוכנס\\
    const validate = (data) => {
        let errors = {};
        if (!data.firstName) {
            errors.firstName = 'First Name is required.';
        }
        // if (!data.lastName) {
        //     errors.lastName = 'Last Name is required.';
        // }
        // if (!data.email) {
        //     errors.email = 'Email is required.';
        // }
        // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        //     errors.email = 'Invalid email address. E.g. example@email.com';
        // }

        // if (!data.idNumber) {
        //     errors.idNumber = 'ID number is required.';
        // }
        // else if (data.idNumber.length !== 9 || !/^\d+$/.test(data.idNumber)) {
        //     errors.idNumber = 'ID Number is invalid.'
        // }

        // if (!data.role) {
        //     errors.role = 'choose a role';
        // }
        return errors;
    };



    const onSubmit = async (data, form) => {
        console.log("submit");
       form.restart();

        if (user.user_accessid == 3)
            await HandleClickForUser(data, form);
        // console.log(CreateWorkerToDB(data,rolesForIndex,user) );

        else
            await HandleClickForManager(data, form)
           
        };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    //\\
    //הודעה שהבקשה נקלטה בהצלחה
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); navigate('/'); }} /></div>;
    const errorDialodFooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => setShowErrorMessage(false)} /></div>;

   

    //ניווט לדף המתאים
    const navigate = useNavigate();

    //למנהלת
    async function HandleClickForManager(data) {
        console.log("manager function");
        console.log(user, props.update);

        const employing_details = {
            idemploying_details: data.idNumber,
            employing_status: 1
        }

        //שליחת בקשה לדאטה בייס לעדכון סטטוס האוביקט 
        const branchid = 1//formData[0].branchnumber
        const workerBranchId = parseInt(branchid.toString() + data.idNumber)
        //אם המנהלת רוצה לאשר
        if (props.update) {
            const res = await Update(`worker/${workerBranchId}`, employing_details);
            //אם הבקשה הוכתרה בהצלחה
            if (res && res.status && res.status === 200) {
                setMessage(<>
                    <h5>enter a new worker Successfulty!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                       הוכנסה למערכת בהצלחה<b>{data.firstName} {data.lastName} ! </b>
                    </p>
                </>)
                setShowMessage(true);
            }
            // why - ??? it still does not work out.
            //אחרת
            else if (res.response && res.response.data.message === 'Duplicate workers') {
                setMessage(<>
                    <h5>cannot enter new worker!</h5>
                </>)       
            }
            else {
                setErrorMessage(res.data.message);
                setShowErrorMessage(true);
            }
        }
        else
            await HandleClickForUser(data)
    };

    //למשתמש רגיל
    async function HandleClickForUser(data, form) {
        // service שליחת בקשה לדאטה בייס ליצרת האוביקט 
        const res=await CreateWorkerToDB(data,rolesForIndex,user);
                //אם הבקשה הוכתרה בהצלחה
        if (res.status && res.status === 201) {
            console.log("enter");
            setMessage(<>
                <h5>enter request Successfully!</h5>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                    Your request under name <b>{data.firstName} {data.lastName} is sent to the principle</b>
                </p>
            </>)
            setFormData(null);
            console.log(formData);
            setShowMessage(true);
        }
        // why - ??? it still does not work out.
        //אחרת
        else if (res.response && res.response.data.message === 'worker is already exist!') {
            console.log("exist");
            setMessage(<>
                <h5>You Are Signed Up already!</h5>
            </>)
             setShowErrorMessage(true);
             console.log(message);
        }
        else {
            setErrorMessage(res.data.message);
            setShowErrorMessage(true);
        }
    };

    //אתחול הערכים של הטופס
    let initialValues={"firstName": formData!==undefined&&formData!==null?formData[0].worker_branch.worker.firstName:"",lastName: formData!==undefined && formData!==null?formData[0].worker_branch.worker.lastName:"", email: formData!==undefined&&formData!==null?formData.email:"", password: formData!==undefined&&formData!==null?formData.password:"", idNumber:formData!==undefined&&formData!==null?formData[0].worker_branch.worker.idworker
      :""}

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    {message}
                </div>
            </Dialog>
            <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={errorDialodFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                     <BiError style={{ fontSize: '5rem', color: 'var(--red-500)' }}/>
                    <h5>Failed Registration</h5>
                    {message  ||
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your registration failed because of some errors that occured. Error Description: <b>{errorMessage}</b><br />You should try again.
                    </p>}
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h1 className="text-center">הוספת עובד חדש</h1>
                    <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} preventDefault className="p-fluid">
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <div style={{ width: "250px", padding: "20px" }}>
                                   
                                    <Field name="lastName" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="lastName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>שם משפחה*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="birthDate " render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-calendar" />
                                                <Calendar id="birthDate" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="birthDate" className={classNames({ 'p-error': isFormFieldValid(meta) })}>תאריך לידה</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="telphone" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <InputMask id="telphone" {...input} mask="99-9999999" slotChar="00-0000000" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="telphone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>טלפון</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    {/* <Field name="birth" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputMask id="birth" {...input} mask="99/99/9999"  slotChar="mm/dd/yyyy" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="birth" className={classNames({ 'p-error': isFormFieldValid(meta) })}>תאריך </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} /> */}
                                    <Field name="adress" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <InputText id="adress" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="adress" className={classNames({ 'p-error': isFormFieldValid(meta) })}>כתובת</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="correntAge" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-calendar" />
                                                <Calendar id="correntAge" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="correntAge" className={classNames({ 'p-error': isFormFieldValid(meta) })}>גיל בתחילת העסקה</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />

                               </div>
                                <div style={{ width: "250px", padding: "22px" }}>
                                    {/* <Field name="password"  style={{width:"200px" }}render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} /> */}
                                     <Field name="firstName" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="firstName" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>שם פרטי*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    
                                    <Field name="idNumber" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="ID number" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="ID number" className={classNames({ 'p-error': isFormFieldValid(meta) })}>מספר זהות*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                   

                                    <Field name="mobilephone" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputMask id="mobilephone" {...input} mask="999-999-9999" slotChar="000-000-0000" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="mobilephone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>טלפון נייד </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="email" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>אמייל*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />

                                    <Field name="role" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">         
                                                <Dropdown value={roles} id="role" {...input} placeholder="תפקיד" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}   options={roles}  />
                                                <label htmlFor="role" className={classNames({ 'p-error': isFormFieldValid(meta) })}>תפקיד*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    {/* <Field name="isTelphone" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="card flex flex-column align-items-center gap-3">
                                                <TriStateCheckbox id="isTelphone" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="isTelphone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>isTelphone*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} /> */}
                                    
                                    {/* {day()} */}
                                  
                                </div>
                            </div>
                            {/* <ExportExcel data={formData}></ExportExcel> */}
                   
                            <Button type="submit" label="הוספת עובד" className="mt-2" />
                        </form>
                    )} />

                </div>
            </div>


           


        </div>
    );
}









