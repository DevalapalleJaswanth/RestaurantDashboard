import React, { useState, createContext } from 'react';

const MapContext = createContext();

function MapProvider(props) {
  const [maps, setMaps] = useState({
    user: '',
    addedMaps: [],
    bookMarkedMaps: [],
  });

  return (
    <MapContext.Provider value={[maps, setMaps]}>
      {props.children}
    </MapContext.Provider>
  );
}

export { MapContext, MapProvider };
