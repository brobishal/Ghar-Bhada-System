import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

import NavbarData from "./NavbarData";
import "./Navbar.css";

// add style for all of the icons we import//and warp all the content inside IconContext// this allows customize all the icons at the top level
import { IconContext } from "react-icons";

const Navbar = () => {
  // define state hooks//here false meaning is not showing
  const [sidebar, setSidebar] = useState(false);

  const showSideBar = () => {
    // this is going to update the value to whaterver the //opposite of it is is current;y kind like a toggle
    //so iam going yo say exclamation mark sidebar so it is//reversing the value of true false
    setSidebar(!sidebar);
  };

  // get the admin data from localstorage
  const admindata = JSON.parse(localStorage.getItem("admindata"));
  return (
    <>
      {/* yes bata hamile all the icon lai change garna sakcau color */}
      <IconContext.Provider value={{ color: "#000" }}>
        {/* yaha we se sidebar us useState hooks */}
        {/* set some state with the use state hooks so we ar going to just say sidebar
              and we are going to create this in just second and we use
              ternary operator and here we are going to sya if is true
              meaning if i clicked on the icon the sidebar is showing i want
              the class to be nav-menu active meaning that is showing
              else use colon i am gonna say nav-menu  so it basically
              hidden */}

        <nav className={sidebar ? "nav_menu active" : "nav_menu"}>
          <ul className="nav_menu_items">
            <li className="navbar_toggle" onClick={showSideBar}>
              <NavLink to="#" className="menu_bars">
                {/* <AiIcons.AiOutlineClose/> */}
                <h5>Ghar Bhada System</h5>
              </NavLink>
            </li>
            {NavbarData.map((item, index) => {
              return (
                //for index
                <li key={index} className="item.cName">
                  {/* for path */}
                  <NavLink to={item.path}>
                    {/* for icons*/}
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
            <div class="buttom_section">
              <p>
                {admindata.email}
                <NavLink to="bbro">{<AiIcons.AiOutlineSetting />}</NavLink>
              </p>

              <button>
                {" "}
                <NavLink to="/adminlogout">Logout</NavLink>
              </button>
            </div>
          </ul>
        </nav>
        <div className="navbar">
          {/* <NavLink to="#" className="menu_bars">
                     <FaIcons.FaBars onClick={showSideBar}/> 
                </NavLink> */}
          {/* for alert */}
          <div className="maitenance_data">
            <h4>
              {" "}
              <NavLink to="/maintenance">Maintenance Alert</NavLink>
            </h4>
            <MdIcons.MdAddAlert />
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
