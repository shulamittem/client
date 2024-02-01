import useAxios from 'axios-hooks';
import React, { useState, useEffect } from 'react';

 const GetHook = (url) => {

  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:5000/${url}`
  )
  useEffect(() => { console.log(error) }, [error])
  return { data, loading, error, refetch }
  
}
///???????????????????
// const GetHook2 = (url,obj) => {
// console.log(obj)
//   const [{ data, loading, error }, refetch] = useAxios({
//       url: `http://localhost:5000/${url}`,
//       data:obj,
//       method:'get'
//   }
//   )
//   useEffect(() => { console.log(error) }, [error])
//   return { data, loading, error, refetch }
  
// }

// const PostHook = (url, body={}) => {

//   const [{ data, loading, error }, refetch]= useAxios(
//       {
//           url:url,
//           method:'post',
//           data:body
//       }
//   );
//   if(error)
//       console.log(error);
//   return { data, loading, error, refetch };

// };

export {GetHook}