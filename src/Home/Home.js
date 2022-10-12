import React, { useEffect, useState, useContext } from 'react';
import { getRestaurantsData } from '../Services';
import AutoCompleteInput from '../AutoComplete';
import { MapContext } from '../Store';
import { useCookies } from 'react-cookie';
import { useParams, Link } from 'react-router-dom';
export default function Home() {
  const [restaurant, setRestaurant] = useState('');
  const [maps, setMaps] = useContext(MapContext);
  const [cookies, setCookie] = useCookies([`${maps.user}`]);
  const { id } = useParams();

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

  const cookieHandler = (currmaps) => {
    let c1 = currmaps && currmaps.addedMaps && currmaps.addedMaps.join('%');
    let c2 =
      currmaps && currmaps.bookMarkedMaps && currmaps.bookMarkedMaps.join('%');
    setCookie(`${currmaps.user}addedMaps`, c1, {
      path: `/`,
    });
    setCookie(`${currmaps.user}bookMarkedMaps`, c2, {
      path: `/`,
    });
  };

  const addToBookmark = (value) => {
    let temp =
      maps &&
      maps.addedMaps.filter((rest) => {
        if (value !== rest) {
          return rest;
        }
      });
    setMaps({
      user: maps.user,
      addedMaps: [...temp],
      bookMarkedMaps: [...maps.bookMarkedMaps, value],
    });

    cookieHandler({
      user: maps.user,
      addedMaps: [...temp],
      bookMarkedMaps: [...maps.bookMarkedMaps, value],
    });
  };

  const remove = (value) => {
    let temp =
      maps &&
      maps.addedMaps.filter((rest) => {
        if (value !== rest) {
          return rest;
        }
      });
    setMaps({
      user: maps.user,
      bookMarkedMaps: [...maps.bookMarkedMaps],
      addedMaps: [...temp],
    });
    cookieHandler({
      user: maps.user,
      bookMarkedMaps: [...maps.bookMarkedMaps],
      addedMaps: [...temp],
    });
  };
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ height: '100%', width: '100%' }}>
        <br />

        <AutoCompleteInput cookieHandler={cookieHandler} />
        <br />
        <div style={{ overflow: 'scroll', width: '100%', height: '100vh' }}>
          {maps.addedMaps &&
            maps.addedMaps.map((value, i) => (
              <div key={i} style={{ margin: '15px' }}>
                <div className="name-box">{value}</div>
                <iframe
                  width="100%"
                  height="450px"
                  src={
                    'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"' +
                    value +
                    '"}'
                  }
                  frameborder="0"
                  style={{ border: 0 }}
                  allowfullscreen
                  className="map-box"
                ></iframe>
                <div className="button-box">
                  <button onClick={() => addToBookmark(value)}>Bookmark</button>
                  &nbsp;&nbsp;
                  <button onClick={() => remove(value)}>Remove</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
