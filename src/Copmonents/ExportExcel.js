import { CSVLink } from "react-csv";     
import React, {useState} from "react";

const ExportExcel =(props)=>{
 const getCsvData = () => {
    const csvData=[{"שם":props.data[0].worker_branch.worker.firstName,"תעודת זהות":props.data[0].worker_branch.worker.idnumberWorker},{"שם": "dd"}]
//     const csvData = data.map(({ id_product, product, in_stock, to_order, rating, date }) => ({ id: id_product, name: product, price: rating }));
//     csvData.unshift({ id: "ID", name: "Product", price: "Price" });
     return csvData;
    //return {"name":1}
 };

return(
        <CSVLink
            data={getCsvData()}
            filename={"worker.csv"}
        //     className="p-button p-button-text"
            className="p-button p-component-text"

            style={{ margin:"17px" }}
        >           
              <span class="p-button-label p-c"> excel הורד פרטי עובד לקובץ</span>  
        </CSVLink>
  )
}

//update status !!!!!!!!!!!!!!!!!!!!!!!

export default ExportExcel
