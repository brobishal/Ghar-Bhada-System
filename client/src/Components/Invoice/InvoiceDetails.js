import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./InvoiceDetails.css";

const InvoiceDetails = () => {
  const [getinvoicedata, setInvoiceData] = useState([]);
  console.log(getinvoicedata); //get id from url
  const { id } = useParams("");
  console.log(id);

  const InvoiceData = async () => {
    //jaba view ma click garchhau taba url ma hamro id aauxa
    //yo id lai get garna
    try {
      const res = await fetch(`/invoiceuser/${id}`, {
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
        setInvoiceData(data);

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
    InvoiceData();
  }, []);


   function HouseUtility(){

        //   <p>Monthly House Rent</p>
        //  <p>Electricity  Charges</p>
        // <p>Water Bill</p>
        //  <p>Garbage Collection Charges</p>

        let monthlyHouseCharges = 30000;
        let electricityCharges = 3000;
        let waterCharges = 300;
        let garbageCharges =400;



  }

  HouseUtility();
  return (
    <>
      <div className="card_invoice_data_div">
        <div className="invoice_data">
          <h1>Invoice Details</h1>
          <h4>Ghar Bhada</h4>
          <p>Mobile No : 9808376245</p>
          <p>Email : gharbhada@gmail.com</p>
          <div className="columns_div_for_invoice">
            <div className="left_side_div">
              <ul>
                <li>To</li>
                <li>Bishal Shrestha</li>
                <li>To</li>
                <li>House Name, kapan, 1st floower</li>
              </ul>

              <br />
              <hr />

              <p>Invoice No :</p>
              <p>Date :</p>
              <p>Renter :</p>
              <p>Amount :</p>
              <p>Status :</p>
            </div>
            <div className="right_side_div">
              <ul>
                <li>Invoice # 111</li>
                <li>Date : 2022, march 22</li>
              </ul>

              <br />

              <hr />
              <p>1000</p>
              <p>1000</p>
              <p>1000</p>
              <p>1000</p>

              <div className="invoice_description">
                <div className="description_left_side">
                        <p>Monthly House Rent</p>
                        <p>Electricity  Charges</p>
                        <p>Water Bill</p>
                        <p>Garbage Collection Charges</p>
                        <hr/>
                        <p>Total :</p>
                        
                </div>
                <div className="description_right_side">
                        <p>Rs 40,000</p>
                        <p>Rs 10,000</p>
                        <p>Rs 5000</p>
                        <p>Rs 1000</p>
                        <hr/>
                        <p>Rs 56000</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
