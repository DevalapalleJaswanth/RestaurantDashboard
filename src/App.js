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
  //const [user, setUser] = useState('');
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
                <div>
                  <Link to={`/HomePage/${maps.user}`} className="navigation">
                    Home
                  </Link>
                </div>
                <div>
                  <Link
                    to={`/BookMarkPage/${maps.user}`}
                    className="navigation"
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
