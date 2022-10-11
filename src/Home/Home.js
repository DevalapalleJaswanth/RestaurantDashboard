import React, { useEffect, useState, useContext } from 'react';
import { getRestaurantsData } from '../Services';
import AutoCompleteInput from '../AutoComplete';
import { MapContext } from '../Store';

export default function Home() {
  const [restaurant, setRestaurant] = useState('');
  const [maps, setMaps] = useContext(MapContext);
  useEffect(() => {
    getRestaurantsData('subway')
      .then((restaurantData) => restaurantData.json())
      .then((restaurantData) => {
        console.log(restaurantData);
        setRestaurant(restaurantData.records);
      });
  }, []);

  console.log(maps, 'homePage');
  return (
    <div>
      Home Page
      <AutoCompleteInput />
      {/* <iframe
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
      ></iframe> */}
    </div>
  );
}
