import { Create } from '../../Hooks/axiosApi';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputNumber} from 'primereact/inputnumber';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import {Get}  from '../../Hooks/axiosApi'
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { InputMask } from 'primereact/inputmask';



export default function NewUser(props) {
    const [formData, setFormData] = useState(props.details);
    const [primary, setPrimary] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);


    const [branches, setBranches] = useState([]);


    const getBranches = async()=>{
          let branchesList =await Get('branch/');
         console.log("branchesList",branchesList);
        branchesList= branchesList.data.map(e=>e.branch_name);
        setBranches(branchesList);
        }
   
        useEffect(() => {
            getBranches();
        }, []);
        
//בדיקות תקינות לקלט שהוכנס\\
    const validate = (data) => {
        let errors = {};
        if (!data.name) {
            errors.name = 'Name is required.';
        }
        if (!data.idNumber) {
            errors.idNumber = 'ID number is required.';
        }
        else if (data.idNumber.length !== 9 || !/^\d+$/.test(data.idNumber)) {
            errors.idNumber = 'ID Number is invalid.'
        }
        if (!data.branchname) {
            errors.branchname = 'branchname is required.';
        }
       
        if (!data.password) {
            errors.password = 'Password is required.';
        }
        else if (data.password.length < 6 || data.password.length > 12) {
            errors.password = 'Password length is at least 6 and at most 12.';
        }
        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }  
        if (!data.user_accessid) {
            errors.password = 'user_accessid is required.';
        }      
        return errors;
    };

    const onSubmit = async (data, form) => {
        console.log("הוספת משתמש");
        setFormData(data);
        form.restart();
        await HandleClick(data);
    };


    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {setShowMessage(false); navigate('/user');}} /></div>;
    const errorDialodFooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => setShowErrorMessage(false)} /></div>;

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

////////////////////////////////////////////////////     --------לטפל  
    // //ניווט לדף המתאים
    const navigate = useNavigate();

    async function HandleClick(data) {
        console.log(data);
        const obj = {
            idusers:data.idNumber,//not necessary - just mistake to do double colomns: idusers and idnumber
            idnumber:data.idNumber,
            name:data.name,
            city:data.city,
            street:data.street,
            email:data.email,
            phone:data.phone,
            user_accessid:data.user_accessid,
            password:data.password,
            branchid:1
        }
       //שליחת בקשה לדאטה בייס ליצרת האוביקט 
          const res = await Create('user', obj);
         //אם הבקשה הוכתרה בהצלחה
        if (res.status && res.status === 201) {
            setMessage(<>
                <h5>משתמש חדש הוכנס בהצלחה</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        המשתמש: <b>{data.name} הוכנס למערכת</b>
                    </p>
            </>)
            setShowMessage(true);
        }
       //אחרת
       
////////////////////////////////////////////////////     --------לטפל  
        else if (res.response && res.response.data.message === 'Duplicate user') {
            setMessage(<>
                <h5>You Are Signed Up already!</h5>
            </>)       
        }
        else {
            setErrorMessage(res.response.data.message);
            setShowErrorMessage(true);
        }
     };

    
     
    const initialValues={name: '', idNumber: '', user_accessid: '',city: '',street: '', email: '',phone: null, password: '',branchname: '',}
    return (
<div className="card">
            <Card style={{ width: "800px", padding: "10px"  ,textAlign: "center",  margin: "30px" ,position:"relative",left:"30%",Top:"6sa s`0px"}}>
            
        <div style={{display:"flex",flexWrap:"wrap-reverse"}}>
       
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    {message}
                </div>
            </Dialog>
            <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={errorDialodFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Failed Registration</h5>
                    {errorMessage}
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your registration failed because of some errors that occured. Error Description: <b>{errorMessage}</b><br />You should try again.
                    </p>
                </div>
            </Dialog>
        <div className="flex justify-content-center">
            <div className="card">
                <h1 className="text-center">הוספת משתמש חדש</h1>
                <Form onSubmit={onSubmit} initialValues={initialValues} style={{textAlign:"right !import"}}  validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            <div style={{width:"250px" ,padding:"20px"}}>
                           
                            <Field name="idNumber" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="idNumber" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="idNumber" className={classNames({ 'p-error': isFormFieldValid(meta) })}>מס זהות*</label>
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
                             <Field name="street" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <InputText id="street" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="street" className={classNames({ 'p-error': isFormFieldValid(meta) })}>רחוב</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />        
                            <Field name="user_accessid" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="user_accessid" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="user_accessid" className={classNames({ 'p-error': isFormFieldValid(meta) })}>הרשאת הגישה*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                            </div>
                            <div style={{width:"250px" ,padding:"22px" }}>
                            <Field name="name" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>שם*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                             <Field name="phone" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                            <InputMask id="phone" {...input} mask="999-999-9999" slotChar="000-000-0000" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>נייד </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                             <Field name="city" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">  <i className="pi pi-envelope" />
                                                <InputText id="city" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="city">עיר</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
<                           Field name="branchname" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">         
                                                <Dropdown value={branches} id="branch" {...input} placeholder="סניף" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}   options={branches}  />
                                                <label htmlFor="branch" className={classNames({ 'p-error': isFormFieldValid(meta) })}>סניף*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />        
                            <Field name="password"  style={{width:"200px" }}render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>סיסמה*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />         

                            </div>
                        </div>
                        <Button type="submit" label="הוספת המשתמש" className="mt-2" />

                    </form>
                )} />
            </div>
        </div>
    </div>                        
    </div>
    </Card>
        </div> 
        
    );
}