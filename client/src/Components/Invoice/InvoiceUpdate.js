import React,{useState, useEffect} from'react';
import { useHistory, useParams } from 'react-router-dom';
import './Invoice.css';
const InvoiceUpdate = () =>{
    const history = useHistory();
    const [updateinvoice, setUpdateInvoice] = useState({invoiceId:"", date:"", renter:"", amount:"", status:"" , 
});
//get the data from payment database

    //get id from url
    const {id} = useParams("");
    console.log(id);
    const InvoiceData = async() =>{
        try{
            const res = await fetch(`/invoiceuser/${id}`,{
                method:"GET",
                headers:{
                    "Content-Type" :"application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            if(!data){
                console.log("data not get");
            }else{
                setUpdateInvoice(data);
                console.log("get data");
            }
        }catch(err){
            console.log(err);
           }
        }
    //   hamro yo details ko page open hunxa
        //tesai samaye auto call ho tesko lagi use effect
    useEffect(()=>{
        InvoiceData();
    },[]);


//payment data insert  
    let name, value;
    const handleInputs = (e) =>{
      console.log(e);
      name=e.target.name; 
      value = e.target.value;
      setUpdateInvoice({...updateinvoice, [name]:value}); 
    }
     
    const PostData = async (e) =>{
      e.preventDefault();  
      const {invoiceId, date, renter, amount, status} = updateinvoice;
      //................with the help of fetch api
      const res = await fetch("/invoicepage",{
        method:"POST",
        headers: { 
          "Content-Type":"application/json", 
          'Accept': 'application/json' 
        },
        body:JSON.stringify({
            invoiceId, date, renter, amount, status
        })
      });
  
      const data = await res.json(); 
      if(res.status === 422 || !data){
        window.alert("Invoice Update failed"); 
      }else{
        window.alert("Invoice update successfully"); 
        history.push("/invoice");
      }
  }

      
    return(
        <>
        <h1>Invoice Update</h1>
            <div className="container">
                <div className="main">
                    <div className="form">
                    <h4>Invoice</h4>
                        <form method="POST">   
                            invoiceId: <input type="text" name="invoiceId" 
                            value={updateinvoice.invoiceId}
                            onChange={handleInputs}
                            placeholder="Owner Name"/><br/> 

                            Date: <input type="text" name="date" 
                            value={updateinvoice.date}
                            onChange={handleInputs}
                            placeholder="Owner Name"/><br/>
                            
                            Renter:
                             <input type="renter" name="renter" 
                             value={updateinvoice.renter}
                             onChange={handleInputs}
                             placeholder=" Enter Name"/><br/>
                            Amount: <input type="number" name="amount" 
                            value={updateinvoice.amount}
                            onChange={handleInputs}
                            placeholder="your payment"/><br/>
                            
                            Status: <input type="text" name="status" 
                            value={updateinvoice.price}
                            onChange={handleInputs}
                            placeholder="your payment"/><br/>
                            
                           <div className="submit_group">
                            <input type="submit" name="submit" value="Update Payment" onClick={PostData}/>
                            <input type="submit" name="submit" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
                

            </div>
        </>
    )
}


export default InvoiceUpdate;