import RestaurantCard,{withPromotedlabel} from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import React from 'react';
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus"



const Body=()=>{
  const [ListOfRestaurant,setListOfRestaurant]=useState([]);

  const [searchRestaurants, setsearchRestaurants]=useState([]);

  const RestaurantCardPromoted= withPromotedlabel(RestaurantCard);

  const [searchText,setsearchText]=useState("");
  //console.log(ListOfRestaurant);
 
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData= async () => {
    const data=await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
  
  const json=await data.json();
  //console.log(json);
  //optional chaining
  setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 
   setsearchRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 
  };

  const OnlineStatus = useOnlineStatus();

  if(OnlineStatus===false)
    return(
  <div> 
    <h1>Looks like you're offline!! Please check the internet connection;</h1>
  </div>)

  //conditional rendering
  if(ListOfRestaurant.length===0){
    return <Shimmer />;
  }

    return(
    <div className='body'>
      <div  className='filter flex'>
        <div className="search m-4 p-4 ">
          <input 
          type="text" 
          className="border border-solid border-gray-500 "
          value={searchText}
          onChange={(e)=>{setsearchText(e.target.value)}}/>
          <button className="px-4 py-1 bg-orange-100 shadow-2xl m-4 rounded-lg"
          onClick={()=>{
            const filteredRestaurants=ListOfRestaurant.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));

            setsearchRestaurants(filteredRestaurants);
          }}
          >search</button>
        </div>

          <div className="search m-4 p-4 flex items-center">
          <button className="px-4 py-2 bg-orange-100 rounded-lg" onClick={()=> {
          const filteredList=ListOfRestaurant.filter(
            (res)=>res.info.avgRating>4.5
          );
          setsearchRestaurants(filteredList);
         // console.log(ListOfRestaurant);
          }}
        >
          Top Rated Restaurants</button>
          </div>
        
      </div>
  
      <div className='res-container flex flex-wrap  justify-center '>
        {
          searchRestaurants.map((restaurants)=>(
            <Link  
            key={restaurants.info.id} 
            to={"/restaurants/"+restaurants.info.id}>

            {
              restaurants.info.avgRating>4.5 ? <RestaurantCardPromoted  resData={restaurants}/> : <RestaurantCard  resData={restaurants}/>
            }
              
              </Link>
          ))
        }
      </div>
    </div>
    );
  };

  export default Body;