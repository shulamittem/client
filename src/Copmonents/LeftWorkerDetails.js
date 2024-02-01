import React, {useState , useEffect,useContext} from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';

import { useParams } from "react-router-dom";
import { GetHook } from '../Hooks/useAxiosApi';
import {NewRequest} from './Request'
import UserContext from './user/UserContext'
import { Create ,Update} from '../Hooks/axiosApi';


export default function LeftRequests(props){
    const [message, setMessage] = useState(<></>);
    const [showRequest, setShowRequest] = useState(false);
    const [requestId, setRequestId] = useState(null);


const id=props.worker_branchId;
console.log(id);
//request_statusid 1=new 2=waiting 3=approved 4=not approved

let { data, loading } = GetHook(`request/${id}`);
const user=useContext(UserContext);
 
const [request, setRequest] = useState(null);
let newRequest,oldRequest,waitingRequest,tmp;

//אתחול הרשימות לתצוגת הבקשות לפי סטטוס
if(data){

newRequest= data.filter(e=>e. request_statusid==1)
// console.log(data[0].updatedate>(new Date()-30));
// waitingRequest=data.filter(e=>e. updatedate>(new Date()-30));
waitingRequest=data.filter(e=>e.request_statusid==2);

oldRequest= data.filter(e=>e.request_statusid==3||e.request_statusid==4)
}

//אתחול ראשון
useEffect(() => {
    console.log('data - rquest', data);
    if(data){
        for (let index = 0; index < data.length; index++) {
            data[index].creationdate=new Date(data[index].creationdate).toLocaleDateString();
          }
        // console.log('newRequest',newRequest)
        waitingRequest=data.filter(e=>e. request_statusid==2);
        setRequest(waitingRequest )      
        // console.log('oldRequest',oldRequest)
     }
}, [data]);

useEffect(() => {
    console.log('Request',request)
     
}, [request]);
// const [requests, setRequests] = useState([{"requestType":"הארכת חוזה","date":"10/24/2020"},{"requestType":"הארכת חוזה","date":"10/24/2020"},{"requestType":"הארכת חוזה","date":"10/24/2020"}]);

//  const [requests, setRequests] = useState(data[0]);

//  console.log(data[0].creationdate);



const  HandleClick=async(status) => {
    setShowRequest(false);

    const requestForUpdate={
        request_statusid:status,
        updatadate:new Date()         
    }
   console.log('request from manager',requestForUpdate);
   //עדכון סטטוס הבקשה
      const res = await Update(`request/${requestId}`, requestForUpdate);
    //עדכון פרטים רלוונטים
//.<?




      console.log(res,requestForUpdate);
    //אם הבקשה הוכתרה בהצלחה
   if (res.status && res.status === 200) {
       setMessage(<>
           <h5>save  Successful!</h5>
               <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>

               <b>  the request is sent to the principle</b> 
               </p>
       </>)
        // data= GetHook(`request/${id}`);
        console.log(data);
    }

}

// האופציות למנהלת - האם לאשר את הבקשה שנבחרה או לא
//במידה וכן -הנתונים ישלחו לאישור בדאטה בייס
const dialogFooter =  (    
     <div>
            <Button label="דחה" icon="pi pi-times" onClick={() => {HandleClick(3)}} className="p-button-text" />
            <Button label="אשר" icon="pi pi-check" onClick={() => {HandleClick(2)}} autoFocus />           
     </div>
);

//בלחיצה על שורה בטבלה
        const onRowSelect = (event) => {
            // if (user.user_accessid==1)
            setRequestId( event.data["idactive_request"]);
                setShowRequest(true);
                setMessage(<> 
                    <h5> hi!!!</h5>
                { event.data["idactive_request"]}
                </>) 
            };
    return(<>
        <Dialog  header="request" visible={showRequest} onHide={() => setShowRequest(false)} 
          footer={dialogFooter} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
            <div className="flex align-items-center flex-column pt-6 px-3">
               { message}
            </div>
        </Dialog>
        <div style={{width:"25%",height:'900px', background:'rgb(224,224,224)' }}>
       { request &&
       <div>
        <Button link  onClick={(e) => {setRequest(newRequest) } }>בקשות חדשות({newRequest.length}) </Button><br></br>
        <Button link  onClick={(e) => {setRequest(waitingRequest) ;console.log(waitingRequest)} }>בקשות בטיפול({waitingRequest.length}) </Button><br></br>   
        <Button link  onClick={(e) => {setRequest(oldRequest)} }>בקשות ישנות({oldRequest.length}) </Button>
        </div>
         }

           {data&& <DataTable value={request} onRowSelect={onRowSelect} selectionMode="single"   tableStyle={{padding:'5%',width:"95%"  }}> 
                <Column field="request_type.request_type" header="סוג בקשה"></Column>
                <Column  field="creationdate" header="תאריך"></Column>
            </DataTable>}

            { user.user_accessid ==1 &&<div style={{width:"250px", position:"relative", top:'130px' ,padding:"20px"}}>
                <NewRequest dateRequest={true}  worker_branchId={id} header="בקשה להארכת חוזה" type="1"></NewRequest>
                <NewRequest schedualRequest={true}  worker_branchId={id} header="בקשה לשנוי מערכת"   type="2"></NewRequest>
                <NewRequest emptyRequest={true} worker_branchId={id} header="בקשה חדשה"  type="3"></NewRequest>
            </div>}
        </div>
        </>
    );
}