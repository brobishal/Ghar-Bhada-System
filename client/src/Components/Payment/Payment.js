import React,{useState, useEffect} from'react';
import { NavLink, useHistory } from 'react-router-dom';
import './payment.css';
const Payment = () =>{

    const history = useHistory();
    const [payment, setPayment] = useState({date:"", invoice:"", renter:"", price:"", });
  
    let name, value;
    // here e is ek mera form hai
    const handleInputs = (e) =>{
      console.log(e);
      name=e.target.name; 
      // console.log(e.target.name);
      value = e.target.value;
      setPayment({...payment, [name]:value}); 
    }
     
    const PostData = async (e) =>{
      e.preventDefault();  
      const {date, invoice, renter, price} = payment;
      //................with the help of fetch api
      const res = await fetch("/paymentpage",{
        method:"POST",
        headers: { 
          "Content-Type":"application/json", 
          'Accept': 'application/json' 
        },
        body:JSON.stringify({
            date, invoice, renter, price
        })
      });
  
      const data = await res.json(); 
      if(res.status === 422 || !data){
        window.alert("Payment add failed"); 
      }else{
        window.alert("payment add successfully"); 
        history.push("/payment");
      }
  
    }


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
      
      useEffect(()=>{
        userPaymentPage();
      },[]);


      
//updating payment

const updatePayment = async(id) =>{
    const newName = prompt("Enter a New Category Name");
  
    const res = await fetch('/paymentupdate',{
      method:"PUT",
      headers:{
        "Content-Type" :"application/json"
      },
      body:JSON.stringify({
        newName:newName,
        id:id 
      })
  
  
    })
  
     res.json();
    setPayment(payment.map((val, key)=>{
      return val._id ===id ? {_id:id, name:newName} : val;
    }))
  }
  
  // delete payment
  
  const deletePayment = async(id) =>{
    const res = await fetch(`/paymentdelete/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type" :"application/json"
      }
    });
  
    res.json(); 
  setPayment(payment.filter((val)=>{
    return val._id !==id
  }));
  //
  
  
  }


  //retrived data of renter 

  
  //....................select from the server
  
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

useEffect(()=>{
  userrenterPage();
},[]);



  // searching

  const [search, setSearch] = useState("");

  const handleSearchChange= (e) =>{
    setSearch(e.target.value);

  }
//The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.

  const filtered = !search ? paymentList : paymentList.filter((val)=>{
    return val.renter.toLowerCase().includes(search.toLowerCase())
  })
      
    return(
        <>
            <div className="payment_container">
                <div className="payment_main">
                    <div className="payment_form">
                    <h4>Payment</h4>
                        <form method="POST">   
                            Date: <input type="date" name="date" 
                            value={payment.date}
                            onChange={handleInputs}
                            placeholder="Owner Name"/><br/> 

                            Invoice: <input type="text" name="invoice" 
                            value={payment.invoice}
                            onChange={handleInputs}
                            placeholder="Owner Name"/><br/>
                            
                            Renter:
                             {/* <input type="text" name="renter" 
                             value={payment.renter}
                             onChange={handleInputs}
                             placeholder=" Enter Name"/><br/> */}
                             <select name="renter"  value={payment.renter}
                             onChange={handleInputs}>
                                <option hidden="true">Enter the name</option>
                               {renterList.map((val)=>{
                                    return(
                                      <>
                                      <option>{val.name}</option>
                                      </>
                                    )
                                })}
                            
                             </select>
                             <br/>
                            Price: <input type="text" name="price" 
                            value={payment.price}
                            onChange={handleInputs}
                            placeholder="your payment"/><br/>
                            
                           <div className="submit_group">
                            <input type="submit" name="submit" value="Add" onClick={PostData}/>
                            {/* <input type="submit" name="submit" value="Cancel" /> */}
                            </div>
                        </form>


                    </div>
                    
                    <div className="paymentlist">

                    {/* search bar */}
                    <form>
                    <input type="search" 
                     name="search"
                     value={search}
                     onChange={handleSearchChange}
                      placeholder='search'/>

                      <input type="submit" name="submit" value="search"/>
                    </form>

                    {/* closed search */}
                    <h2>List Of Payment</h2>

                        <table>
                               <thead>
                                   <tr>
                                        <td>Date</td>
                                       <td>Invoice</td>
                                       <td>Renter</td>
                                       <td>Price</td>

                                   </tr>
                               </thead>
                               <tbody>
                                {filtered.map((val, key)=>{
                                    return<tr>
                                        <td>{val.date}</td>
                                        <td>{val.invoice}</td>
                                        <td>{val.renter}</td>  
                                        <NavLink to={`/paymentupdate/${val._id}`}>
                                        <button>Update</button>
                                        </NavLink>
                                        <button
                                        onClick={()=>{
                                            deletePayment(val._id);
                                        }}
                                        >Delete</button>
                                                <td>{val.price}</td>


                                    </tr>
                                })}
                                  
                               </tbody>
                        </table>
                        

                    </div>
                </div>
                

            </div>
        </>
    )
}

export default Payment;