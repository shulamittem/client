import React, { useState, useEffect, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';

import UserContext from './user/UserContext'
import { Create } from '../Hooks/axiosApi';


const NewRequest =(props)=>{


    //dialog\\
    const [visible, setVisible] = useState(false);
    const [header, setHeader] = useState(props.header);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState(<></>);
    const [showMessage, setShowMessage] = useState(false);
    
    const user=useContext(UserContext);
//save the request to the db when the user clicks save
const HandleClick = async (status) => {
    { 
        const request={
        
            userid:user.idusers ,///context,
            creationdate:new Date(),//התאריך הנוכחי
            worker_branchid:props.worker_branchId,
            request_typeid:props.type,  //request_typeid 0==בקשה חדשה  
                                        //  1==בקשה לארכת חוזה
                                        //2== בקשה לשינוי מערכת    
            request_statusid:0,//1 == new request
            description:value,
            contract_renewdate:date,// במקרה של בקשה להארכת חוזה
           //day
           //fromhour
           //tohour
          
        };                   
                       
        console.log('request from user',request);
        const res = await Create('request', request);
         //אם הבקשה הוכתרה בהצלחה
        if (res.status && (res.status === 201||res.status === 200)) {
            setMessage(<>
                <h5>נשמר בהצלחה!!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>

                    <b>  ☺הבקשה נשלחה לאישור המנהלת</b> 
                    </p>
            </>)}
          setVisible(false)
          setShowMessage(true)
          }            

       setVisible(false)
}


    const footerContent = (        
        <div>
            <Button label="בטל" icon="pi pi-times" onClick={async() => setVisible(false)} className="p-button-text" />
            
            <Button label=" שלח לאישור" icon="pi pi-check" onClick={async() =>HandleClick()} autoFocus />
        </div>
    );
    //\\
    
    //calender\\
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;

    const [date, setDate] = useState(null);

    let minDate = new Date();

    minDate.setMonth(nextMonth);
    minDate.setFullYear(nextYear);

    let maxDate = new Date();

    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
//\\

    return (    
        <>
            <Button label={header} style={{ padding:"20px", margin:"10px" }}  icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header={header} visible={visible} onHide={() => setVisible(false)}
               footer={footerContent} style={{ width: '30vw',textAlign:"right" }} >
    {/* breakpoints={{ '960px': '75vw', '641px': '100vw' }} */}
            {props.emptyRequest && <span className="p-float-label" style={{ textAlign:"right" ,paddingTop:"30px"}} >
                <InputTextarea id="description" value={value} style={{ width: '100%' ,textAlign:"right" }} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                <label htmlFor="description">תאור הבקשה</label>
            </span>}
            {props.dateRequest&&<>
            <div  style={{}}>
                    <Calendar value={date} showIcon  onChange={(e) => setDate(e.value)} minDate={minDate} readOnlyInput /> 
                
            </div>
            </>}
            {props.schedualRequest&&<>
                <span  style={{display:"flex", padding:"20px",margin:"40px",padding:"20px"}}> 
                    <InputText id="schedual" value={value} placeholder="עד שעה" style={{ width: '33%' ,textAlign:"right" , padding:"20px"}} onChange={(e) => setValue(e.target.value)} />
                    <InputText id="schedual" value={value} placeholder="משעה" style={{ width: '33%' ,textAlign:"right" }} onChange={(e) => setValue(e.target.value)} />
                    <InputText id="schedual" value={value} placeholder="יום" style={{ width: '33%' ,textAlign:"right" }} onChange={(e) => setValue(e.target.value)} />
                   
                </span>
            
            </>}
            {!props.emptyRequest&&   
             <span className="p-float-label" style={{paddingTop:"20px"}}>
                <InputTextarea id="comment"  placeholder='הערה' style={{width: '80%',textAlign:"right" }} onChange={(e) => setValue(e.target.value)} rows={0.5} cols={30} /> 
                {/* <label htmlFor="description">הערה</label> */}

             </span> 
            }
            </Dialog>
   
            <Dialog  header="request" visible={showMessage} onHide={() => setShowMessage(false)} 
                     breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        { message}
                    </div>
            </Dialog>


        </>

    )}
        
    
    
export { NewRequest}
