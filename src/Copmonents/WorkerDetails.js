import React, {useEffect, useState,useContext} from "react";
import { MultiSelect } from 'primereact/multiselect';
import LeftRequests from './LeftWorkerDetails'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

import { useParams } from "react-router-dom";

import { GetHook } from '../Hooks/useAxiosApi';
import ExportExcel from '../Copmonents/ExportExcel'
import UserContext from '../Copmonents/user/UserContext'



// const data={
//     "startdate":"01/02/22",
//     "enddate": "01/02/22",
//     "worker_branch": {
//         "id": 2,
//         "worker": {
//             "firstName": "sssss ",
//             "lastName":'kkkkk',
//             "idnumberWorker": 123456789
//         }
//     },
//     "role1": "gh",
//     "role2": null,
//     "role3": null,
//     "employing_days": [
//         {
//             "day": 2,
//             "fromhour": 32,
//             "tohour": 12
//         },
//         {
//             "day": 1,
//             "fromhour": 1,
//             "tohour": 12
//         }
//     ]
// }

const WorkerDetails =()=>{
    //קריאה לדאטה בייס לקבלת פרטי העובד ע"י מס זהות - שהתקבל בנתיב
    const params=useParams();
    const id=params.workerId;
   
  const { data, loading } = GetHook(`worker/${id}`);
  //const { data, loading } = GetHook(`worker/1`);

  console.log("workerForDisplay",data);

const user = useContext(UserContext); 
    return (
// 
<div style={{display:"flex" }}> 
     {/* marginRight: "15%", */}
    {data && data[0]&& <>
         <LeftRequests worker_branchId={data[0].worker_branch.id} ></LeftRequests>  
        {/* <div style={{width:"300px",position:"relative", left:'30%' ,top:"30px"}}> */}
        <div className="card">
            <Card title="פרטי העובד" style={{ width: "1000px", padding:"auto"  ,textAlign: "center",  margin: "auto" ,position:"relative",left:"10%",Top:"6sa s`0px"}}>

           
            {/* <div style={{fontSize:"26px",position:"relative"}}>{data[0].role1.role_name} 
            ת.ז. {data[0].worker_branch.worker.idnumberWorker} תפקיד </div>
           

            <div  style={{position:"relative",padding:"20px"}}>
                <span style={{backgroundColor:"lightgray" }}>{data[0].startdate}</span>  &nbsp;&nbsp;ותק עבודה: מתאריך
                    <br></br>
                <span style={{backgroundColor:"lightgray" }}> {data[0].enddate}</span>  עד תאריך    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            </div> 

            <div className="card"  style={{width:"300px",position:"relative" }}>
                <DataTable value={data[0].employing_days} header="מערכת שעות"  tableStyle={{padding:'2px'  }}> 
                    <Column field="tohour" header="עד שעה"></Column>
                    <Column field="fromhour" header="משעה"></Column>
                    <Column  field="day" header="יום"></Column>
                </DataTable>
            </div> */}
            
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <h1 style={{fontSize:"36px"}}>  
                    {data[0].worker_branch.worker.lastName} &nbsp;&nbsp;
                    {data[0].worker_branch.worker.firstName}
                </h1>
                <div className="flex align-items-center gap-2">
                                {/* <Tag value="תוצאת התיק" ></Tag> */}
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            {/* <h4 className="mt-0 mb-3">מגיש התיק:</h4> */}
                            {/* <Tag value={data.name}></Tag> */}
                            {/* <h4 className="mb-1">סטטוס: {data[0].worker_branch.worker.firstName}</h4> */}
                            {/* <h4 className="mb-1">תאריך פתיחת התיק: {product.openDate}</h4> */}
                            {/* <h4 className="mt-0 mb-3">פקיד מטפל:{data[0].worker_branch.worker.lastName}</h4> */}
                            <h2 className="mt-0 mb-3">תעודת זהות: {data[0].worker_branch.worker.idnumberWorker} </h2>
                            <h2 className="mt-0 mb-3">תפקיד: {data[0].role1.role_name} </h2>
                            <h2 className="mt-0 mb-3"> </h2>
                            
                            <h3 className="mt-0 mb-3">{new Date(data[0].startdate).toLocaleDateString()}ותק עבודה: מתאריך</h3>
                            <h3 className="mt-0 mb-3">   {new Date(data[0].startdate).toLocaleDateString()}  עד תאריך </h3>
                            
                            {user.user_accessid != 3 && <ExportExcel data={data}></ExportExcel>}
                            {/* <h5 className="mt-0 mb-3">הערות: {data[0].role1.role_name} </h5> */}
                            <div className="flex flex-column align-items-center gap-3 py-5" style={{width:"60%",position:"relative",left:"20%"}}>
                            <DataTable value={data[0].employing_days} header="מערכת שעות"  tableStyle={{padding:'2px'  }}> 
                                 <Column field="tohour" header="עד שעה"></Column>
                                <Column field="fromhour" header="משעה"></Column>
                                <Column  field="day" header="יום"></Column>
                            </DataTable> 
                            
                            </div>
                        </div>


            

                  </Card>
               </div> 
        
         </>
    }
</div> 
       
    );
}
export default WorkerDetails