import React, { useState, useEffect } from "react";
import "./HouseDetails.css";
import { NavLink, useHistory, useParams } from "react-router-dom";

import image from "../../../../Assets/Images/house.jpeg";
const HouseDetails = () => {
  const history = useHistory();
  const [contact, setContact] = useState([]);
  //retrieve house data from server
  const [getroomdata, setRoomData] = useState([]);
  console.log(getroomdata);
  //get id from url
  const { id } = useParams("");
  console.log(id);
  const RoomData = async () => {
    //jaba view ma click garchhau taba url ma hamro id aauxa
    //yo id lai get garna
    try {
      const res = await fetch(`/houseindividualdata/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (!data) {
        console.log("data not get");
      } else {
        setRoomData(data);

        console.log("get data");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    RoomData();
  }, []);

  //contact insert

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    // console.log(e.target.name);
    value = e.target.value;
    setContact({ ...contact, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, message } = contact;

    //................with the help of fetch api
    const res = await fetch("/contactpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        mobile: mobile,
        message: message,
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("contact failed");
      console.log("contact add failed");
    } else {
      window.alert("add contact details successful");
      console.log("contact add success");
      history.push("/housedetails");
    }
  };

  return (
    <>
      <div className="main_house_data_info">
        <div className="side_data">
          <div className="house_data_information">
            <h2>1 Bedroom 625 sq.ft room</h2>
            <h4>Rs 20000</h4>
            <h4>Deposit Amount</h4>

            <p>Priced 4% lower than the average prices in this locality</p>
            <ul>
              <li>1 Bedroom + Extra Room</li>
              <li>Semi - Furnishd</li>
              <li>1 Barhroom</li>
              <li>625 sq.ft (saleable Area)</li>
            </ul>

            <button>Contact Us</button>
            <h4>Contact No : 9851055721</h4>

            {/* for enquery form */}
            <div className="housedetails_form">
              <div className="inquery_form">
                <form method="POST">
                  <h2>Contact Form</h2>
                  <div className="input_data">
                    <div className="input">
                      Full Name{" "}
                      <input
                        type="text"
                        name="name"
                        value={contact.name}
                        onChange={handleInputs}
                        placeholder="FullName"
                        autoComplete="off"
                      />
                      Email :{" "}
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleInputs}
                        placeholder="Email"
                        autoComplete="off"
                      />
                      Mobile :{" "}
                      <input
                        type="mobile"
                        name="mobile"
                        value={contact.mobile}
                        onChange={handleInputs}
                        placeholder="Mobile"
                        autoComplete="off"
                      />
                    </div>

                    <div className="input">
                      Message :{" "}
                      <textarea
                        name="message"
                        onChange={handleInputs}
                        value={contact.message}
                        placeholder="Write message..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="input">
                    <input
                      type="submit"
                      name="submit"
                      value="Submit"
                      onClick={PostData}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="housedetails_container">
          <div className="housedetails_main">
            <div className="housedetails_cards">
              <div className="housedetails_card">
                <div className="housedetails_image">
                  <img
                    src={`http://localhost:5000/images/${getroomdata.roomImage}`}
                    width="90px"
                    height="50px"
                    alt={getroomdata.roomImage}
                  />
                </div>
                <div className="table_data">
                  {JSON.parse(localStorage.getItem("userdata")) ? (
                    <button>
                      <NavLink to="/booking">Book Now</NavLink>
                    </button>
                  ) : (
                    history.push("/login")
                  )}

                  {/* <button><NavLink to="/booking">Book Now</NavLink></button> */}
                  <h1>Property Infromation</h1>
                  <table>
                    <thead>
                      <tr>
                        <td>House Name</td>
                        <td>Type</td>
                        <td>Price</td>
                        <td>Location</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getroomdata.roomname}</td>
                        <td>{getroomdata.category}</td>
                        <td>{getroomdata.price}</td>
                        <td>{getroomdata.address}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="features_data">
                    <h4>Features</h4>
                    <ul>
                      <li>{getroomdata.features}</li>
                      {/* <li>House has 6 room with 2 bathroom under 2 tala</li>
                      <li>Garden area</li>
                      <li>Water alailable</li>
                      <li>Parking Space for bike and car</li>
                      <li>Suitable for Business and Office</li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseDetails;
