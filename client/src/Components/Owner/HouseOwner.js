import React ,{useState, useEffect} from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import './HouseOwner.css';
const HouseOwner = () =>{
  const history = useHistory();
  const [houseowner, setHouseOwner] = useState({name:"", email:"", address:"",phone:""});
  let name, value;
  // here e is ek mera form hai
  const handleInputs = (e) =>{
    console.log(e);
    name=e.target.name; 
    // console.log(e.target.name);
    value = e.target.value;
    setHouseOwner({...houseowner, [name]:value}); 
  }
   
  const PostData = async (e) =>{
    e.preventDefault();  
    const {name, email, address, phone} = houseowner;
    //................with the help of fetch api
    const res = await fetch("/houseownerpage",{
      method:"POST",
      headers: { 
        "Content-Type":"application/json", 
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        name, email, address, phone
      })
    });
    const data = await res.json(); 
    if(res.status === 422 || !data){
      window.alert("house owner data add failed"); 
    }else{
      window.alert("house owner add successfully"); 
      history.push("/houseowner");
    }

  }

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

//delete
const deleteHouseOwner = async(id) =>{
  const res = await fetch(`/houseownerdelete/${id}`,{
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

const filtered = !search ? houseownerlist : houseownerlist.filter((val)=>{
  return val.name.toLowerCase().includes(search.toLowerCase())
});


    return(
        <>
            <div className="houseowner_container">
                <div className="houseowner_main">
                    <div className="houseowner_form">
                   
                        <form method="POST">
                            Name: <input type="name" name="name"
                            value={houseowner.name}
                            onChange={handleInputs}
                             placeholder="Owner Name" required/><br/>

                            Email : <input type="email" name="email"
                            value={houseowner.email}
                            onChange={handleInputs}
                             placeholder="Enter Email" required/><br/>

                            Address : <input type="address" name="address"
                            value={houseowner.address}
                            onChange={handleInputs}
                             placeholder="Type" required/><br/>

                            Phone : <input type="number" name="phone"
                            value={houseowner.phone}
                            onChange={handleInputs}
                             placeholder="Type" required/><br/>

                           <div className="submit_group">
                            <input type="submit" name="submit" value="Add" onClick={PostData} />
                            </div>
                        </form>


                    </div>
                    <div className="houseownerlist">
                       {/* search bar */}
                       <form>
                    <input type="search" 
                     name="search"
                     value={search}
                     onChange={handleSearchChange}
                      placeholder='search'/>
                    </form>

                    {/* closed search */}
                    <h2>List Of House Owner</h2>
                    <form method="GET">
                        <table>
                               <thead>
                                   <tr>
                                       <td>Name</td>
                                       <td>Email</td>
                                       <td>Address</td>
                                       <td>Phone</td>
                                       <td>Action</td>
                                   </tr>
                               </thead>
                               <tbody>
                               {filtered.map((val, key)=>{
                                 return <tr>
                                 <td>{val.name}</td>
                                 <td>{val.email}</td>
                                  <td>{val.address}</td>
                                  <td>{val.phone}</td>

                                  <br/>
                                  <NavLink to={`/houseownerupdate/${val._id}`} >
                                    <button  style={{color:"green"}}>
                                    Update
                                     </button>
                                  </NavLink> 

                                   <button
                                   onClick={()=>{
                                    deleteHouseOwner(val._id);
                                   }}
                                   style={{color:"red"}}
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

export default HouseOwner;