import React, { useState ,useContext} from 'react';
import './components.css';
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';

import { useNavigate } from "react-router-dom";
import UserContext from './user/UserContext'
import { MdOutlineViewHeadline} from 'react-icons/md';
import {BiDetail} from 'react-icons/bi';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {RiUser3Line} from 'react-icons/ri'
import { Menu } from 'primereact/menu';
//  import { Toast } from 'primereact/toast';

export default function Navi() {
    const navigate = useNavigate();
    //const toast = useRef(null);

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(1);
    
    const user=useContext(UserContext);

    const getId = () => { while (!value) { }; return true }

    let items;
    let b=true;
    if(user.user_accessid &&user.user_accessid ==3 ){
    items= [

        {
            label: 'view',
            className: 'navi',
            items: [
                // {
                //     label: 'Update',
                //     icon: 'pi pi-refresh',
                //     className: 'navi',
                //     command: () => {
                //         //toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                //     }
                // },
                {
                    label: 'עובד חדש',
                    icon: <AiOutlineUserAdd/>,
                    command: () => {
                        navigate("/addWorker");
                    }
                },
               
            ]
        },
        {
            label: 'עובדים',
            className: 'navi',
            items: [
                {
                    label: 'פרטי עובד',
                    icon: <RiUser3Line></RiUser3Line>,
                    command: async () => {
                        setVisible(true);


                    }
                },
                {
                    label: 'פרטי עובדים',
                    icon: <MdOutlineViewHeadline/>,
                    command: () => {
                        navigate("/Worker");
                    }
                }
            ]
        },
       
    ];

}
     else  if(user.user_accessid  ){
    items= [

        // {
        //     label: 'view',
        //     className: 'navi',
        //     items: [
        //         // {
        //         //     label: 'Update',
        //         //     icon: 'pi pi-refresh',
        //         //     className: 'navi',
        //         //     command: () => {
        //         //         //toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
        //         //     }
        //         // },
                
               
        //     ]
        // },
        {
            label: 'עובדים',
            className: 'navi',
            items: [
                {
                    label: 'פרטי עובד',
                    icon: <RiUser3Line></RiUser3Line>,

                    command: async () => {
                        setVisible(true);


                    }
                },
                {
                    label: 'פרטי עובדים',
                    icon:  <MdOutlineViewHeadline/>,
                    command: () => {
                        navigate(`/Worker`);
                        // navigate(`/Worker${!b}`);

                    }
                },
                {
                    label: 'עובד חדש',
                    icon: <AiOutlineUserAdd/>,
                    command: () => {
                        navigate("/addWorker");
                    }
                }
            ]
        },
        {
            label: 'סניפים',
            className: 'navi',
            items: [
                {
                    label: 'סניף חדש',
                    icon: 'pi pi-plus-circle',
                    command: () => {
                        navigate("/addBranch");

                    }
                },                {
                    label: 'פרטי סניפים',
                    icon: <MdOutlineViewHeadline/>,
                    command: () => {
                       // navigate("/Worker");
                    }
                }
            ]
        } ,{
            label: 'משתמשים',
            className: 'navi',
            items: [
               
                {
                    label: 'משתמש חדש',
                    icon: 'pi pi-plus-circle',
                    command: () => {
                        navigate("/user");
                    }
                }
            ]
        },
    ];

}
    const footerContent = (
        <div>
            <Button label="ביטול" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="לפרטי העובד " icon="pi pi-check" onClick={() => { setVisible(false); console.log(value); if (value) navigate(`/workerDetails/${value}`) }} autoFocus />
        </div>
    );
    return (
        <>
            <Dialog showHeader={false} style={{ margin: "20px", width: '30vw', textAlign: "right" }} visible={visible} onHide={() => setVisible(false)}
                footer={footerContent}  >
                <br></br>
                <InputText type="text" className="p-inputtext-sm" value={value} onChange={(e) => { 
                    setValue(e.target.value); 
                    console.log(e.value) }} placeholder="הכנס ת.ז. עובד" style={{ textAlign: "right", paddingTop: "20px" }} />

            </Dialog>
            <div style={{ float: 'right', height: "900px" }}>
                <Menu style={{ height: '100%', fontSize: "20px", backgroundColor: "#2d1a46", color: "#f3f3f3 !important" }} model={items} icon />
                {/* <Toast ref={toast} style={{background:"" }}/> */}
            </div>
        </>
    )
}
