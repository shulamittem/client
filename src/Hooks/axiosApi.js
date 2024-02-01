import axios from 'axios';

 const Delete= async(url, body={})=>
{
  try{
    const res= await axios.delete(`http://localhost:5000/${url}`, {data:body});
  }
  catch(err){
  console.error(err);
  }

}


//how to catch????
 const Create= async(url, objToCreate)=>
{
  console.log(url,objToCreate);
  try{
   let res= await axios.post(`http://localhost:5000/${url}`, 
    objToCreate);
    console.log(res);
    return res;
  }
  catch(err){
  console.error(err);
   return err;
  }

}

const Get = async (url)=>{
  try{
    const res= await axios.get(`http://localhost:5000/${url}`);
    console.log(res);
    return res;
  }
  catch(err){
    console.error(err );
     return err;
    }
}

//put
const Update= async(url, objToUpdate)=>
{
  let res;
  try{
    res= await axios.put(`http://localhost:5000/${url}`, 
    objToUpdate);
    console.log(res);
    return res;
  }
  catch(err){
  console.error(err);
   return res;
  }

}




export {Delete, Create,Get,Update}