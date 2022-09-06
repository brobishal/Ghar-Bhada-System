import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

import './Navbar.css';

const NavbarData = [
    {
        title:'Dashboard',
        path:'/dashboard',
        icon:<MdIcons.MdDashboard/>,
        cName: 'nav_text'
    },
    {
        title:'Category',
        path:'/category',
        icon:<BsIcons.BsFilePersonFill/>,
        cName: 'nav_text'
    },
    {
        title:'House Owner',
        path:'/houseowner',
        icon:<BsIcons.BsFilePersonFill/>,
        cName: 'nav_text'
    },
    {
        title:'House',
        path:'/room',
        icon:<MdIcons.MdRoomPreferences/>,
        cName: 'nav_text'
    }, 
    {
        title:'Renter',
        path:'/renter',
        icon:<BsIcons.BsPersonBadge/>,
        cName: 'nav_text'
    },
    {
        title:'Payment',
        path:'/payment',
        icon:<MdIcons.MdPayments/>,
        cName: 'nav_text'
    },
    {
        title:'Invoice',
        path:'/invoice',
        icon:<MdIcons.MdRoomPreferences/>,
        cName: 'nav_text'
    },
    
    {
        title:'Reports',
        path:'/reports',
        icon:<IoIcons.IoIosPaper/>,
        cName: 'nav_text'
    }
]

export default NavbarData;
