import { useState,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import React from 'react';
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";



const Header=() =>{
const [btnName,setbtnName]=useState("login");
const {loggedInUser}=useContext(UserContext);

//selector- subscribing to the store
const cartItems= useSelector((store) => store.cart.items);
//console.log(cartItems)

    return(
      <div className='flex justify-between bg-orange-200 shadow-lg'>
        <div className='logo-container'>
          <img className=" w-48 m-4" alt='swiggy-logo' src= {LOGO_URL}></img>
        </div>
      
        <div className='flex items-center'>
          <ul className="font-medium flex p-4 m-4">
          
            <li className="px-4">
              <Link to="/" >Home</Link>
              </li>
            <li className="px-4">
              <Link to="/contact">Contact</Link>
              </li>
            <li className="px-4">
              <Link to="/about">About Us</Link>
              </li>
              
              <li className="px-4 font-bold ">
              <Link to="/cart">Cart({cartItems.length})</Link>
              </li>
            
            <button  className="login" onClick={()=>{ btnName==="login"?setbtnName("logout"):setbtnName("login")}}>{btnName}</button>

          { /* <li className="px-4 font-bold">{loggedInUser}</li> */}
          </ul>
        </div>
      </div>
    )
  }
  export default Header;