import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import LoginPage from './Login';
import { getUsers } from './Services';
import HomePage from './Home';
import { MapProvider, MapContext } from './Store';
import BookMarkPage from './BookMark';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  const [maps, setMaps] = useContext(MapContext);
  const [state, setState] = useState(true);
  useEffect(() => {
    getUsers();
  }, []);
  console.log(maps, 'app');
  return (
    <div>
      <Router>
        <div style={{ display: 'flex' }}>
          <>
            {maps.user && (
              <div>
                <div className={state ? 'navigation' : 'not-active'}>
                  <Link
                    to={`/HomePage/${maps.user}`}
                    style={{
                      color: state ? 'white' : 'rgba(23, 46, 247, 0.74)',
                      textDecoration: 'none',
                    }}
                    onClick={() => setState(true)}
                  >
                    Home
                  </Link>
                </div>
                <div className={state ? 'not-active' : 'navigation'}>
                  <Link
                    to={`/BookMarkPage/${maps.user}`}
                    style={{
                      color: state ? 'rgba(23, 46, 247, 0.74)' : 'white',
                      textDecoration: 'none',
                    }}
                    onClick={() => setState(false)}
                  >
                    BookMarks
                  </Link>
                </div>
              </div>
            )}
          </>
          <>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path={`/HomePage/:id`} element={<HomePage />} />
              <Route path={`/BookMarkPage/:id`} element={<BookMarkPage />} />
            </Routes>
          </>
        </div>
      </Router>
    </div>
  );
}
