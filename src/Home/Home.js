import React, { useEffect, useState } from 'react';
import { getRestaurantsData } from '../Services';
export default function Home() {
  const [restaurant, setRestaurant] = useState('');
  useEffect(() => {
    getRestaurantsData('subway')
      .then((restaurantData) => restaurantData.json())
      .then((restaurantData) => {
        console.log(restaurantData);
        setRestaurant(restaurantData.records);
      });
  }, []);
  return (
    <div>
      Home Page
      <iframe
        width="600"
        height="450"
        src={
          'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"' +
          restaurant +
          '"}'
        }
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen
      ></iframe>
    </div>
  );
}
