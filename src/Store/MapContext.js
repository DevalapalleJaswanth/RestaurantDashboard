import React, { useState, createContext } from 'react';

const MapContext = createContext();

function MapProvider(props) {
  const [maps, setMaps] = useState({
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
