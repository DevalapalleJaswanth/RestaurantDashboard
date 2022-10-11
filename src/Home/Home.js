import React, { useEffect, useState, useContext } from 'react';
import { getRestaurantsData } from '../Services';
import AutoCompleteInput from '../AutoComplete';
import { MapContext } from '../Store';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [restaurant, setRestaurant] = useState('');
  const [maps, setMaps] = useContext(MapContext);
  const [cookies, setCookie] = useCookies([`${maps.user}`]);
  useEffect(() => {
    cookies.addedMaps &&
      cookies.bookMarkedMaps &&
      setMaps({
        addedMaps: [...cookies.addedMaps.split('&')],
        bookMarkedMaps: [...cookies.bookMarkedMaps.split('&')],
      });
  }, []);

  const cookieHandler = (currmaps) => {
    let c1 = currmaps && currmaps.addedMaps && currmaps.addedMaps.join('&');
    let c2 =
      currmaps && currmaps.bookMarkedMaps && currmaps.bookMarkedMaps.join('&');
    setCookie('addedMaps', c1, {
      path: `/${maps.user}`,
    });
    setCookie('bookMarkedMaps', c2, {
      path: `/${maps.user}`,
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
      addedMaps: [...temp],
      bookMarkedMaps: [...maps.bookMarkedMaps, value],
    });

    cookieHandler({
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
    setMaps({ bookMarkedMaps: [...maps.bookMarkedMaps], addedMaps: [...temp] });
    cookieHandler({
      bookMarkedMaps: [...maps.bookMarkedMaps],
      addedMaps: [...temp],
    });
  };
  return (
    <div>
      <div>Home</div>
      <div>
        <AutoCompleteInput cookieHandler={cookieHandler} />
        {maps.addedMaps &&
          maps.addedMaps.map((value, i) => (
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
              <div>
                <button onClick={() => addToBookmark(value)}>Bookmark</button>
                <button onClick={() => remove(value)}>Remove</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
