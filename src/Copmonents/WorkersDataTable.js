import React, { useState, useEffect } from "react";
//טבלה
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
// מיון
import { FilterMatchMode, FilterOperator } from 'primereact/api';
//אלמנטים
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import "primeicons/primeicons.css";
//ניווט
import { useNavigate } from "react-router-dom";
//data
import { GetHook } from '../Hooks/useAxiosApi';

const WorkerTable =(props)=>{
 //------------filter -------------
    //הגדרת המסנן
    const filters= {
        'worker_branch.branch.branch_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'worker_branch.worker.firstName': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'worker_branch.worker.idworker': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'role1.role_name': { value: null, matchMode: FilterMatchMode.EQUALS },
        'contract status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'worker_branch.active_requests.request_status.request_description': { value: null, matchMode: FilterMatchMode.EQUALS },
        employing_status: { value: true, matchMode: FilterMatchMode.EQUALS }
    };

const navigate=useNavigate();

//roles list
const [role, setRole] = useState('');

let { data, loading } = GetHook('worker/role');
 
  useEffect(() => {
    console.log('data - roles', data);
    if(data){
        setRole(data.map(e=>e.role_name))
       console.log(role)
    }
}, [data]);
// console.log(props.roleList[1].data);
// const role=props.roleList[1].data.map(e=>e.role_name)
// console.log(role);
// props.data.map((item)=>console.log(item))

    //status סינון באמצאות תיבת בחירה\\
    const statusItemTemplate = (rowData) => {
        return <Tag value={rowData['worker_branch.active_requests.request_status.request_description']} severity={getColors(rowData['worker_branch.active_requests.request_status.request_description'])} />;
    };
    const statusItemTemplateFilter = (option) => {
        return <Tag value={option} severity={getColors(option)} />;
    };
    const statusRowFilterTemplate = (options) => {
        return (
                <Dropdown value={options.value} severity={getColors(options)}
                options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplateFilter} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };
    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox  value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };
    const roleRowFilterTemplate = (options) => {
       return(<Dropdown value={options.value} 
        options={role} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate=""  placeholder="בחר תפקיד" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
       )
    };
        //\\
    // statuses הגדרת  
    const [statuses] = useState([ 'בטיפול', 'חדש', 'נדחה', 'אושר']);
    const getColors = (status) => {
        switch (status) {
            case 'נדחה':
                return 'danger';

            case 'אושר':
                return 'success';

            case 'חדש':
                return 'info';


            case 'בטיפול':
                return 'warning';
            // case 'תקין':
            //     return null
        }
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.employing_status, 'text-red-500 pi-times-circle': !rowData.employing_status })}></i>;
    };
    // הגדרת עיצוב לטבלה
    const mystyle = {
        // left: '40px',
        // position: 'relative',
        padding: '20px',
    };
    

    //ניווט בעת לחיצה על פרטי עובד בטבלה
    const onRowSelect = (event) => {
      //פרטי העובד 
       console.log(event.data["worker_branch.worker.idworker"]  )
        navigate(`/workerDetails/${event.data["worker_branch.worker.idworker"]}`);
    };
    return(<>
      <DataTable 
    //   value={[{
    //             // request_status: data.worker_branch.branch.idbranches
    //             //,
    //             employing_status:true,
    //             contract: 'f230fh0g3',
    //             role: 'Bamboo Watch',
    //             id_number: 'Product Description',
    //             // workername: 'bamboo-watch.jpg',
    //             // branch: 65,
    //              "worker_branch.active_requests.request_status.request_description" : statusItemTemplate('בטיפול')
    //         }]}
                 value={props.data}
                 filters={filters} filterDisplay="row" scrollable scrollHeight="800px" onRowSelect={onRowSelect} selectionMode="single" 
                tableStyle={{width:"1150px"}} style={mystyle} 
                 >
                <Column field="worker_branch.active_requests.request_status.request_description" header="סטטוס בקשות" filter body={statusItemTemplate} filterElement={statusRowFilterTemplate} showFilterMenu={false} style={{ width: '5%' }}></Column>
                {/* <Column field="contract_status.contract_description" header="סטטוס חוזה" filter  style={{ width: '200px' }}></Column> */}
                <Column field="role1.role_name" header="תפקיד" filter filterElement={roleRowFilterTemplate} showFilterMenu={false} style={{ width: '90px' }}></Column>
                <Column field='worker_branch.worker.idworker' header="מס זהות" filter showFilterMenu={false} filterPlaceholder=".ס נן לפי ת.ז" style={{ width: '200px' }}></Column>
                <Column field='worker_branch.worker.firstName' header="שם"  filterPlaceholder="סנן לפי שם" style={{ width: '200px' }} filter sortable showFilterMenu={false} ></Column>
                {props.isManager &&<Column field='worker_branch.branch.branch_name' header="סניף" filter sortable showFilterMenu={false}  style={{ width: '200px' }}></Column>}
                <Column field="employing_status" header=" פעיל" dataType="boolean"  style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter showFilterMenu={false} filterElement={verifiedRowFilterTemplate} />
            /</DataTable>
            </>) 
        }
export default WorkerTable;
