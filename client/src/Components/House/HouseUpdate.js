import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './House.css';
const HouseUpdate = () =>{
    const history = useHistory()

    const [updateroom, setUpdateRoom] = useState({
        name:"", type:"", price:"",address:"", description:"",
      });
      console.log(updateroom); 
  
    //get id from url
    const {id} = useParams("");
    console.log(id);
    const RoomData = async() =>{

        try{
            const res = await fetch(`/roomuser/${id}`,{
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
              setUpdateRoom(data);
  
                console.log("get data");
            }
        //jab mujhe data milda hai teti bela true kardunga
        }catch(err){
            console.log(err);
           }
        }  
    useEffect(()=>{
        RoomData();
    },[]);


    //for update data and insert
    let name, value;
    // here e is ek mera form hai
    const handleInputs = (e) =>{
      console.log(e);
      name=e.target.name; 
      // console.log(e.target.name);
      value = e.target.value;
      setUpdateRoom({...updateroom, [name]:value}); 
    }
     
    const PostData = async (e) =>{
      e.preventDefault();  
      const {name, type, price, address, description} = updateroom;


      //................with the help of fetch api
      const res = await fetch("/roompage",{
        method:"POST",
        headers: { 
          "Content-Type":"application/json", 
          'Accept': 'application/json' 
        },
        body:JSON.stringify({
            name, type, price, address, description
        })
      });
  
      const data = await res.json(); 
      if(res.status === 422 || !data){
        window.alert("room update failed"); 
      }else{
        window.alert("room update successful"); 
        history.push("/room");
      }
  
    }
    
    return(
        <>
            <div className="container">
                <div className="main">
                    <div className="form">
                    {/* for sendinf file we use enctype multipart/form-data */}
                        <form method="POST" enctype="multipart/form-data">
                            Room : <input type="text" name="name" 
                            value={updateroom.name}
                            onChange={handleInputs}
                            placeholder="room name"  autoComplete='off' required/><br/>

                            Type : <input type="text" name="type" 
                            value={updateroom.type}
                            onChange={handleInputs}
                            placeholder="Type"  autoComplete='off' required/><br/>

                            Price : <input type="number" name="price" 
                            value={updateroom.price}
                            onChange={handleInputs}
                            placeholder="Price"  autoComplete='off' required/>

                            address : <input type="text" name="address"    
                            value={updateroom.address}
                            onChange={handleInputs}
                            placeholder="address"  autoComplete='off' required/>

                       <br/>
                            description : <input type="text" name="description" 
                            value={updateroom.description}
                            onChange={handleInputs}
                            placeholder="Description"  autoComplete='off' required/><br/>
                            {/* image :<input  type="file"  name="image"
                            value={updateroom.image}
                            onChange={handleInputs}
                            /> <br/> */}

                           <div className="submit_group">
                            <input type="submit" name="submit" value="Add" onClick={PostData}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HouseUpdate;