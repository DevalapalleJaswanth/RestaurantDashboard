import React, { useState, useEffect, useContext, useRef } from 'react';
import { getRestaurantsData } from '../Services';
import { MapContext } from '../Store';

export default function AutoComplete(props) {
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

  const addMaps = (value) => {
    let temp =
      maps &&
      maps.addedMaps.filter((rest) => {
        if (value === rest) {
          return rest;
        }
      });
    if (temp.length == 0) {
      setMaps({
        user: maps.user,
        bookMarkedMaps: [...maps.bookMarkedMaps],
        addedMaps: [...maps.addedMaps, value],
      });
      props.cookieHandler({
        user: maps.user,
        bookMarkedMaps: [...maps.bookMarkedMaps],
        addedMaps: [...maps.addedMaps, value],
      });
    } else {
      alert(`${value} map is already added`);
    }
    setSearch('');
    setDisplay(false);
  };

  return (
    <div ref={wrapperref}>
      <div className="display-center">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            handleChange(e);
          }}
          className="autocomplete-input"
        />
        <button
          onClick={() => {
            addMaps(search);
          }}
          className="add-button"
        >
          Add
        </button>
      </div>
      <div className={display && restaurants && 'autocomplete-box'}>
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
