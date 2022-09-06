import React from 'react';
import * as AiIcons from 'react-icons/ai';


import './home.css';

const HomeData = [
    {
        title:'Home',
        path:'/',
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav_text'
    },
    // {
    //     title:'House',
    //     path:'/house',
    //     cName: 'nav_text'
    // },
    {
        title:'Room',
        path:'/room',
        cName: 'nav_text'
    },
    {
        title:'About',
        path:'/about',
        cName: 'nav_text'
    },
    {
        title:'Contact',
        path:'/contact',
        cName: 'nav_text'
    }
]

export default HomeData;
