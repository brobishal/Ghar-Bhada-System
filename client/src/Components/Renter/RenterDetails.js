import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RenterDetails.css";
const RenterDetails = () => {
  const [getrenterdata, setRenterData] = useState([]);
  console.log(getrenterdata);
  //get id from url
  const { id } = useParams("");
  console.log(id);
  const RenterData = async () => {
    //jaba view ma click garchhau taba url ma hamro id aauxa
    //yo id lai get garna
    try {
      const res = await fetch(`/renteruser/${id}`, {
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
        setRenterData(data);

        console.log("get data");
      }
      //jab mujhe data milda hai teti bela true kardunga
    } catch (err) {
      console.log(err);
    }
  };

  //    hamro yo details ko page open hunxa
  //tesai samaye auto call ho tesko lagi use effect

  useEffect(() => {
    RenterData();
  }, []);
  
  return (
    <>
      <h1>Renter Details</h1>
      <div className="individual_renter_data">
        <div className="individual_data">
          <h2>List of Rentaier</h2>
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
                <tr>
                  <td>{getrenterdata.name}</td>
                  <td>{getrenterdata.email}</td>
                  <td>{getrenterdata.address}</td>
                  <td>{getrenterdata.room}</td>
                  <td>{getrenterdata.date}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default RenterDetails;
