import React from 'react';
import './header.css';
import logo from '../../Assets/Images/logo.jpg';
import {NavLink} from 'react-router-dom';

import { UserContext } from './App';


const Header = () =>{

    const RenderMenu = () =>{
        //if state true that means user le karlita login
        
        return (
            <>
                <div className="img">
                    <img src={logo} alt="logo"/>

                </div>
                <div className="login">
                    <ul>
                       
                        <li>
                        <NavLink to="/logout">Logout</NavLink>
                        </li>
                        <li>
                        <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                        <NavLink to="/register">Register</NavLink>

                        </li>
                    </ul>

                </div>

                <div className="main_header">
                    <ul>
                        <li>
                            <NavLink to="/">Home </NavLink>
                            <NavLink to="/house">House Rent</NavLink>                          {/* <NavLink to="/about">About</NavLink> */}
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
                 
            </>
        )
        }



    return(
        <> 
        <div className="header">
        <RenderMenu/>

             </div>
        </>
    )
    }

export default Header;
