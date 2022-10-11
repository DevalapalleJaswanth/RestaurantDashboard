import React, { useContext, useEffect } from 'react';
import { MapContext } from '../Store';
export default function BookMark() {
  const [maps, setMaps] = useContext(MapContext);
  let x = 'Subway';
  let y =
    'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"' +
    x +
    '"}';

  return (
    <div>
      <iframe
        width="600"
        height="450"
        src={y}
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen
      ></iframe>
      BookMark Page
      {maps &&
        maps.map((value, i) => {
          <div key={i}>
            {url}
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
          </div>;
        })}
    </div>
  );
}
