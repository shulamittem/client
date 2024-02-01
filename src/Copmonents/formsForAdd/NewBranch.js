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


export default function NewBranch(props) {
    const [formData, setFormData] = useState(props.details);
    const [primary, setPrimary] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);

  

//בדיקות תקינות לקלט שהוכנס\\
    const validate = (data) => {
        let errors = {};
        if (!data.branchName) {
            errors.branchName = 'First Name is required.';
        }
  
        // if (!data.branchCity) {
        //     errors.branchCity = 'First Name is required.';
        // }
        // if (!data.branchAddress) {
        //     errors.branchAddress = 'First Name is required.';
        // }


        //-----------------------not working
        // if (!data.email) {
        //     errors.email = 'Email is required.';
        // }
        // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        //     errors.email = 'Invalid email address. E.g. example@email.com';
        // }
        
        return errors;
    };

    const onSubmit = async (data, form) => {
        console.log("ljhlkg");
        setFormData(data);
        form.restart();
        await HandleClick(data);
    };


    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {setShowMessage(false); navigate('/worker');}} /></div>;
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
             
        branch_name:data.branchName,
        branch_city:data.branchCity,
        branch_street:data.branchAddress,
        //----להוסיף עוד שדות
        // branch_telephone:data.branchTelephone,
        // branch_email:data.branchEmail,
        }
       //שליחת בקשה לדאטה בייס ליצרת האוביקט 
          const res = await Create('branch', obj);
         //אם הבקשה הוכתרה בהצלחה
        if (res.status && res.status === 201) {
            setMessage(<>
                <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your request under name <b>{data.firstName} {data.lastName} is sent to the principle</b>
                    </p>
            </>)
            setShowMessage(true);
        }
       // why - ??? it still does not work out.
       //אחרת
        else if (res.response && res.response.data.message === 'Duplicate workers') {
            setMessage(<>
                <h5>You Are Signed Up already!</h5>
            </>)       
        }
        else {
            setErrorMessage(res.data.message);
            setShowErrorMessage(true);
        }
     };

    
     
  
         
     
    

    const initialValues={branchName: '',branchCity: '', branchAddress: '', branchTelephone: '', branchEmail: ''}
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
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Failed Registration</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your registration failed because of some errors that occured. Error Description: <b>{errorMessage}</b><br />You should try again.
                    </p>
                </div>
            </Dialog>
        <div className="flex justify-content-center">
            <div className="card">
                <h1 className="text-center">הוספת סניף חדש</h1>
                <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            <div style={{width:"250px" ,padding:"20px"}}>
                            <Field name="branchName" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="branchName" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="branchName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>BranchName*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                            <Field name="branchCity" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="branchCity" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="branchCity" className={classNames({ 'p-error': isFormFieldValid(meta) })}>branchCity*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                            <Field name="branchAddress" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="branchAddress" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="branchAddress" className={classNames({ 'p-error': isFormFieldValid(meta) })}>branchAddress*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                            </div>
                            <div style={{width:"250px" ,padding:"22px" }}>
                             <Field name="branchTelephone" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber id="branchTelephone" {...input} useGrouping={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="branchTelephone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>branchTelephone*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                            
                             <Field name="branchEmail" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <InputText id="branchEmail" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="branchEmail" className={classNames({ 'p-error': isFormFieldValid(meta) })}>branchEmail*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                              {/* <Field name="isPrimary" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="card flex flex-column align-items-center gap-3">
                                                <TriStateCheckbox id="isPrimary" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="isPrimary" className={ classNames({ 'p-error': isFormFieldValid(meta) })}>isPrimary*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />        */}
                            </div>
                        </div>
                        <Button type="submit" label="הוספת הסניף" className="mt-2" />

                    </form>
                )} />
            </div>
        </div>
    </div>                        

    );
}