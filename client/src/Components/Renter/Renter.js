import React ,{useState, useEffect} from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import './renter.css';
const Renter = () =>{
  const history = useHistory();
  const [renter, setRenter] = useState({name:"", email:"", address:"",phone:"", room:"",date:"" });

  let name, value;
  // here e is ek mera form hai
  const handleInputs = (e) =>{
    console.log(e);
    name=e.target.name; 
    // console.log(e.target.name);
    value = e.target.value;
    setRenter({...renter, [name]:value}); 
  }
   
  const PostData = async (e) =>{
    e.preventDefault();  
    const {name, email, address, phone, room, date} = renter;
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
      window.alert("renter add failed"); 
    }else{
      window.alert("renter add successfully"); 
      history.push("/renter");
    }

  }

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

//delete
const deleteRenter = async(id) =>{
  const res = await fetch(`/renterdelete/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type" :"application/json"
    }
  });

  res.json(); 
// filter doest it you can filter through every element and you determine
//which ones should stay and which shouldnot
// setRenter(renter.filter((val)=>{
//   // return val._id !==id
// }));
}

// ................... searching

const [search, setSearch] = useState("");

const handleSearchChange = (e) =>{
    setSearch(e.target.value);
}

const filtered = !search ? renterList : renterList.filter((val)=>{
  return val.name.toLowerCase().includes(search.toLowerCase())
});


    return(
        <>
            <div className="renter_container">
                <div className="renter_main">
                    <div className="renter_form">
                   
                        <form method="POST">
                            Name: <input type="text" name="name"
                            value={renter.name}
                            onChange={handleInputs}
                             placeholder="Owner Name" required/><br/>

                            Email : <input type="email" name="email"
                            value={renter.email}
                            onChange={handleInputs}
                             placeholder="Enter Email" required/><br/>

                            Address : <input type="address" name="address"
                            value={renter.address}
                            onChange={handleInputs}
                             placeholder="Type" required/><br/>

                            Phone : <input type="number" name="phone"
                            value={renter.phone}
                            onChange={handleInputs}
                             placeholder="Type" required/><br/>

                            Room Name : <input type="room" name="room"
                            value={renter.room}
                            onChange={handleInputs}
                             placeholder="Description" required/><br/>

                            Date : <input type="date" name="date"
                            value={renter.date}
                            onChange={handleInputs}
                             placeholder="Description" required/><br/>
                           <div className="submit_group">
                            <input type="submit" name="submit" value="Add" onClick={PostData} />
                            <input type="submit" name="submit" value="Cancel" />
                            </div>
                        </form>


                    </div>
                    <div className="renterlist">
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
                    <h2>List of Renter</h2>
                    <form method="GET">
                        <table>
                               <thead>
                                   <tr>
                                       <td>Name</td>
                                       <td>Email</td>
                                       <td>Address</td>
                                       <td>Room</td>
                                       <td>Date</td>
                                       <td>Action</td>
                                   </tr>
                               </thead>
                               <tbody>
                               {filtered.map((val, key)=>{
                                 return <tr>
                                 <td>{val.name}</td>
                                 <td>{val.email}</td>
                                  <td>{val.address}</td>
                                  <td>{val.room}</td>
                                  <td>{val.date}</td>
                                  <NavLink to={`/renterdetails/${val._id}`}>
                                  <button
                                   style={{color:"blue"}} >View</button>
                                  </NavLink>
                                  <br/>
                                  <br/>
                                  <NavLink to={`/renterupdate/${val._id}`}>
                                    <button  style={{color:"green"}}>
                                    Update
                                     </button>
                                  </NavLink> 

                                   <button
                                   onClick={()=>{
                                     deleteRenter(val._id);
                                   }}
                                   
                                   style={{color:"red"}}>Delete</button>
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

export default Renter;