import React, { useState, createContext } from 'react';

const MapContext = createContext();

function MapProvider(props) {
  const [maps, setMaps] = useState([]);

  return (
    <MapContext.Provider value={[maps, setMaps]}>
      {props.children}
    </MapContext.Provider>
  );
}

export { MapContext, MapProvider };
