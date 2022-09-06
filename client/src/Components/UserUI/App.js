// header/////////........................................
import React, { createContext, useReducer } from "react";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";

import Home from "./UserPages/Home";
import House from "./UserPages/House/House";
// import Room from './UserPages/Room';
import About from "./UserPages/About/About";
import Contact from "./UserPages/Contact/Contact";
import Login from "./Useroperation/Login";
import Logout from "./Useroperation/Logout";
import Register from "./Useroperation/Register";
import Footer from "./Footer";
// import HousePage from '../UserUI/UserLayout/HouseLayout/HousePage'
import HouseDetails from "./UserPages/House/HouseDetails";
import Errorpage from "./Errorpage";
import Booking from "./UserPages/Booking/Booking";

const App = () => {
  //hooks must be in top level of componnent

  // initialState ko jo bi value hunxa tyo state ko value hunxa

  const userdata = JSON.parse(localStorage.getItem("userdata"));
  alert(userdata);

  if (userdata) {
    return (
      <>
        {/*ek chij jarur hai ki mujhe yaha value pass karna padega
        value ma dui ota chij lagega state - means current state kya hai
        //filhal and secind dispatch kaha se aya

        what is dispatch so it will always triggred mera ye reducer ke under
        //jo bi action method hai usko
        //dispatch ma kunai pani change hunxa vane reducer ma action method xa
        //uslai call gardinchha and us action through es state ko 
        //value lai change garna paauxa
        */}

        <Header />

        <Switch>
          {/* <Route path="/room" exact component={Room}/> */}
          <Route path="/contact" exact component={Contact} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/booking" exact component={Booking} />
          <Route path="/" exact component={Home} />
          <Route path="/house" exact component={House} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/housedetails/:id" exact component={HouseDetails} />
          <Route>
            <Errorpage />
          </Route>
        </Switch>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        {/*ek chij jarur hai ki mujhe yaha value pass karna padega
        value ma dui ota chij lagega state - means current state kya hai
        //filhal and secind dispatch kaha se aya

        what is dispatch so it will always triggred mera ye reducer ke under
        //jo bi action method hai usko
        //dispatch ma kunai pani change hunxa vane reducer ma action method xa
        //uslai call gardinchha and us action through es state ko 
        //value lai change garna paauxa
        */}

        <Header />

        <Switch>
          {/* <Route path="/room" exact component={Room}/> */}
          <Route path="/contact" exact component={Contact} />
          <Route path="/" exact component={Home} />
          <Route path="/house" exact component={House} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/housedetails/:id" exact component={HouseDetails} />

          <Route>
            <Errorpage />
          </Route>
        </Switch>
        <Footer />
      </>
    );
  }
};

export default App;
