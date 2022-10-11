import React, { useContext } from 'react';
import { MapContext } from '../Store';
export default function BookMark() {
  const [maps, setMaps] = useContext(MapContext);

  return <div>BookMark Page</div>;
}
