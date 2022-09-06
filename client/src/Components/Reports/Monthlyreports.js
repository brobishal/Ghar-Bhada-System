import React, {useState,useEffect} from 'react';
import './Monthlyreports.css';
const Monthlyreports = () =>{


    useEffect(()=>{
        roomPage();
        userrenterPage();
        roomDataPage();
        userPaymentPage();
        userInvoicePage();
    
    
    
        },[]);
    


    //select data from server
    // const [rooms, setRooms] = useState([{

    // }]);

//     const [monthlyreport, setmonthlyreport] = useState([{
//         name:"",
//         output:[{
//             name:"",
//             type:"",
//             price:"",
//             address:"",
//             description:""

//         }]

        
//     }]);
//   const userHomePage = () =>{
//         const res= fetch('/monthlyreportsdata',{
//             method:"GET",
//             headers:{
//                 "Content-Type" :"application/json"
//             }
//         }).then(res => {
//             if(res.ok){
//             return res.json()}
//         })
//         .then(jsondata => setmonthlyreport(jsondata));
// }

// useEffect(()=>{
//     userHomePage();
// },[]);


// select 
// getting the data of renter, house, invoice, payment 

const [roomlist, setRoomList] = useState([]);

//react ma sab kuch state nai hai
// suruma first time faalse hunxa
const roomPage = async() =>{
  try{
      const res = await fetch('/roomdata',{
          method:"GET",
          headers:{
              "Content-Type" :"application/json"
          },
      });

      const data = await res.json();
      console.log(data);
      setRoomList(data);
  //jab mujhe data milda hai teti bela true kardunga
  }catch(err){
      console.log(err);
     }}
     



// renter fecth
const [renterList, setRenterList] = useState([]);

//react ma sab kuch state nai hai
// suruma first time faalse hunxa
const userrenterPage = async() =>{
  try{
      const res = await fetch('/renterdata',{
          method:"GET",
          headers:{
              "Content-Type" :"application/json"
          },
      });

      const data = await res.json();
      console.log(data);
      setRenterList(data);
  //jab mujhe data milda hai teti bela true kardunga
  }catch(err){
      console.log(err);
     }}


// invoice

const [invoiceList, setInvoiceList] = useState([]);

//react ma sab kuch state nai hai
// suruma first time faalse hunxa
const userInvoicePage = async() =>{
  try{
      const res = await fetch('/invoicedata',{
          method:"GET",
          headers:{
              "Content-Type" :"application/json"
          },
      });
      const data = await res.json();
      console.log(data);
      setInvoiceList(data);
  //jab mujhe data milda hai teti bela true kardunga
  }catch(err){
      console.log(err);

  }

}


//payment

// select 
  //....................select from the server
        // selecting data from the server

        const [paymentList, setPaymentList] = useState([]);

        //react ma sab kuch state nai hai
        // suruma first time faalse hunxa
        const userPaymentPage = async() =>{
          try{
              const res = await fetch('/paymentdata',{
                  method:"GET",
                  headers:{
                      "Content-Type" :"application/json"
                  },
              });
              const data = await res.json();
              console.log(data);
              setPaymentList(data);
          //jab mujhe data milda hai teti bela true kardunga
          }catch(err){
              console.log(err);
      
          }
      
      }
      

  // getting the house owner

  //....................select from the server
  const [houseownerlist, setHouseOwnerList] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const roomDataPage = async () => {
    try {
      const res = await fetch("/houseownerdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setHouseOwnerList(data);
      //jab mujhe data milda hai teti bela true kardunga
    } catch (err) {
      console.log(err);
    }
  };

  



    return(
        <>
            <h1>Heelo Monthly reports</h1>
            <div className="monthly_reports_list">
            <div className="monthly_data">
                    <h2>List Of Rooms</h2>
                      <form method="GET">
                        <table>
                               <thead>
                                   <tr>
                                       <td>Registation Date of Renter</td>
                                       <td>Renter</td>
                                       <td>Renter address</td>
                                       <td>House Name</td>
                                       <td>Invoice</td>
                                       <td>Amount</td>
                                       <td>Invoice</td>
                                       <td></td>
                                       <td></td>
                                       
                                   </tr>
                               </thead>
                               <tbody>
                               <tr>
                               {renterList.map((renter)=>{
                                   return(
                                        <>
                                        <td>{renter.name}</td>
                                        <td>{renter.address}</td>
                                        </>
                                   )
                                    
                                   
                               })}

                               {roomlist.map((room)=>{
                                return(
                                    <>
                                    <tr></tr>
                                        <td>{room.roomname}</td>
                                        <td>.Rs.{room.price}</td>
                                    </>
                                )
                               })}

                                {invoiceList.map((invoice)=>{
                                return(
                                    <>
                                        <td>{invoice.invoiceId}</td>
                                    </>
                                )
                                

                               })}
                               </tr>

                               {/* {monthlyreport.map((category)=>{
                                         return(<tr>
                                         <td>{category.name}</td>
                                         {category.output.map((room)=>{
                                             return(<td>{room.price}</td>)
                                         })} */}
                                          
                                         {/* <button
                                    onClick={()=>{
                                     updateRoom(val._id);
                                   }}
                                   >Update</button>

                                   <button
                                   onClick={()=>{
                                     deleteRoom(val._id);
                                   }}
                                   >Delete</button> */}

                                         {/* </tr>
                                         )
                                         
                                        
                                       })} */}

                                    {/* {monthlyreport.map((val)=>{
                                        return(
                                            <tr>
                                                <td>{val.date}</td>
                                                <td>{val.name}</td>
                                                <td>{val.room}</td>

                                                
                                            </tr>
                                        )
                                    })} */}
                                   <tr></tr>

                                  
                               </tbody>
                        </table>
                        
                  </form>
                    </div>
                    </div>
        </>
    )
    
}

export default Monthlyreports;