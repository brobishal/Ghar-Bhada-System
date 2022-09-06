import React, {useState, useEffect} from 'react';

const Maintenance = () =>{

    
  //....................select from the server

  const [houseownerlist, setHouseOwnerList] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userrenterPage = async() =>{
    try{
        const res = await fetch('/houseownerdata',{
            method:"GET",
            headers:{
                "Content-Type" :"application/json"
            },
        });

        const data = await res.json();
        console.log(data);
        setHouseOwnerList(data);
    //jab mujhe data milda hai teti bela true kardunga
    }catch(err){
        console.log(err);
       }}

useEffect(()=>{
  userrenterPage();
},[]);

    return(
        <>
            <h1>Maintenance Report</h1>
                
                
        </>

    )
}

export default Maintenance;