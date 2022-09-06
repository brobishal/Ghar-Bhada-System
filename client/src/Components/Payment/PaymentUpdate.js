import React,{useState, useEffect} from'react';
import { useHistory, useParams } from 'react-router-dom';
import './payment.css';
const PaymentUpdate = () =>{
    const history = useHistory();
    const [updatepayment, setUpdatePayment] = useState({date:"", invoice:"", renter:"", price:"", });
//get the data from payment database

    //get id from url
    const {id} = useParams("");
    console.log(id);
    const PaymentData = async() =>{
        try{
            const res = await fetch(`/paymentuser/${id}`,{
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
                setUpdatePayment(data);
                console.log("get data");
            }
        }catch(err){
            console.log(err);
           }
        }
    //   hamro yo details ko page open hunxa
        //tesai samaye auto call ho tesko lagi use effect
    useEffect(()=>{
        PaymentData();
    },[]);


//payment data insert  
    let name, value;
    const handleInputs = (e) =>{
      console.log(e);
      name=e.target.name; 
      value = e.target.value;
      setUpdatePayment({...updatepayment, [name]:value}); 
    }
     
    const PostData = async (e) =>{
      e.preventDefault();  
      const {date, invoice, renter, price} = updatepayment;
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
        window.alert("Payment Update failed"); 
      }else{
        window.alert("payment update successfully"); 
        history.push("/payment");
      }
  }

      
    return(
        <>
        <h1>Payment Update</h1>
            <div className="container">
                <div className="main">
                    <div className="form">
                    <h4>Payment</h4>
                        <form method="POST">   
                            Date: <input type="text" name="date" 
                            value={updatepayment.date}
                            onChange={handleInputs}
                            placeholder="Owner Name"/><br/> 

                            Invoice: <input type="text" name="invoice" 
                            value={updatepayment.invoice}
                            onChange={handleInputs}
                            placeholder="Owner Name"/><br/>
                            
                            Renter:
                            <input type="search" name="User"/><br/>
                             <input type="text" name="renter" 
                             value={updatepayment.renter}
                             onChange={handleInputs}
                             placeholder=" Enter Name"/><br/>
                            Price: <input type="text" name="price" 
                            value={updatepayment.price}
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


export default PaymentUpdate;