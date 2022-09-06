import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Booking.css';
const Booking = () => {

  const history = useHistory();

  const [booking, setBooking] = useState([]);

  let name, value;
  // here e is ek mera form hai
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    // console.log(e.target.name);
    value = e.target.value;
    setBooking({ ...booking, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, paymentMethod, amount, id, remarks } = booking;

    //................with the help of fetch api
    const res = await fetch("/bookingpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, paymentMethod, amount, id, remarks 
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("booking add failed");
      console.log("booking add failed");
    } else {
      window.alert("add booking details successful");
      console.log("booking add success");
      // history.push("/booking");
      window.location.reload();
    }
  };

  // selecting data from the server

  const [bookingList, setBookingList] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userbookingPage = async () => {
    try {
      const res = await fetch("/bookingdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setBookingList(data);

      //jab mujhe data milda hai teti bela true kardunga
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userbookingPage();
  }, []);

  // for updating booking

  const updatebooking = async (id) => {
    const newName = prompt("Enter a New booking Name");

    const res = await fetch("/bookingupdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: newName,
        id: id,
      }),
    });

    res.json();
    setBooking(
      booking.map((val, key) => {
        return val._id === id ? { _id: id, name: newName } : val;
      })
    );
  };

  const deletebooking = async (id) => {
    const res = await fetch(`/bookingdelete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.json();
    // filter doest it you can filter through every element and you determine
    //which ones should stay and which shouldnot
    setBooking(
      booking.filter((val) => {
        // funciton will be rturn boolean

        //it going to keep only the elements in the list which dont
        //satisfy this condition which means its going to keep
        //everything but going to set the list equal to temporarly list
        return val._id !== id;
      })
    );
    //
  };

  // step for search
  // ................... searching

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filtered = !search
    ? bookingList
    : bookingList.filter((val) => {
        return val.name.toLowerCase().includes(search.toLowerCase());
      });

  return (
    <>
      <div className="container">
        <div className="main">
          <div className="form">
            <form method="POST">
              Name:{" "}
              <input
                type="text"
                name="name"
                value={booking.name}
                onChange={handleInputs}
                placeholder="Enter your Name"
              />
              <br />
              Payment Method:{" "}
              <input
                type="text"
                name="paymentMethod"
                value={booking.paymentMethod}
                onChange={handleInputs}
                placeholder="Enter your Name"
              />
              <br />
              Amount:{" "}
              <input
                type="number"
                name="amount"
                value={booking.amount}
                onChange={handleInputs}
                placeholder="Enter your Name"
              />
              <br/>
               Id No :{" "}
              <input
                type="text"
                name="id"
                value={booking.id}
                onChange={handleInputs}
                placeholder="Enter your Name"
              />
              <br/>

            Remarks :{" "}
              <textarea
                type="text"
                name="remarks"
                value={booking.remarks}
                onChange={handleInputs}
                placeholder="Enter your Name"
              ></textarea>
              <br />
              <div className="submit_group">
                <input
                  type="submit"
                  name="submit"
                  value="Add"
                  onClick={PostData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
