import React, { createContext, useReducer } from "react";
import Navbar from "./Components/Sidebar/Navbar";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import Category from "./Components/Category/Category";
import House from "./Components/House/House";
import Renter from "./Components/Renter/Renter";
import Payment from "./Components/Payment/Payment";
import Reports from "./Components/Reports/Reports";
import Monthlyreports from "./Components/Reports/Monthlyreports";
import RenterDetails from './Components/Renter/RenterDetails';
import RenterUpdate from "./Components/Renter/RenterUpdate";
import PaymentUpdate from "./Components/Payment/PaymentUpdate";
import HouseUpdate from "./Components/House/HouseUpdate";
import HouseDetails from "./Components/House/HouseDetails";
import Main from "./Components/Admin/Main";

import AdminLogout from "./Components/Admin/AdminLogout";
import AdminRegister from "./Components/Admin/AdminRegister";
import HouseOwner from "./Components/Owner/HouseOwner";
import Invoice from "./Components/Invoice/Invoice";
import InvoiceUpdate from "./Components/Invoice/InvoiceUpdate";
import InvoiceDetails from "./Components/Invoice/InvoiceDetails";
import Maintenance from "./Components/Maintenance/Maintenance";

const App = () => {
  const admindata = JSON.parse(localStorage.getItem("admindata"));

  if (admindata) {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/house" exact component={House} />
          <Route path="/renter" exact component={Renter} />
          <Route path="/category" exact component={Category} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/invoiceupdate/:id" exact component={InvoiceUpdate} />
          <Route path="/invoicedetails/:id" exact component={InvoiceDetails} />

          <Route path="/reports" exact component={Reports} />
          <Route path="/monthlyreports" exact component={Monthlyreports} />
          <Route path="/renterdetails/:id" exact component={RenterDetails} />
          <Route path="/renterupdate/:id" exact component={RenterUpdate} />
          <Route path="/paymentupdate/:id" exact component={PaymentUpdate} />
          <Route path="/HouseUpdate/:id" exact component={HouseUpdate} />
          <Route path="/HouseDetails" exact component={HouseDetails} />
          <Route path="/adminlogout" exact component={AdminLogout} />
          <Route path="/houseowner" exact component={HouseOwner} />
          <Route path="/maintenance" exact component={Maintenance} />
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/adminregister" exact component={AdminRegister} />
        </Switch>
      </>
    );
  }
};

export default App;
