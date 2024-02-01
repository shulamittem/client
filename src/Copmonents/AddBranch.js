import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import NewBranch from "./formsForAdd/NewBranch";
import { Card } from 'primereact/card';


export default function AddBranch(){    

    const details={"firstName":"aaaa"};
    return(
        
        <div className="card">
            <Card style={{ width: "800px", padding: "10px"  ,textAlign: "center",  margin: "30px" ,position:"relative",left:"30%",Top:"6sa s`0px"}}>
                 <div style={{display:"flex",flexWrap:"wrap-reverse",position:"relative",left:"20%"}}>
                    <NewBranch details={details}></NewBranch>
                </div> 
            </Card>
        </div> 
        

    );

}




  





