import { CDN_URL } from "../utils/constants";
import React from 'react';


const RestaurantCard=(props)=>{
    const {resData}=props;
    const {
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
    }=resData?.info;
    return(
      
      <div className='res-card m-4 p-4 w-64 bg-orange-100 whitespace-normal break-words rounded-lg hover:bg-orange-300'>
        <img className='rounded-xl'
         alt='res-logo'
         src={CDN_URL+ cloudinaryImageId}></img>
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(",")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{resData.info.sla.deliveryTime} minutes</h4>
      </div>
    )
  }

  //higher order component

 export const withPromotedlabel= (RestaurantCard) => {
    return (props) => {
      return (
        <div>
          <label className="absolute bg-black text-white p-2 m-2 rounded-lg">Promoted</label>
          <RestaurantCard {...props}/>
        </div>
      );
    };
  };

  export default RestaurantCard;