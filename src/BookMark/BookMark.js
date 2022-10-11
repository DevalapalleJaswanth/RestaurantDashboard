import React, { useContext, useEffect } from 'react';
import { MapContext } from '../Store';
export default function BookMark() {
  const [bookMarkedMaps, setBookMarkedMaps] = useContext(MapContext);

  return (
    <div>
      BookMark Page
      {bookMarkedMaps &&
        bookMarkedMaps.map((value, i) => (
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
          </div>
        ))}
    </div>
  );
}
