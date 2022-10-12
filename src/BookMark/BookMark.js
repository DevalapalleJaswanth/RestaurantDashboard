import React, { useContext, useEffect } from 'react';
import { MapContext } from '../Store';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export default function BookMark() {
  const [maps, setMaps] = useContext(MapContext);
  const { id } = useParams();
  const [cookies, setCookie] = useCookies([`${maps.user}`]);
  console.log(maps.bookMarkedMaps, 'book');
  useEffect(() => {
    console.log(id);
    id &&
      setMaps({
        user: id,
        addedMaps: maps.addedMaps,
        bookMarkedMaps: maps.bookMarkedMaps,
      });

    cookies[`${id}addedMaps`] &&
      cookies[`${id}bookMarkedMaps`] &&
      setMaps({
        user: id,
        addedMaps: [...cookies[`${id}addedMaps`].split('%')],
        bookMarkedMaps: [...cookies[`${id}bookMarkedMaps`].split('%')],
      });
  }, [id]);
  return (
    <div style={{ overflow: 'scroll', width: '100%', height: '100vh' }}>
      {maps &&
        maps.bookMarkedMaps &&
        maps.bookMarkedMaps.map((value, i) => (
          <div key={i} style={{ margin: '15px' }}>
            <div className="name-box">{value}</div>
            <iframe
              width="100%"
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
            <div className="button-box">BookMarked</div>
          </div>
        ))}
    </div>
  );
}
