import React, {useEffect}from 'react';
import {useHistory} from 'react-router-dom';

const AdminLogout = () =>{

    const history = useHistory();
    // const admindata = JSON.parse(localStorage.getItem(admindata));
    useEffect(()=>{
    localStorage.removeItem('admindata');
    localStorage.clear();
    //for redirect;
    history.push('/',{replace:true});
    window.location.reload();
    },[]);


    
    return(

        <>
            <h1>Admin Logout</h1>
        </>
    )

}

export default AdminLogout;