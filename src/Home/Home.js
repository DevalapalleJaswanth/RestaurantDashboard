import React, { useEffect, useState } from 'react';
import { getRestaurantsData } from '../Services';
export default function Home() {
  const [restaurants, setRestaurants] = useState('');
  useEffect(() => {
    getRestaurantsData('subway')
      .then((restaurantData) => restaurantData.json())
      .then((restaurantData) => {
        console.log(restaurantData);
        setRestaurants(restaurantData.records);
      });
  }, []);
  return <div>Home Page</div>;
}
