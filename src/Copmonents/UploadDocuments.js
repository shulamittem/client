import React, { useState } from 'react';
import { Button } from 'primereact/button';
 import {Create} from '../Hooks/axiosApi'
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
// import { URL } from '../../Constant';
// import './formDemo.css'
// import SubmmitedDialog from '../submmitedDialog';
let  base64data;
export default function UploadDocuments(props) {
    

    const customBase64Uploader = async (event) => {
           
           // convert file to base64 encoded
           const file = event.files[0];
           const reader = new FileReader();
           let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
   
           reader.readAsDataURL(blob);
   
           reader.onloadend =async function () {
            //    console.log(reader.result);
               base64data =await reader.result;
              console.log(base64data);  
              base64data={"base64data":base64data}
        const res= await Create(`worker/1`,base64data);             

           } 
           await reader.onloadend
        console.log(base64data,"base64data");
        const res= await Create(`worker/1`,base64data);             

           
        };
       
        const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
        const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
        const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
        

    return (<>
            <FileUpload name="demo[]" url={'/api/upload'} chooseOptions={chooseOptions}
                uploadOptions={uploadOptions} cancelOptions={cancelOptions} multiple accept="image/*" customUpload uploadHandler={customBase64Uploader}  emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            
      </>);
}