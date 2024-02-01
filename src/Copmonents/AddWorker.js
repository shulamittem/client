import React from "react";

import NewWorker from "./formsForAdd/NewWorker"
import UploadDocuments from "./UploadDocuments"
import { useParams } from "react-router-dom";
import { GetHook } from '../Hooks/useAxiosApi';

export default function AddWorker(){

const params=useParams();
const id=params.workerId;
console.log(id);

// ל האם להוסיף בקשה לעובד חדש או לעדכן את סטטוס העובד לסטטוס פעיל
let update;

//אם העובד הוכנס כבר - קבלת הפרטים מהדאטה בייס
 if(id){
       var { data, loading } = GetHook(`worker/${id}`);
            console.log('worker details',data,loading);
        update = true;
      }  
    return(
        <>
        <div style={{display:"flex",flexWrap:"wrap-reverse"}}>
             <div style={{width:"400px", padding:"50px",background:'rgb(224,224,224)' }}> 
           
                    <UploadDocuments ></UploadDocuments>
                    {/* <UploadDocuments ></UploadDocuments> */}
           </div>
            <div style={{width:"600px" ,position:"relative",left:"16%"}}>
           {!loading&& <NewWorker details={data} update={ update} ></NewWorker>}
            </div>
            
        </div>  
        </>
    );
}







        





