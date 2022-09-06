import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const Logout = () => {

    const history = useHistory();
    // const admindata = JSON.parse(localStorage.getItem(admindata));
    useEffect(()=>{
    localStorage.removeItem('userdata');
    localStorage.clear();
    //for redirect;
    history.push('/',{replace:true});
    window.location.reload();
    },[]);
    

    //promises ke through


    // const history = useHistory();
    // useEffect(()=>{
    //     fetch('/logout',{
    //         method:"GET",
    //         headers:{
    //             Accept:"application/json",
    //             "Content-Type":"application/json"

    //         },
    //         credentials:"include"

    //     }).then((res)=>{
            
    //         // response proper milgayo toh main simply jawunga
    //         //loginpage ma

    //         history.push('/login');

    //         if(res.status !==200){
    //             const error = new Error(res.error);
    //             throw error;
    //         }
            


    //     }).catch((err)=>{
    //         console.log(err);
    //     });
    // });

  return (
    <>
        <h1>Logout page</h1>
    </>
  )
}

export default Logout
