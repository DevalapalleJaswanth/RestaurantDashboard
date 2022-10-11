import React, { useEffect, useState, useContext } from 'react';
import { getRestaurantsData } from '../Services';
import AutoCompleteInput from '../AutoComplete';
import { MapContext } from '../Store';

export default function Home() {
  const [restaurant, setRestaurant] = useState('');
  const [maps, setMaps, bookMarkedMaps, setBookMarkedMaps] =
    useContext(MapContext);
  useEffect(() => {
    getRestaurantsData('subway')
      .then((restaurantData) => restaurantData.json())
      .then((restaurantData) => {
        console.log(restaurantData);
        setRestaurant(restaurantData.records);
      });
  }, []);

  const addToBookmark = (value) => {
    setBookMarkedMaps([...bookMarkedMaps, value]);
  };

  const remove = (value) => {
    let temp =
      maps &&
      maps.filter((rest) => {
        if (value !== rest) {
          return rest;
        }
      });
    setMaps([...temp]);
  };
  return (
    <div>
      Home Page
      <AutoCompleteInput />
      {maps &&
        maps.map((value, i) => (
          <div key={i}>
            <iframe
              width="600"
              height="450"
              src={
                'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"' +
                value +
                '"}'
              }
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen
            ></iframe>
            <div>
              <button onClick={() => addToBookmark(value)}>Bookmark</button>
              <button onClick={() => remove(value)}>Remove</button>
            </div>
          </div>
        ))}
    </div>
  );
}
