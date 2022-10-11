import React, { useState, useEffect, useContext, useRef } from 'react';
import { getRestaurantsData } from '../Services';
import { MapContext } from '../Store';
export default function AutoComplete() {
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [maps, setMaps] = useContext(MapContext);
  const wrapperref = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
    getRestaurantsData(e.target.value)
      .then((restaurantData) => restaurantData.json())
      .then((restaurantData) => {
        console.log(restaurantData);
        setRestaurants(restaurantData.records);
      });
    setDisplay(true);
  };

  const clickOut = (e) => {
    const { current: wrap } = wrapperref;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', clickOut);

    return () => {
      window.removeEventListener('mousedown', clickOut);
    };
  }, []);

  return (
    <div ref={wrapperref}>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        onClick={() => {
          setMaps([...maps, search]);
          setSearch('');
          setDisplay(false);
        }}
      >
        Add
      </button>
      <div>
        {display &&
          restaurants &&
          restaurants.map((item, i) => (
            <div
              key={i}
              onClick={(e) => {
                setSearch(item.fields.Name);
                setDisplay(false);
              }}
            >
              {item.fields.Name}
            </div>
          ))}
      </div>
    </div>
  );
}
