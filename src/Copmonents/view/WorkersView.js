import React, { useState, useEffect,useContext } from "react";
//טבלה
import WorkerTable from "../WorkersDataTable"
// //אלמנטים
// import { Tag } from 'primereact/tag';
 import { Button } from 'primereact/button';

// import { classNames } from 'primereact/utils';
// import { TriStateCheckbox } from 'primereact/tristatecheckbox';
// import { InputText } from 'primereact/inputtext';

                       // core css

                                                                  
//בקשות
import { OrderList } from 'primereact/orderlist';
//קבלת נתונים
import { GetHook } from '../../Hooks/useAxiosApi';
import {Get} from '../../Hooks/axiosApi'
import UserContext from '../user/UserContext'
//ניווט
import { useNavigate } from "react-router-dom";


import { useParams } from "react-router-dom";



function WorkersView(props) {

    const params=useParams();
    // useEffect(async () =>  { 
    //     let worker=await Get('worker')
    //     setdata(worker);
    // }, []);
    // const [boolForRender, setB] = useState(params.b);
    // const [data, setdata] = useState(null);
//----------יבוא הנתונים---------
    // const role=Get('worker/role')
    //כלל העובדים
    
    const { data, loading } = GetHook('worker');


    
    //רשימת בקשות לעובדים חדשים
   const [newWorkers, setNewWorkers] = useState(null);
    //רשימת עובדים קיימים
   const [workers, setWorkers] = useState(null);
  



   //משתמש
    const user = useContext(UserContext);
        //fake data
        // const data=[{'role1.role_name':"aaaaaa","worker_branch.worker.idworker":1},{'role1.role_name':"aaaaaa"},{'role1.role_name':"aaaaaa"}]
        // const [request, setRequest] = useState([{name:"aaa",id:1,date:"04/01/2020"},{name:"bbb",id:1,date:"04/01/2020"},{name:2,id:"bbb",date:"04/01/2020"}]);
    useEffect(() =>  {
        console.log('data - workers', data);
        let newWorkersList;
        const filter=async(data)=>{
            newWorkersList=await data.filter(worker=>worker.employing_status==2 )
            console.log("newWorkersList",newWorkersList);
            setNewWorkers(newWorkersList);
        };
        if(data){
            filter(data)  ;
          
           let workersList= data.filter(worker=>worker.employing_status!=2 ) ;
           for (let index = 0; index < workersList.length; index++) {           
            workersList[index].employing_status ==1?workersList[index].employing_status=true:workersList[index].employing_status=false 
           }
           console.log(workersList);
           setWorkers(workersList);
        }
    }, [data]);

    useEffect(()=>{console.log(newWorkers)},[newWorkers])
 
    const navigate=useNavigate();

    const itemTemplate = (item) => {
        return (
      
            <div style={{display:"flex"}}>                
                <div  >
                    {/* <span className="font-bold" >{item.worker_branch.worker.firstName}</span> */}
                    <span className="font-bold" >{item.employing_status}</span>
                    <span className="font-bold" >{item['worker_branch.worker.firstName']}</span>
                   
                        {/* <i className="pi pi-tag text-sm"></i> */}
                        <div>
                        <small>{item['worker_branch.active_requests.creationdate']}</small>
                   </div>
                </div>
                <Button link  onClick={(e) => {if(item['worker_branch.worker.idworker']) navigate(`/addWorker/${item['worker_branch.worker.idworker']}`);}
                                        }>לפרטי העובד </Button>
               
            </div>
        );
          }

    return (
<>
    <div style={{display:"flex",flexWrap:"wrap"}}> 
        {  newWorkers && user.user_accessid == 1 &&
        <>
        <div style={{width:"30%",minWidth:"340px",height:'100%',top:"10px", background:'rgb(224,224,224)' }}>
            <div className="card xl:flex xl:justify-content-center" style={{width:"100%",height:'920px', padding:"10px"}}>
                 <OrderList style={{width:"100%"}}  value={newWorkers}  itemTemplate={itemTemplate} header="בקשות לעובדים חדשים" filter filterBy="worker_branch.worker.firstName" 
                        onChange={(e) => setNewWorkers(e.value)}  ></OrderList>
            </div> 
        </div>   
        <div style={{ width: '68%' ,top:"50px"}}>         
            {data &&  <WorkerTable data= {workers} isManager={ true}></WorkerTable>  }                                                   
            </div>
        </> 
        }    
            {data && user.user_accessid != 1 && 
            <div style={{ width: '100%' ,top:"50px",padding:"20px"}}>
                <WorkerTable data= {workers} ></WorkerTable>
            </div>
            }
            
    </div>
</>
    )
}
export default WorkersView                                                                                                              



    
   
      
  

        