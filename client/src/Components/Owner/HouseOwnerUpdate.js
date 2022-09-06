import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import HouseOwner from "./HouseOwner";
import "./payment.css";
const HouseOwnerUpdate = () => {
  const history = useHistory();
  const [updatehouseowner, setUpdateHouseOwner] = useState({
    date: "",
    invoice: "",
    renter: "",
    price: "",
  });
  //get the data from payment database

  //get id from url
  const { id } = useParams("");
  console.log(id);
  const HouseOwnerUpdate = async () => {
    try {
      const res = await fetch(`/houseownerupdate/${id}`, {
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
        setUpdateHouseOwner(data);
        console.log("get data");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   hamro yo details ko page open hunxa
  //tesai samaye auto call ho tesko lagi use effect
  useEffect(() => {
    HouseOwnerUpdate();
  }, []);

  //payment data insert
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUpdateHouseOwner({ ...updatehouseowner, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, address, phone } = updatepayment;
    //................with the help of fetch api
    const res = await fetch("/houseownerpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        phone,
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Houser Owner Update failed");
    } else {
      window.alert("House Owner update successfully");
      history.push("/houseowner");
    }
  };

  return (
    <>
      <h1>House Owner Update</h1>
      <div className="container">
        <div className="main">
          <div className="form">
            <h4>House Owner</h4>
            <form method="POST">
              Date:{" "}
              <input
                type="text"
                name="date"
                value={updatepayment.date}
                onChange={handleInputs}
                placeholder="Owner Name"
              />
              <br />
              Invoice:{" "}
              <input
                type="text"
                name="invoice"
                value={updatepayment.invoice}
                onChange={handleInputs}
                placeholder="Owner Name"
              />
              <br />
              Renter:
              <input type="search" name="User" />
              <br />
              <input
                type="text"
                name="renter"
                value={updatepayment.renter}
                onChange={handleInputs}
                placeholder=" Enter Name"
              />
              <br />
              Price:{" "}
              <input
                type="text"
                name="price"
                value={updatepayment.price}
                onChange={handleInputs}
                placeholder="your payment"
              />
              <br />
              <div className="submit_group">
                <input
                  type="submit"
                  name="submit"
                  value="Update Payment"
                  onClick={PostData}
                />
                <input type="submit" name="submit" value="Cancel" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseOwnerUpdate;
