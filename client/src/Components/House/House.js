import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./House.css";
const Room = () => {
  // const {name, type, price, address, description, image} = room;
  const[roomno, setRoomNo] = useState();
  const [roomname, setRoomName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [houseowner, setHouseOwner] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState("");

  // state for our file image upload
  const [fileName, setFileName] = useState("");
  const history = useHistory();
  // const [room, setRoom] = useState({
  //   name:"",type:"", price:"", address:"", description :""
  // });
  //for create room
  const [room, setRoom] = useState([]);
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const changeOnClick = async (e) => {
    e.preventDefault();
    // single page aaplicaion we need ajax
    // const formdata = new FormData();
    // formdata.append('image', room)

    const formData = new FormData();
    formData.append("roomno", roomno);
    formData.append("roomname", roomname);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("houseowner", houseowner);
    formData.append("features", features);
    formData.append("status", status);
    formData.append("file", fileName);
    // formData.append("occupation", occupation);

    // const {name, type, price, address, description, image} = room;
    console.log({ formData });
    //................with the help of fetch api
    const res = await fetch("/roompage", {
      method: "POST",
      body: formData,

      // })
    });
    console.log("hellp");
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert("room details add failed");
      console.log("room details add failed");
    } else {
      window.alert("add room details successful");
      console.log("add room details successful");
      history.push("/room");
      window.location.reload();
    }
  };

  //server bata hamile lyayera useState ma rakhkne ani paxi client ma
  //dekhaune
  //retrive data from server
  const [roomList, setRoomList] = useState([]);
  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userHomePage = async () => {
    try {
      const res = await fetch("/roomdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setRoomList(data);

      //jab mujhe data milda hai teti bela true kardunga
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  // delete room

  const deleteRoom = async (id) => {
    const res = await fetch(`/roomdelete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.json();

    setRoom(
      room.filter((val) => {
        return val._id !== id;
      })
    );
    //
  };

  // getting the house owner

  //....................select from the server
  const [houseownerlist, setHouseOwnerList] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userrenterPage = async () => {
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

  useEffect(() => {
    userrenterPage();
  }, []);


      // selecting data from the server

      const [categoryList, setCategoryList] = useState([]);

      //react ma sab kuch state nai hai
      // suruma first time faalse hunxa
      const userCategoryPage = async() =>{
        try{
            const res = await fetch('/categorydata',{
                method:"GET",
                headers:{
                    "Content-Type" :"application/json"
                },
            });
    
            const data = await res.json();
            console.log(data);
            setCategoryList(data);
    
            
    
            //jab mujhe data milda hai teti bela true kardunga
        }catch(err){
            console.log(err);
    
        }
    
    }
    
    useEffect(()=>{
      userCategoryPage();
    },[]);

  return (
    <>
      <div className="container">
        <div className="main">
          <div className="form">
            {/* for sendinf file we use enctype multipart/form-data */}
            <form onSubmit={changeOnClick} enctype="multipart/form-data">
            House Number :
              <input
                type="number"
                name="roomno"
                value={roomno}
                onChange={(e) => setRoomNo(e.target.value)}
                placeholder="House No : "
                autoComplete="off"
                required
              />
              <br/>
              House Name :
              <input
                type="text"
                name="roomname"
                value={roomname}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="House name"
                autoComplete="off"
                required
              />
              <br />
              category :
              <select 
              type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                autoComplete="off">
               {categoryList.map((val)=>{

                return(
                  <option>{val.name}</option>
                )

               })}
                

              </select>
      
              <br />
              Price :
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Rs"
                autoComplete="off"
                required
              />
              address :
              <input
                type="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="address"
                autoComplete="off"
                required
              />
             
             
             House Owner :
              <select 
              type="owner"
                name="houseowner"
                value={houseowner}
                onChange={(e) => setHouseOwner(e.target.value)}
                autoComplete="off"
                placeholder="House Owner">
                <option>select</option>
               {houseownerlist.map((val)=>{

                return(
                  <option>{val.name}</option>
                )

               })}
              </select>
              <br />
           
              Features :
              <textarea
                rows="5"
                cols="30"
                type="text"
                name="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="
                Land area :
                Kitchen Room :
                No of bathroom : 
                No of Room :
                No of Parking :
                Total Floor Count :
                Water service : 
                "
                autoComplete="off"
                required
              ></textarea>
              Status :
              <select
                type="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                autoComplete="off"
                placeholder="status"
              >
                <option hidden>Choose</option>
                <option>Unsold</option>
                <option>Sold</option>
              </select>
              <br />
              roomImage :
              <input type="file" name="file" onChange={onChangeFile} />
              <br />
              <div className="submit_group">
                <input type="submit" name="submit" value="Add" />
              </div>
            </form>
          </div>

          <div className="houselist">
            {/* search bar */}
            <form>
              <input
                type="search"
                name="search"
                value=""
                onChange=""
                placeholder="search"
              />

              <input type="submit" name="submit" value="search" />
            </form>

            {/* closed search */}
            <h2>List Of house</h2>
            <form method="GET">
              <table>
                <thead>
                  <tr>
                    <td>No </td>
                    <td>Name</td>
                    <td>Category</td>
                    <td>Price</td>
                    <td>Address</td>
                    <td>Owner</td>
                    <td>Status</td>
                    <td>Features</td>
                    <td>Images</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>

                  {roomList.map((room, key) => {
                    return (
                      <tr>
                        <td>{room.roomno}</td>
                        <td>{room.roomname}</td>
                        <td>{room.category}</td>
                        <td>{room.price}</td>
                        <td>{room.address}</td>
                        <td>{room.houseowner}</td>
                        <td>
                          {/* status changed */}
                          {room.status && String(room.status).includes("Sold") ? (
                            <p style={{ color: "green" }}>{room.status}</p>
                          ) : (
                            <p style={{ color: "red" }}>{room.status}</p>
                          )}
                          </td>
                        <td>{room.features}</td>
                       
                        <td>
                          <img
                            src={`http://localhost:5000/images/${room.roomImage}`}
                            alt={room.roomImage}
                            width="90px"
                            height="50px"
                          />
                        </td>

                        <div className="buttons_group">
                        <NavLink to={`/roomupdate/${room._id}`}>
                          <button  style={{color:"green"}}>Update</button>
                        </NavLink>
                        <br />
                        <NavLink to={`/roomdetails/${room._id}`}>
                          <button  style={{color:"blue"}}>View</button>
                        </NavLink>
                        <br />
                        <button
                          onClick={() => {
                            deleteRoom(room._id);
                          }}
                          style={{color:"red"}}>Delete
                        </button>
                        </div>
                      </tr>
                    );
                  })}

                  <tr></tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
