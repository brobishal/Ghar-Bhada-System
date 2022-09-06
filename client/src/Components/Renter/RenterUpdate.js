import React ,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
const RenterUpdate = () =>{
      const history = useHistory()
  const [updaterenter, setUpdateRenter] = useState({
    name:"", email:"", address:"",phone:"", room:"",date:""
    });


  

    //select
  console.log(updaterenter); 

  //get id from url
  const {id} = useParams("");
  console.log(id);
 
  const RenterData = async() =>{
      //jaba view ma click garchhau taba url ma hamro id aauxa
      //yo id lai get garna
      try{
          const res = await fetch(`/renteruser/${id}`,{
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
            setUpdateRenter(data);

              console.log("get data");
          }
      //jab mujhe data milda hai teti bela true kardunga
      }catch(err){
          console.log(err);
         }
      }
  
      //    hamro yo details ko page open hunxa
      //tesai samaye auto call ho tesko lagi use effect

  useEffect(()=>{
      RenterData();
  },[]);


  // for insertion
  let name, value;
  // here e is ek mera form hai
  const handleInputs = (e) =>{
    console.log(e);
    name=e.target.name; 
    // console.log(e.target.name);
    value = e.target.value;
    setUpdateRenter({...updaterenter, [name]:value}); 
  }

//data post
  
const PostData = async (event) =>{
  event.preventDefault();  
  const {name, email, address, phone, room, date} = updaterenter;
  //................with the help of fetch api
  const res = await fetch("/renterpage",{
    method:"POST",
    headers: { 
      "Content-Type":"application/json", 
      'Accept': 'application/json'

    },
    body:JSON.stringify({
      name, email, address, phone, room, date
    })
  });

  const data = await res.json(); 
  if(res.status === 422 || !data){
    window.alert("renter update failed"); 
  }else{
    window.alert("renter update successfully"); 
    history.push("/renter");
  }

}

    return(
        <>
        <h1>Renter Update</h1>
             <div className="container">
                <div className="main">
                    <div className="form">
                    
                        <form method="POST">
                            Name: <input type="text" name="name"
                            value={updaterenter.name}
                            onChange={handleInputs}
                             placeholder="Owner Name" required/><br/>

                            Email : <input type="email" name="email"
                            value={updaterenter.email}
                            onChange={handleInputs}
                             placeholder="Enter Email" required/><br/>

                            Address : <input type="address" name="address"
                            value={updaterenter.address}
                            onChange={handleInputs}
                             placeholder="Type" required/><br/>

                            Phone : <input type="number" name="phone"
                            value={updaterenter.phone}
                            onChange={handleInputs}
                             placeholder="Type" required/><br/>

                            Room Name : <input type="room" name="room"
                            value={updaterenter.room}
                            onChange={handleInputs}
                             placeholder="Description" required/><br/>

                            Date : <input type="text" name="date"
                            value={updaterenter.date}
                            onChange={handleInputs}
                             placeholder="Description" required/><br/>
                           <div className="submit_group">
                            <input type="submit" name="submit" value="Update Rnter" onClick={PostData} />
                            </div>
                        </form>
                        </div>
                        </div>
                        </div>
        </>
    )
}

export default RenterUpdate;