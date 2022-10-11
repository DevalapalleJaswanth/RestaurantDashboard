import React, { useState, createContext } from 'react';

const MapContext = createContext();

function MapProvider(props) {
  const [maps, setMaps] = useState([]);
  const [bookMarkedMaps, setBookMarkedMaps] = useState([]);
  return (
    <MapContext.Provider
      value={[maps, setMaps, bookMarkedMaps, setBookMarkedMaps]}
    >
      {props.children}
    </MapContext.Provider>
  );
}

export { MapContext, MapProvider };
