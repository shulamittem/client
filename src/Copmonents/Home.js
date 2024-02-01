import React, { useState, useEffect } from 'react';
import Navi from "./Navigation";

import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Create,Get } from '../Hooks/axiosApi';

 import background from '../images/background.png'


//   import { Toast } from 'primereact/toast';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

import { BiError} from 'react-icons/bi';

const Home = (props) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [formData, setFormData] = useState(props.details);
    const [userid,serUserid] = useState(null);

//בדיקה שכל שדות החובה הוכנסו בנתונים מתאימים
    const validate = (data) => {
        let errors = {};

        if (!data.idNumber) {
            errors.idNumber = 'ID number is required.';
        }
        else if (data.idNumber.length !== 9 || !/^\d+$/.test(data.idNumber)) {
            errors.idNumber = 'ID Number is invalid.'
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    //בעת לחיצה על כפתור האימות
    const onSubmit = async (data, form) => {
        console.log("welcome");
        setFormData(data);
        form.restart();
        await HandleClick(data);
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {
        setShowMessage(false); navigate('/Worker');
    }} /></div>;
    const errorDialogfooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => setShowErrorMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;

    const navigate = useNavigate();

    // קריאת שרת לאימות פרטי המשתמש
    async function HandleClick(data) {
        console.log(data);
        const obj = {
            userId: data.idNumber,
            password: data.password
        }
        const res = await Create('user/sign_in', obj);
        console.log(res);
        if (res.status && res.status === 200) {
            setMessage(<>
                <h5>log in Successfully!</h5>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                    Your account is registered under name <b>{data.firstName} {data.lastName}</b>.<br />Please check <b>{data.email}</b> for activation instructions.
                </p>
            </>)
            setShowMessage(true);
            //sending the id number to the context hook
            props.setUserId(data.idNumber)
        }
        else if (res.response && res.response.data.message === 'Unauthorized user') {
            console.log("here");
            setMessage(<>
                <h5>משתמש לא חוקי</h5>
            </>)
            setShowErrorMessage(true);
        }
        else if (res.response && res.response.data.message === 'Unauthorized password') {
            setMessage(<>
                <h5>סיסמא לא חוקית</h5>
            </>)
            setShowErrorMessage(true);
        }
        else {
            setErrorMessage(res.message);
            setShowErrorMessage(true);
        }
    };

    //במידה והמשתמש שכח סיסמא תשלח סיסמא חדשה למייל שהכניס
    const forgetPassword = async(event) =>{
        console.log(userid);
        const userId=213643315;
         await Get(`user/sign_in?userId=${userId}`);
    }


    return (
//  
    <div style={{ backgroundImage: `url(${background})` ,backgroundSize:"cover" ,height:"960px"}}>
        {/* <img  style={{ position:"absolute" , right:"5px"}} src={background} ></img> */}

        <div className="form-demo" style={{ width: "250px", padding: "60px", position: "relative", top: "400px" }}>
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} footer={dialogFooter} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    {message}
                </div>
            </Dialog>
            <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={errorDialogfooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                <BiError style={{ fontSize: '5rem', color: 'var(--red-500)' }}/>
                    <h5>Failed</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        login is failed : <b>{errorMessage}</b>
                        {message} <br />You should try again.
                    </p>
                </div>
            </Dialog>
            <div className="flex justify-content-center" >
                <div className="card" >
                    <h1 className="text-right" style={{textAlign:"center"}} >כניסה למערכת</h1>
                    <Form onSubmit={onSubmit} initialValues={{ idNumber: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <div className="form-demo" style={{ width: "350px" }}>

                                <Field name="idNumber" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="ID number" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="ID number" className={classNames({ 'p-error': isFormFieldValid(meta) })}>ID number*</label>
                                        </span>

                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />

                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>

                            <div style={{ width: "340px", display: "flex" }}>
                                {/* <Button type='button' style={{ margin: "5px" }} label="שכחתי סיסמא" className="mt-2" onClick={forgetPassword } /> */}
                                <Button type='submit' style={{ margin: "5px" }} label="כניסה" className="mt-2" />
                            </div>
                        </form>
                    )} />
                    {/* <Button  style={{margin:"5px" }} label="שכחתי סיסמא" className="mt-2" onClick={()=>{forgetPassword}}/> */}
                </div>
            </div>
        </div>
    </div>
    );


}
export default Home