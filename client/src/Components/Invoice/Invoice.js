import React ,{useState, useEffect} from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import './Invoice.css';
const Invoice = () =>{
  const history = useHistory();
  const [invoice, setInvoice] = useState({
    invoiceId:"", date:"", renter:"",amount:"", status:""
 });

  let name, value;
  // here e is ek mera form hai
  const handleInputs = (e) =>{
    console.log(e);
    name=e.target.name; 
    value = e.target.value;
    setInvoice({...invoice, [name]:value}); 
  }
   
  const PostData = async (e) =>{
    e.preventDefault();  
    const {invoiceId, date, renter, amount, electricity, water, garbage, status} = invoice;
    //................with the help of fetch api
    const res = await fetch("/invoicepage",{
      method:"POST",
      headers: { 
        "Content-Type":"application/json", 
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        invoiceId, date, renter, amount, electricity, water, garbage, status     
     })
    });

    const data = await res.json(); 
    if(res.status === 422 || !data){
      window.alert("invoice add failed"); 
    }else{
      window.alert("invoice add successfully"); 
      history.push("/invoice");
    }

  }

  //....................select from the server
  
  const [invoiceList, setInvoiceList] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userinvoicePage = async() =>{
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
       }}

useEffect(()=>{
  userinvoicePage();
},[]);

//delete
const deleteinvoice = async(id) =>{
  const res = await fetch(`/invoicedelete/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type" :"application/json"
    }
  });

  res.json(); 
// filter doest it you can filter through every element and you determine
//which ones should stay and which shouldnot
// setinvoice(invoice.filter((val)=>{
//   // return val._id !==id
// }));
}

// ................... searching
const [search, setSearch] = useState("");
const handleSearchChange = (e) =>{
    setSearch(e.target.value);
}
const filtered = !search ? invoiceList : invoiceList.filter((val)=>{
  return val.name.toLowerCase().includes(search.toLowerCase())

});


// select 
  //....................select from the server

  const [renterList, setRenterList] = useState([]);
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
    }catch(err){
        console.log(err);
       }}

useEffect(()=>{
  userrenterPage();
},[]);


    return(
        <>
            <div className="invoice_container">
                <div className="invoice_main">
                
                    <div className="invoice_form">
                    <h4>Invoice</h4> 
                        <form method="POST">
                            invoice No: <input type="number" name="invoiceId"
                            value={invoice.invoiceId}
                            onChange={handleInputs}
                            placeholder="Invoice" required/><br/>

                            Date : <input type="date" name="date"
                            value={invoice.date}
                            onChange={handleInputs}
                             placeholder="Enter Date" required/><br/>

                         Renter : 
                    <select name="renter"  value={invoice.renter}
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

                            Monthly Rent : <input type="number" name="amount"
                            value={invoice.amount}
                            onChange={handleInputs}
                             placeholder="Enter Amount" required/><br/>

                             Electricity : 
                             <input type="number" name="electricity"
                            value={invoice.electricity}
                            onChange={handleInputs}
                             placeholder="Enter Amount" required/><br/>
                             water :
                             <input type="number" name="water"
                            value={invoice.water}
                            onChange={handleInputs}
                             placeholder="Enter Amount" required/><br/>
                             Garbage :
                             <input type="number" name="garbage"
                            value={invoice.garbage}
                            onChange={handleInputs}
                             placeholder="Enter Amount" required/><br/>

                            Status : 
                            <select ype="status" name="status"
                            value={invoice.status}
                            onChange={handleInputs}>
                                <option hidden> Choose Status</option>
                                <option>Unpaid</option>
                                <option>Paid</option>
                            </select>
                           <div className="submit_group">
                            <input type="submit" name="submit" value="Add" onClick={PostData} />
                            </div>
                        </form>


                    </div>
                    <div className="invoicelist">
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
                    <h2>List of invoice</h2>
                    <form method="GET">
                        <table>
                               <thead>
                                   <tr>
                                       <td>#</td>
                                       <td>Date</td>
                                       <td>Renter</td>
                                       <td>Monthly Rent</td>
                                      <td>Electricity Charges</td>
                                      <td>Water Charges</td>
                                      <td>Garbage</td>
                                       <td>Status</td>
                                       <td>Action</td>
                                   </tr>
                               </thead>
                               <tbody>
                               {filtered.map((val, key)=>{
                                 return <tr>
                                 <td>{val.invoiceId}</td>
                                 <td>{val.date}</td>
                                  <td>{val.amount}</td>
                                  <td>{val.electricity}</td>
                                  <td>{val.water}</td>
                                  <td>{val.garbage}</td>
                                  <td>{val.status}</td>

                                  <td>
                                  {/* status changed */}
                                  {val.status && String(val.status).includes("Paid")? (
                                      <p style={{color:"green"}}>{val.status}</p>
                                  ):(
                                    <p style={{color:"red"}}>{val.status}</p>

                                  )}
                                  </td>

                                  <NavLink to={`/invoicedetails/${val._id}`}>
                                  <button >View</button>
                                  </NavLink>
                                  <br/>
                                  <br/>
                                  <NavLink to={`/invoiceupdate/${val._id}`}>
                                    <button>
                                    Update
                                     </button>
                                  </NavLink> 

                                   <button
                                   onClick={()=>{
                                     deleteinvoice(val._id);
                                   }}
                                   >Delete</button>
                                 </tr>
                               })}  
                              
                               </tbody>
                        </table>
                        </form>

                    </div>
                </div>
                

            </div>
        </>
    )
}

export default Invoice;