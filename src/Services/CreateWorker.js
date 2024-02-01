import { Create, Update} from '../Hooks/axiosApi';
import UserContext from '../Copmonents/user/UserContext'


export default async function CreateWorkerToDBForUser(data,rolesForIndex,user) { 
    // console.log(rolesForIndex,"rolesForIndex");
    const worker_details = {
        idworker: data.idNumber,
        idnumberWorker: data.idNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        Mailbox: data.email,
        birthdata:data.birthDate//spelling error
    }

    const workerBranchId = parseInt(user.branchid.toString() + data.idNumber)
    console.log("workerBranchId", workerBranchId);
    //data fake!
    //????????????????????????????????????????????????????????????????????????????/
    const employing_hours = {
        day: "1",
        fromhour: "8",
        tohour: "16",
        idemploying_details: data.idNumber
    }
    console.log("rolesForIndex",);
    //  
    const employing_details = {
        idemploying_details:data.idNumber,//data.idEmployingNumber, שדה נוסף בקליטת עובד - מספר כרטיס
        worker_branch_id: workerBranchId,
        employing_status: 2, //waiting for ok from the manager
        branchnumber:user.branchid,
        startdate:new Date(),
        roleid1:rolesForIndex.find(e=>e.role_name==data.role).idrole
        // data.role
        // workingdays:
    }

    const worker_branch = {
        id: workerBranchId,
        workerid: data.idNumber,
        branchid: user.branchid
    }


    const request = {
        userid: user.idusers,///context,
        creationdate: new Date(),
        worker_branchid: workerBranchId,
        request_typeid: 0,//type of a new worker
        request_statusid: 2,//status==2 -  waiting for ok
        description: "עובד חדש",
    }
    const obj = {
        worker_details: worker_details,
        employing_details: employing_details,
        employing_hours: employing_hours,
        request: request,
        worker_branch: worker_branch
    }


    console.log('new worker for create', obj);
    //שליחת בקשה לדאטה בייס ליצרת האוביקט 
    const res = await Create('worker/', obj);
    //אם הבקשה הוכתרה בהצלחה
    return res;
};